import React from 'react';
import styled from 'styled-components';
import ClothesPostings from '../Posting/ClothesPostings';
import Carousel from './Carousel/Carousel';

const Home = () => {

    return(
        <>
            <AdArea>
                <Carousel></Carousel>
            </AdArea>
            <PostingsArea>
                <ClothesPostings type={'clothes'}></ClothesPostings>
            </PostingsArea>
            <PostingsArea>
                <ClothesPostings type={'codi'}></ClothesPostings>
            </PostingsArea>
            
        </>
    )
}

export default Home;

const AdArea = styled.div`
    height:65vh;
    width:100%;
    margin-bottom:5vh;
`

const PostingsArea = styled.div`
    margin-bottom:5vh;
`

