import React, { useContext } from 'react';
import styled from 'styled-components';
import Empty from '../Empty';
import { ModalContext } from '../../Context/ModalProvider';
import { LoginContext } from '../../Context/LoginProvider';
import { signUp, login } from '../../API/api';

export const SignUp = ()=> {
    const ModalStore = useContext(ModalContext);

    const onChangeSignUpInput = (e) => {
        console.log(ModalStore.state.data.signUpInput);
        ModalStore.actions.contextDispatch({type:"CHANGE_SIGNUP_INPUT", name:e.target.name, value:e.target.value});
    }

    const onSubmitHandler = (e) => {
        let tempobj = ModalStore.state.data.signUpInput;
        for(let key in tempobj) {
            const value = tempobj[key];
            if(!value.length) {
                alert('입력 폼을 다 완성해주세요!');
                return;
            }
        }
        if(ModalStore.state.data.signUpInput.password !== ModalStore.state.data.signUpInput.passwordConfirm) {
            alert('입력하신 비밀번호 두 개가 다릅니다.');
            return;
        }
        else {
            signUp(ModalStore.state.data.signUpInput)
            .then((res) => {
                // 사용할 수 없는 케이스들 추가하기
                alert('회원가입이 완료 되었습니다.');
                ModalStore.actions.contextDispatch({type:'SET_DEFAULT_INPUT'});
                ModalStore.actions.contextDispatch({type:'TOGGLE_MODAL'});
            })
            .catch((e)=> {
                console.log(e);
                alert(`회원가입 실패!
                잠시 후 다시 실행해주세요.`);
            })
        }
       
    }
    

    return(
        <>
            <SignUpModalContainer className='modal'>
                <div className='ModalTitle'>
                    <h1>회원 가입</h1>
                </div>
                <hr></hr>
                <div className='inputs-wrapper'>
                    <input type='text' placeholder='ID (10자 이내)' name='id' onChange={onChangeSignUpInput}
                    value={ModalStore.state.data.signUpInput.id} maxLength='10'></input>
                    <input type='text' placeholder='nickname (10자 이내)' name='nickname' onChange={onChangeSignUpInput}
                    value={ModalStore.state.data.signUpInput.nickname} maxLength='10'></input>
                    <input type='date' name='birth' onChange={onChangeSignUpInput}
                    value={ModalStore.state.data.signUpInput.birth}></input>
                    <input type='password' placeholder='password (10자 이내)' name='password' onChange={onChangeSignUpInput}
                    value={ModalStore.state.data.signUpInput.password} maxLength='10'></input>
                    <input type='password' placeholder='password (확인)' name='passwordConfirm' onChange={onChangeSignUpInput}
                    value={ModalStore.state.data.signUpInput.passwordConfirm} maxLength='10'></input>
                </div>
                <Empty></Empty>
                <div className='btns'>
                <button onClick = {onSubmitHandler}>회원 가입</button>
            </div>
            </SignUpModalContainer>
            
        </>
    )
}







export const Login = () => {

    const ModalStore = useContext(ModalContext);
    const LoginStore = useContext(LoginContext);

    const onChangeLoginInput = (e) => {
        ModalStore.actions.contextDispatch({type:"CHANGE_LOGIN_INPUT", name:e.target.name, value:e.target.value});
    }

    const notMemeberHandler = () => {
        ModalStore.actions.contextDispatch({type:'ISLOGIN', isRight:false});
    }

    const onSubmitHandler = () => {
        let loginInput = ModalStore.state.data.loginInput;
        if(loginInput.id.length === 0 || loginInput.password.length === 0) {
            alert('정보를 입력해주세요.');
            return;
        }
        login(loginInput)
        .then((res)=> {
            if(!res.data.length) alert('존재하지 않는 아이디입니다.');
            else if(res.data.length) {
                if(res.data[0].user_password === loginInput.password) {
                    LoginStore.actions.contextDispatch({type:'LOGIN', id:loginInput.id, nickname:'tempnickanme'});
                    alert('login완료');
                    ModalStore.actions.contextDispatch({type:'TOGGLE_MODAL'});
                }
                else if(res.data[0].user_password !== loginInput.password) {
                    alert('비밀번호가 다릅니다.');
                    return;
                }
            }
        })
        .catch((e)=> {
            console.log(e);
        }) 
        ModalStore.actions.contextDispatch({type:'SET_DEFAULT_INPUT'});
    }

    return(
        <>
        <LoginModalContainer className='modal'>
            <div className='ModalTitle'>
                <h1>로그인</h1>
            </div>
            <hr></hr>
            <div className='inputs-wrapper'>
                <input type='text' placeholder='ID' onChange={onChangeLoginInput} name="id"
                value={ModalStore.state.data.loginInput.id}></input>
                <input type='password' placeholder='password' onChange={onChangeLoginInput} name="password"
                value={ModalStore.state.data.loginInput.password}></input>
                <p onClick={notMemeberHandler}>회원이 아니신가요?</p>
            </div>

            <div className='btns'>
                <button onClick={onSubmitHandler}>로그인</button>
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