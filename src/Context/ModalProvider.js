import React, { createContext, useReducer } from 'react';

const TOGGLE_MODAL = 'TOGGLE_MODAL';
const ISLOGIN = 'ISLOGIN';

const initData = {
    isShow : false,
    isLoginBtn: true
}

export const ModalContext = createContext();

const ModalReducer = (state, action) => {
    switch(action.type) {
        case TOGGLE_MODAL:
            return {...state, isShow : !state.isShow};

        case ISLOGIN:
            return {...state, isLoginBtn : action.isRight};

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