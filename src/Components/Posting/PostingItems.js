import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';

const PostingItems = ({ data }) => {
    const [stateData, setStateData] = useState([]);

    useEffect(()=> {
        let temp = [];
        temp = data.slice();
        let calcCount = temp.length % 4;
        if(calcCount !== 0) {
            for(let i = 0; i < calcCount; i++) {
                temp.push('');
            }
        }
        setStateData(temp);
        console.log('hello')
        
       
    }, [data])

    return(
        <>
            <PostingItemsWrapper>
               {stateData.map((value, index)=>(<ItemCard key={index} id={value===''? '-1' : value.id} data={value}></ItemCard>))}
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