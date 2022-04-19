import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import PostingItems from './PostingItems';
import { getClothesPost, getCodiPost } from '../../API/api';


const moveScrollTop = () => {
    document.querySelector('.App').scrollTo(0, 0);
}

const ClothesPostings = ( { type } ) => {

    const count = useRef(0);
    const dist = useRef();
    const [ data, setDatas ] = useState([]);
    const [notDisplayed, setNotDisplayed] = useState(false);
    const location = useLocation();

    const getMoreData = () => {
        
        if(type === 'clothes') {
            getClothesPost(count.current, dist.current)
            .then((res)=> {
                if(!res.data.length) {
                    setNotDisplayed(true);
                    return;
                }
                setDatas((data)=>data.concat(res.data))
            })
        }
        else if(type === 'codi') {
            getCodiPost(count.current, dist.current)
            .then((res)=> {
                if(!res.data.length) {
                    setNotDisplayed(true);
                    return;
                }
                setDatas((data)=>data.concat(res.data));
            })
        }
        count.current+=dist.current;
    }

    useEffect(()=> {
        if(location.pathname === '/') dist.current = 8;
        else dist.current = 12;
        if(type === 'clothes') {
            getClothesPost(count.current, dist.current)
            .then((res) => {
                setDatas(res.data);
            })
        }
        else if(type==='codi') {
            getCodiPost(count.current, dist.current)
            .then((res)=> {
                setDatas(res.data);
            })
        }
        count.current+=12;
        return(()=> {
            count.current = 0;
            setNotDisplayed(false);
        })
    }, [type]);

    useEffect(()=> {
        moveScrollTop();
    }, [type]);

    useEffect(()=> {
        if(location.pathname === '/') {
            dist.current = 8;
            setNotDisplayed(true);
        }
        else {
            dist.current = 12;
        } 
    }, [location.pathname]);

    return(
        <>
            <PostingsWrapper>
                <PostingHeader>
                    <PostingTitle>
                        {type==='clothes'? 'ITEM' : 'CODI'}
                    </PostingTitle>
                    <PostingLink>
                    {type==='clothes'? <Link to='/ClothesPostings/posting'>글쓰기 ⋙</Link> : <Link to='/CoordinationPostings/posting'>글쓰기 ⋙</Link>} 
                    </PostingLink>
                </PostingHeader>
                <PostingContents>
                    <PostingItems data={data}/>
                </PostingContents>
                <MoreBtnArea>
                    <MoreButton notDisplayed={notDisplayed} onClick={getMoreData}><p>MORE +</p></MoreButton>
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
        if(props.notDisplayed) {
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