import React, { useContext, useEffect } from 'react';
import Header from './Components/Header';
import styled from 'styled-components';
import Modal from './Components/Modal/Modal';
import {SignUp, Login} from './Components/Modal/MemberModal';
import { ModalContext } from './Context/ModalProvider';
import Home from './Components/HomeComponent/Home';

function App() {
  const ModalStore = useContext(ModalContext);


  return (
      <AppContainer>
      <Header></Header>
      {ModalStore.state.data.isShow ? <Modal>{ModalStore.state.data.isLoginBtn ? <Login/> : <SignUp/>}</Modal> : null}

      <ContentWrapper>
          <Content>
            {/* react-router-dom */}
            <Home/>
          </Content>
      </ContentWrapper>

    </AppContainer>
    
  );
}

export default App;


const AppContainer = styled.div`
  width:100vw;
  height:100vh;
`

const ContentWrapper = styled.div`
  background:blue;
  width:100vw;
  padding-top:140px;
  display:flex;
  justify-content:center;
  height:50%;
`

const Content = styled.div`
  width:100%;
  max-width:1100px;
  background:red;
`
