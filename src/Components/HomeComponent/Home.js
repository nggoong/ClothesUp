import React from 'react';
import styled from 'styled-components';
import ClothesPostings from '../Posting/ClothesPostings';

const Home = () => {

    return(
        <>
            <AdArea>
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
    display:flex;
    height:65vh;
    background:black;
    margin-bottom:5vh;
`

const PostingsArea = styled.div`
    margin-bottom:5vh;
`

