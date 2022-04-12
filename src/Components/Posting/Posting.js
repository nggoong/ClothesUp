import React from 'react';
import styled from 'styled-components';

const Posting = () => {

    return(
        <>
            <PostingInputsWrapper>
                <ImageViewer>
                    <div className='Image'>
                        <img></img>
                    </div>
                </ImageViewer>
                <Inputs>
                <ContentInput className='hello'></ContentInput>
                </Inputs>
            </PostingInputsWrapper>
        </>
    )
}

export default Posting;

const PostingInputsWrapper = styled.div`
    height:80vh;
    width:100%;
    background:yellow;
`

const ImageViewer = styled.div`
    height:60%;
    background:red;
    display:flex;
    justify-content:center;
    align-items:center;
    // border:none;

    .Image {
        width:50%;
        height:100%;
        background:white;
        // border:none;
    }
    img {
        width:100%;
        height:100%;
        // border:none;
    }
`

const Inputs = styled.div`
    height:40%;
    background:white;
    // border:none;
`

const ContentInput = styled.div`
    background:yellow;
    height:100%;
    width:75%;
`

