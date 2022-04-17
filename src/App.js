import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from './Components/Header';
import styled from 'styled-components';
import Modal from './Components/Modal/Modal';
import {SignUp, Login} from './Components/Modal/MemberModal';
import { ModalContext } from './Context/ModalProvider';
import Home from './Components/HomeComponent/Home';
import ClothesPostings from './Components/Posting/ClothesPostings';
import { Switch, Route, Redirect } from 'react-router-dom';
import Posting from './Components/Posting/Posting';

function App() {
  const ModalStore = useContext(ModalContext);
  const [controllerShow, setControllerShow] = useState(false);
  const app = useRef();
  const scrollYOffset = useRef(0);

  const ScrollHandler = (e) => {
    scrollYOffset.current = e.target.scrollTop;
    if(scrollYOffset.current > window.innerHeight * 0.8) {
      setControllerShow(true);
    }
    else {
      setControllerShow(false);
    }
  }

  useEffect(()=> {
    let AppContainer = app.current;
    AppContainer.addEventListener('scroll', ScrollHandler);
  }, [])


  return (
      <AppContainer className='App' ref={app}>
      <Header></Header>
      {ModalStore.state.data.isShow ? <Modal>{ModalStore.state.data.isLoginBtn ? <Login/> : <SignUp/>}</Modal> : null}
      <ContentWrapper>
        <ScrollBtnWrapper isDisplay={controllerShow}></ScrollBtnWrapper>
          <Content>
            <Switch>
              <Route exact path="/" render={()=> <Home/>}/>
              <Route exact path="/ClothesPostings" render={()=> <ClothesPostings type={'clothes'}></ClothesPostings>}/>
              <Route exact path="/CoordinationPostings" render={()=> <ClothesPostings type={'codi'}></ClothesPostings>}/>
              <Route path="/ClothesPostings/posting" render={()=> <Posting/>}/>
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
  overflow-x:hidden;
`

const ContentWrapper = styled.div`
  width:100vw;
  padding-top:140px;
  display:flex;
  justify-content:center;
  
`

const Content = styled.div`
  width:100%;
  max-width:1100px;
  // height:50vh;
`

const ScrollBtnWrapper = styled.div`
  position:fixed;
  width:5vh;
  height:15vh;
  background:blue;
  right:5%;
  bottom:50px;
  transition: all 0.5s;
  opacity:${props => props.isDisplay ? '1' : '0'};
`
