import React, { createContext, useReducer } from 'react';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initData = {
    isLogin:false,
    id: '',
    nickname:''
}

export const LoginContext = createContext();

const LoginReducer = (state, action) => {
    switch(action.type) {
        case LOGOUT:
            return {...state, isLogin:false, id:'', nickname:''};

        case LOGIN:
            return {...state, isLogin:true, id:action.id, nickname:action.nickname};

        default:
            return state;
    }
}


const LoginProvider = ({ children }) => {
    let [data, contextDispatch] = useReducer(LoginReducer, initData);

    let value = {
        state: { data },
        actions: { contextDispatch }
    }

    return <LoginContext.Provider value={value}>{ children }</LoginContext.Provider>
}

export default LoginProvider;