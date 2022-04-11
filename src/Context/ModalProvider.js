import React, { createContext, useReducer } from 'react';

const TOGGLE_MODAL = 'TOGGLE_MODAL';
const ISLOGIN = 'ISLOGIN';
const CHANGE_SIGNUP_INPUT = 'CHANGE_SIGNUP_INPUT';
const SET_DEFAULT_INPUT = 'SET_DEFAULT_INPUT';
const CHANGE_LOGIN_INPUT = 'CHANGE_LOGIN_INPUT';

const initData = {
    isShow : false,
    isLoginBtn: true,
    signUpInput:{
        id:'',
        nickname:'',
        birth:'',
        password:'',
        passwordConfirm:''
    },
    loginInput: {
        id:'',
        password:''
    }
}

const defalutSignUpInput = {
    id:'',
    nickname:'',
    birth:'',
    password:'',
    passwordConfirm:''
}

const defaultLoginInput = {
    id:'',
    password:''
}

export const ModalContext = createContext();

const ModalReducer = (state, action) => {
    let tempInputValue;
    switch(action.type) {
        case TOGGLE_MODAL:
            return {...state, isShow : !state.isShow};

        case ISLOGIN:
            return {...state, isLoginBtn : action.isRight};

        case CHANGE_SIGNUP_INPUT:
            tempInputValue = {...state.signUpInput, [action.name] : action.value};
            
            return {...state, signUpInput: tempInputValue};

        case CHANGE_LOGIN_INPUT:
            tempInputValue = {...state.loginInput, [action.name] : action.value};
            return {...state, loginInput : tempInputValue};

        case SET_DEFAULT_INPUT:
            return {...state, signUpInput:defalutSignUpInput, loginInput:defaultLoginInput};
            
        default:
            return state;
    }
}


const ModalProvider = ({ children }) => {
    const [data, contextDispatch] = useReducer(ModalReducer, initData);

    const value = {
        state: { data },
        actions: {contextDispatch}
    }

    return <ModalContext.Provider value={value}>{ children }</ModalContext.Provider>
}

export default ModalProvider;