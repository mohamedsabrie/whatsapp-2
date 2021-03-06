import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utility/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router'



function Chat({id , users}) {
    const router = useRouter()
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==",getRecipientEmail(users, user ) ));
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const RecipientEmail = getRecipientEmail(users, user)
    return (
        <Container onClick ={() =>  router.push(`/chat/${id}`)}>
            {recipient?(
                <UserAvatar src = {recipient?.photoURL} />
            ):(
                <UserAvatar> {RecipientEmail[0]}</UserAvatar>
            )}
            
            <p>{RecipientEmail}</p>

        </Container>
    )
};

export default Chat;


const Container = styled.div`
display:flex;
align-items:center;
cursor:pointer;
padding:15px;
word-break:break-word;
:hover{
    background-color: #e9eaeb;
}

@media(max-width:764px){
   >p{
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
   }
   padding:10px;

}


`;
const UserAvatar = styled(Avatar)`
margin:5px;
margin-right:15px;
@media(max-width:764px){
    margin-right:10px;
   &&&{
       height:30px;
       width:30px;
   } 

    
}

`;
