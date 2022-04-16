import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import PostingItems from './PostingItems';
import { getClothesPost } from '../../API/api';


const ClothesPostings = ( { type } ) => {

    const count = useRef(0);
    const [ data, setDatas ] = useState([]);
    const [isEnd, setIsEnd] = useState(false);

    const getMoreData = () => {
        if(type === 'clothes') {
            getClothesPost(count.current)
            .then((res)=> {
                if(!res.data.length) {
                    setIsEnd(true);
                    return;
                }
                setDatas((data)=>data.concat(res.data))
            })
        }
        count.current+=12;
    }

    useEffect(()=> {
        if(type === 'clothes') {
            getClothesPost(count.current)
            .then((res) => {
                count.current+=12;
                setDatas(res.data);
            })
        }
    }, []);

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
                <MoreBtnArea>
                    <MoreButton isEnd={isEnd} onClick={getMoreData}><p>MORE +</p></MoreButton>
                </MoreBtnArea>
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
    margin-bottom:1vh;

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
const MoreBtnArea = styled.div`
    display:flex;
    justify-content:center;
    margin-bottom:10px;
    
`

const MoreButton = styled.button`
    background:black;
    height:8vh;
    width:50vh;
    color:white;
    border-radius:50px;
    cursor:pointer;

    ${props => {
        if(props.isEnd) {
            return css`
                display:none;
            `
        }
    }}

    p{
        padding:0;
        margin:0;
        font-size:20px;
    }
`