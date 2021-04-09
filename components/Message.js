import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import moment from 'moment';



function Message({user, message}) {
    const [userloggedIn] = useAuthState(auth);
    const TypeOFMessage = user ===  userloggedIn.email? Sender: Reciever
    return (
        <Container>
        <TypeOFMessage>
            {message.message}
            <Timestamp>{message.timestamp? moment(message.timestamp).format('LT'): '...'}</Timestamp>
        </TypeOFMessage>
        </Container>
    )
}

export default Message ;
const Container = styled.div``;
const MessageElement = styled.p`
position:relative;
width:fit-content;
min-width:60px;
padding:15px;
border-radius:8px;
margin:10px;
padding-bottom:26px;
text-align:right;




`;
const Sender = styled(MessageElement)`
background-color:#dcf8d6;
margin-left:auto;
`;
const Reciever = styled(MessageElement)`
text-align:left;
background-color:whitesmoke;
`;
const Timestamp  = styled.div`
position: absolute;
bottom:0;
right:0;
color:gray;
padding:10px;
font-size:9px;
`

;

