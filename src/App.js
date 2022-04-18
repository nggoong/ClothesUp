import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from './Components/Header';
import styled, { css } from 'styled-components';
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

  const onScrollBtnClickHandler = (e) => {
    let AppContainer = app.current;
    if(e.target.classList.contains('up-btn')) {
      AppContainer.scrollTo(0, 0);
    }
    else if(e.target.classList.contains('down-btn')) {
      let YOffset = AppContainer.scrollHeight - window.innerHeight;
      AppContainer.scrollTo(0, YOffset);
    }
  }


  return (
      <AppContainer className='App' ref={app}>
      <Header></Header>
      {ModalStore.state.data.isShow ? <Modal>{ModalStore.state.data.isLoginBtn ? <Login/> : <SignUp/>}</Modal> : null}
      <ContentWrapper>
        <ScrollBtnWrapper isDisplay={controllerShow} onClick={onScrollBtnClickHandler}>
          <ScrollButton className='up-btn'>∧</ScrollButton>
          <ScrollButton className='down-btn'>∨</ScrollButton>
        </ScrollBtnWrapper>
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
  right:4vw;
  bottom:7vh;
  transition: all 0.5s;
  ${(props)=> {
    if(!props.isDisplay) {
      return css`
        visibility:hidden;
        opacity:0;
      `
    }
  }}
`

const ScrollButton = styled.button`
  width:100%;
  height:50%;
  font-size:20px;
  font-weight:bold;
  
`
