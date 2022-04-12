import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const ClothesPostings = ( { children }) => {


    return(
        <>
            <PostingsWrapper>
                <PostingHeader>
                    <PostingTitle>
                        CLOTHES
                    </PostingTitle>
                    <PostingLink>
                        <Link to='/CoordinationPostings/posting'>글쓰기 ⋙</Link>
                    </PostingLink>
                </PostingHeader>
                {children}
            </PostingsWrapper>
            
        </>
    )
}





export default ClothesPostings;


const PostingsWrapper = styled.div`
    // background:red;
`

const PostingHeader = styled.div`
    width:100%;
    height:50px;
    display:flex;
    align-items:center;
    justify-content:space-between;

`
const PostingTitle = styled.h1`
    color:black;
    margin:0;
`
const PostingLink = styled.p`
    margin:0;

    a {
        text-decoration:none;
        font-weight:bold;
        color: #536dfe;
    }
`
