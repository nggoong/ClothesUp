import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const PostingHeader = ({ type }) => {
    const location = useLocation();
    const [datas, setDatas] = useState({
        postingTitle: '',
        postingLink: '',
        linkText : ''
    });

    useEffect(()=> {
        if(location.pathname === '/') {
            if(type==='clothes') {
                setDatas({
                    postingTitle: 'ITEM',
                    postingLink: '/ClothesPostings',
                    linkText: '더보기 ⋙'
                })
            }
            else if(type==='codi') {
                setDatas({
                    postingTitle: 'CODI',
                    postingLink:'/CoordinationPostings',
                    linkText: '더보기 ⋙'
                })
            }
        }
        else {
            if(type==='clothes') {
                setDatas({
                    postingTitle:'ITEM',
                    postingLink:'/ClothesPostings/posting',
                    linkText:'글쓰기 ⋙'
                })
            }
            else if(type==='codi') {
                setDatas({
                    postingTitle:'CODI',
                    postingLink:'/CoordinationPostings/posting',
                    linkText:'글쓰기 ⋙'
                })
            }
        }
    }, [location.pathname, type, datas])

    return(
        <>
        <PostingHeaderWrapper>
                    <PostingTitle>
                        {datas.postingTitle}
                    </PostingTitle>
                    <PostingLink>
                        <Link to={datas.postingLink}>{datas.linkText}</Link>
                    </PostingLink>
                </PostingHeaderWrapper>
        </>
    )
}

export default PostingHeader;

const PostingHeaderWrapper = styled.div`
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