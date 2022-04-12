import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../Context/ModalProvider';
import { LoginContext } from '../Context/LoginProvider';
import { Link } from 'react-router-dom';

const Header = () => {

    const ModalStore = useContext(ModalContext);
    const LoginStore = useContext(LoginContext);

    const btnClickHandler=(e)=> {
        ModalStore.actions.contextDispatch({type:'TOGGLE_MODAL'});
        if(e.target.classList.contains('btn-login')) {
            if(LoginStore.state.data.isLogin) {
                LoginStore.actions.contextDispatch({type:'LOGOUT'});
                ModalStore.actions.contextDispatch({type:'TOGGLE_MODAL'});
            }
            else {
                ModalStore.actions.contextDispatch({type:'ISLOGIN', isRight:true});
            }
            
        }
        else if(e.target.classList.contains('btn-signup')) {
            ModalStore.actions.contextDispatch({type:'ISLOGIN', isRight:false});
        }
    }


    return(
        <>
        <HeaderWrapper>
            <HeaderContents>
                <div className='logo'>
                    <h1><Link to='/'>ClothesUp</Link></h1>
                </div>
                <div className='btns' onClick={btnClickHandler}>
                    <div className='btn btn-login'>
                        {LoginStore.state.data.isLogin? '로그아웃' : '로그인'}
                    </div>
                    <div className='btn btn-signup'>
                        회원가입
                    </div>
                </div>
            </HeaderContents>
            <SearchArea className='search-area'>
                <div className='search-content'>
                <MoreBtnsWrapper>
                    <MoreLink><Link to={'/ClothesPostings'}>옷</Link></MoreLink>
                    <MoreLink><Link to={'/CoordinationPostings'}>코디</Link></MoreLink>
                </MoreBtnsWrapper>
                <SearchDiv>
                    <div className='option'>
                        <button>내용</button>
                        <button>해시태그</button>
                    </div>
                    <div className='input-area'>
                        <input type="text" placeholder='어떤 내용을 검색할까요?'></input>
                    </div>
                    <div className='submit-btn'>
                        <button>검색</button>
                    </div>
                </SearchDiv>
                </div>
            </SearchArea>
        </HeaderWrapper>
        
        
        </>
    )
}

export default Header;


const HeaderWrapper = styled.div`
    height:52px;
    width:100%;
    background:black;
    position:fixed;
    top:0;
`

const HeaderContents = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:0 auto;
    width:100%;
    max-width:1100px;
    height:100%;

    h1 {
        margin:0;
        padding:0;
        user-select:none;
        a {
            text-decoration:none;
            color:#fafafa;
        }
        
    }
    .btns {
        display:flex;
        color:#fafafa;
        & > div {
            user-select:none;
            cursor:pointer;
            margin-left:10px;
        }
    }
`

const SearchArea = styled.div`
    height:56px;
    background:#f5f5f5;
    .search-content {
        display:flex;
        align-items:center;
        max-width:1100px;
        height:100%;
        margin:0 auto;
    }
`

const SearchDiv = styled.div`
    width:35%;
    height:70%;
    display:flex;
    align-items:center;
    border: white 1px solid;
    background:white;
    display:flex;
    justify-content:space-between;

    button {
        border:none;
        
    }

    .option {
        height:100%;
        button {
            height:90%;
            margin:2px;
            border:none;
        }
    }
    .input-area {
        height:100%;
        input {
            border:none;
            height:95%;
        }
        input:focus {
            outline:none;
        }
    }
    .submit-btn {
        display:flex;
        align-items:center;
        height:100%;
        button {
            height:90%;
        }
    }
    
`

const MoreBtnsWrapper = styled.div`
    width:20%;
    margin-right:auto;
    // background:red;
    height:100%;
    display:flex;
    align-items:center;
`

const MoreLink = styled.p`
    width:20%;
    font-weight:bold;
    a {
        text-decoration:none;
        color:black;

        &:hover, &:active {
            color: #f44336;
        }
    }
`
