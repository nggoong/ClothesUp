import React, { useContext, useEffect } from 'react';
import Header from './Components/Header';
import styled from 'styled-components';
import Modal from './Components/Modal/Modal';
import {SignUp, Login} from './Components/Modal/MemberModal';
import { ModalContext } from './Context/ModalProvider';
import Home from './Components/HomeComponent/Home';
import ClothesPostings from './Components/Posting/ClothesPostings';
import CoordinationPostings from './Components/Posting/CoordinationPostings';
import { Switch, Route, Redirect, useHistory} from 'react-router-dom';
import Posting from './Components/Posting/Posting';

function App() {
  const ModalStore = useContext(ModalContext);


  return (
      <AppContainer>
      <Header></Header>
      {ModalStore.state.data.isShow ? <Modal>{ModalStore.state.data.isLoginBtn ? <Login/> : <SignUp/>}</Modal> : null}

      <ContentWrapper>
          <Content>
            <Switch>
              <Route exact path="/" render={()=> <Home/>}/>
              <Route exact path="/ClothesPostings" render={()=> <ClothesPostings/>}/>
              <Route exact path="/CoordinationPostings" render={()=> <CoordinationPostings/>}/>
              <Route path="/CoordinationPostings/posting" render={()=> <Posting/>}/>
              <Route render={()=><Redirect to='/'/>}/>
            </Switch>
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
  width:100vw;
  padding-top:140px;
  display:flex;
  justify-content:center;
  // background:blue;
  
`

const Content = styled.div`
  width:100%;
  max-width:1100px;
  // height:50vh;
  // background:red;
`
