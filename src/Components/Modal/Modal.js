import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../Context/ModalProvider';

const Modal = ({ children }) => {
    const ModalStore = useContext(ModalContext);

    const clickModalToggle = (e) => {
        if(e.target.classList.contains('modal-blur')) {
            ModalStore.actions.contextDispatch({type:'TOGGLE_MODAL'});
            ModalStore.actions.contextDispatch({type:'SET_DEFAULT_INPUT'});
        }
    }

    return(
        <BlurDiv className='modal-blur'onClick={clickModalToggle}>
            {children}
        </BlurDiv>
    )
}

export default Modal;


const BlurDiv = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    position:absolute;
    z-index:1000;
    width:100vw;
    height:100vh;
    background:rgba(169,169,169,0.5);
`