import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import firebase from 'firebase'
import { useState } from 'react';
import getRecipientEmail from '../utility/getRecipientEmail';
import TimeAgo from 'timeago-react';
import { useRef } from 'react';
import { useEffect } from 'react';

function ChatScreen({ messages, chat }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null)
  const recipientEmail = getRecipientEmail(chat.users, user);
  const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", recipientEmail));
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const scrollToBottom = () =>{
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  };
  useEffect(() => {
    scrollToBottom()
    
  }, [])
  const sendMessage =(e)=>{
    
   e.preventDefault();
   
   
   // update last seen
   db.collection("users").doc(user.uid).set({
     lastSeen: firebase.firestore.FieldValue.serverTimestamp()
   },
   {merge: true}
   );
   db.collection("chats").doc(router.query.id).collection("messages").add({
     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
     message: input,
     user: user.email,
     photoURL: user.photoURL,
   });
   setInput("");
   scrollToBottom()


  }
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map(message => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}

        />
      ))
    }
    else{
      return JSON.parse(messages).map(message =>(
        <Message  key={message.id}  user={message.user} message={message} />
      ))
    }
  }


  return (
    <Container>
      <Header>
        {recipient? (
          <Avatar src={recipient?.photoURL} />
        ):(
          <Avatar> {recipientEmail[0]}</Avatar>
        )}
        
        <Headerinfo>
          <h3>{recipientEmail}</h3>
          {recipient ? (
          <p>last Active: {' '}
             {recipient?.lastSeen?.toDate() ? (
               <TimeAgo datetime = {recipient?.lastSeen.toDate()} />
                ): "Unavailable"}
          
          </p>
        ):(
          <p>Loading Last Active ...</p>
        )}
        </Headerinfo>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>

        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref = {endOfMessagesRef} />
      </MessageContainer>
      <InputContainer>
        <EmojiEmotionsOutlinedIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>send message</button>
        <MicNoneOutlinedIcon />

        </InputContainer>

    </Container>
  )
}

export default ChatScreen;
const Container = styled.div``;
const Header = styled.div`
display:flex;
align-items:center;
position:sticky;
top:0;
z-index:100;
height:80px;
padding:10px;
background-color:#FFF;
border-bottom:1px solid whitesmoke;



`;
const Headerinfo = styled.div`
margin-left:15px;
flex:1;
>h3{
  margin-bottom:3px;
}
>p{
  font-size:14px;
  color:gray;
}
  @media(max-width:764px){
    >h3{
 font-size:17px;
  width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
    }
    >p{
      font-size:12px;
    }
  }
`;
const HeaderIcons = styled.div`
@media(max-width:764px){
  display:none;
}
`;
const MessageContainer = styled.div`
padding:30px;
background-color:#e5dedb;
min-height:90vh;
@media(max-width:764px){
   padding:5px;
}
`;
const EndOfMessage = styled.div`
margin-bottom:50px;
`;
const InputContainer = styled.form`
display:flex;
align-items:center;
justify-content:center;
padding:10px;
position:sticky;
bottom:0;
background-color:#FFF;
z-index:100;
@media(max-width:764px){
  >.MuiSvgIcon-root{
    display:none;
  }
}
`;
const Input = styled.input`
flex:1;
outline:none;
border:none;
border-radius:10px;
background-color:whitesmoke;
padding:20px;
margin-right:15px;
margin-left:15px;
@media(max-width:764px){
  margin:0;;
  padding:15px;
}


`;


