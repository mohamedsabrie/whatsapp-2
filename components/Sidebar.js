import { Avatar, Button, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import * as Emailvalidator from 'email-validator';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';


function Sidebar() {
    const [user] = useAuthState(auth);
    const [chatSnapshot] = useCollection(db.collection("chats").where("users", "array-contains",user.email));
    chatSnapshot?.docs.map(doc=> console.log(doc.data()))

    const createChat =() =>{
        const input=  prompt("Please enter the email address for the user you wanna chat with ")
        if(!input) return null;
        if(Emailvalidator.validate(input) && input !== user.email && !chatAlreadyExists(input)){
            db.collection("chats").add({
                users: [user.email, input]
            })
        }
    }

    const chatAlreadyExists = (recipientEmail) =>
        !!chatSnapshot?.docs.find(chat =>chat.data().users.find(user => user === recipientEmail)?.length> 0);
    
    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                         <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>
            <SidebarButton onClick={createChat}>
                start a new chat
            </SidebarButton>
            {chatSnapshot?.docs.map(chat =>(
                <Chat key ={chat.id} id ={chat.id} users={chat.data().users} />
            ))}
        </Container>
        
    )
}

export default Sidebar;
const Container = styled.div`
flex:0.45;
min-width:150px;
max-width:350px;
height:100vh;
border-right:1px solid whitesmoke;
overflow-y:scroll;
/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;
const Header = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
position:sticky;
top:0;
background-color:#FFF;
z-index:1;
padding:15px;
height:80px;
border-bottom:1px solid lightgray;

`;
const UserAvatar = styled(Avatar)`
cursor:pointer;
:hover{
    opacity:0.8;
}

`;
const IconsContainer = styled.div`
@media(max-width:764px){
   >.MuiIconButton-root:last-child{
        display:none;
    }
}
`;
const Search = styled.div`
display:flex;
align-items:center;
padding:20px;
@media(max-width:764px){
   padding:10px;
}

`;
const SearchInput = styled.input`
outline:none;
border:none;
flex:1;
`;
const SidebarButton = styled(Button)`
width:100%;
&&&{
    border-top:1px solid whitesmoke;
    border-bottom:1px solid whitesmoke;
}
@media(max-width:764px){
    &&&{
        font-size:13px;
    }
}
`;

