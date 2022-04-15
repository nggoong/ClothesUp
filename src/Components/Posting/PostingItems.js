import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import ItemCard from './ItemCard';

const PostingItems = ({ data }) => {
    const location = useLocation();


    useEffect(()=> {

    }, [])

    return(
        <>
            <PostingItemsWrapper>
               {data.map((value)=>(<ItemCard key={value.id} data={value}></ItemCard>))}
            </PostingItemsWrapper>
        </>
    )
}

export default PostingItems;

const PostingItemsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    width:100%;
`