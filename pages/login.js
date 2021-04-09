import { Button } from '@material-ui/core';
import Head from 'next/head';
import styled from 'styled-components';
import { auth, provider } from '../firebase';

function Login() {

    const signIn =() =>{
        auth.signInWithPopup(provider).catch(error => alert(error.message))
    }
    return (
        <Container>
            <Head>
             <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src= "https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
                <Button onClick = {signIn} variant="outlined">sign in with google</Button>
            </LoginContainer>

        </Container>
    )
}

export default Login;
const Container  = styled.div`
display:flex;
align-items:center;
justify-content:center;
height:100vh;
background:whitesmoke;
`;
const LoginContainer  = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:100px;
background-color:#FFF;
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
border-radius:5px;
`;
const Logo  = styled.img`
height:150px;
width:150px;
margin-bottom:50px;

`;



