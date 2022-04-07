import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Empty from '../Empty';
import { ModalContext } from '../../Context/ModalProvider';
import { signUp, getmember } from '../../API/api';

export const SignUp = ()=> {
    useEffect(()=> {
        getmember().then((res)=> console.log(res));
    }, [])

    return(
        <>
            <SignUpModalContainer className='modal'>
                <div className='ModalTitle'>
                    <h1>회원 가입</h1>
                </div>
                <hr></hr>
                <div className='inputs-wrapper'>
                    <input type='text' placeholder='ID'></input>
                    <input type='text' placeholder='nickname'></input>
                    <input type='date'></input>
                    <input type='password' placeholder='password'></input>
                    <input type='password' placeholder='password'></input>
                </div>
                <Empty></Empty>
                <div className='btns'>
                <button>회원 가입</button>
            </div>
            </SignUpModalContainer>
            
        </>
    )
}

export const Login = () => {

    const ModalStore = useContext(ModalContext);

    const notMemeberHandler = () => {
        ModalStore.actions.contextDispatch({type:'ISLOGIN', isRight:false});
    }

    return(
        <>
        <LoginModalContainer className='modal'>
            <div className='ModalTitle'>
                <h1>로그인</h1>
            </div>
            <hr></hr>
            <div className='inputs-wrapper'>
                <input type='text' placeholder='ID'></input>
                <input type='password' placeholder='password'></input>
                <p onClick={notMemeberHandler}>회원이 아니신가요?</p>
            </div>

            <div className='btns'>
                <button>로그인</button>
            </div>
            
            
        </LoginModalContainer>
    </>
    )
}


const SignUpModalContainer = styled.div`
    position:relative;
    width:25%;
    height:60%;
    background:white;
    border-radius:10px;
    padding:2%;

    h1 {
        padding:0;
        margin:0;
        user-select:none;
    }
    hr {
        margin:10px 0;
        color:rgba(169,169,169, 0.5);
    }
    .inputs-wrapper {
        position:relative;
        display:flex;
        justify-content:space-around;
        align-items:center;
        flex-direction:column;
        height:70%;
        

        input {
            margin:1%;
            width:95%;
            border-radius:10px;
            height:10%;
            user-select:none;
            font-size:1.1rem;
        }
        input:focus {
            outline:none;
        }
    }
    .btns {
        // background:red;
        display:flex;
        justify-content:center;
        
        height:10%;
        button {
            border-radius:10px;
            height:100%;
            width:100%;
            background:#3949ab;
            color:white;
            font-weight:bold;
            font-size:1.2rem;
        }
    }
`

const LoginModalContainer = styled(SignUpModalContainer)`
    .inputs-wrapper {
        height:40%;

        input {
            height:20%;
            width:100%;
        }
        p {
            text-decoration:none;
            color:#536dfe;
            font-weight:bold;
            cursor:pointer;
            user-select:none;
        }
    }
`