import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PostingItems from './PostingItems';
import { getClothesPost } from '../../API/api';


const ClothesPostings = ( { type } ) => {

    const count = useRef(1);
    const [ data, setDatas ] = useState([]);

    useEffect(()=> {
        if(type === 'clothes') {
            getClothesPost(count.current)
            .then((res) => {
                console.log(res);
                count.current+=12;
                setDatas(res.data);
            })
        }
    }, [])

    return(
        <>
            <PostingsWrapper>
                <PostingHeader>
                    <PostingTitle>
                        CLOTHES
                    </PostingTitle>
                    <PostingLink>
                        <Link to='/ClothesPostings/posting'>글쓰기 ⋙</Link>
                    </PostingLink>
                </PostingHeader>
                <PostingContents>
                    <PostingItems data={data}/>
                </PostingContents>
                
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

const PostingContents = styled.div`
    width:100%;
`
