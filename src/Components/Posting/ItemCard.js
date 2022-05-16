import React from 'react';
import styled, { css } from 'styled-components';

const remakeTime = (timeStr) => {
    let result;
    result = timeStr.replace(/[A-Za-z]/g, ' ').slice(0,19);
    return result;
}

const ItemCard = ({ data }) =>{
    if(data === '') {
        return(
            <>
                <Card/>
            </>
        )
    } 

    return(
        <>
            <Card notEmpty>
                <ImageArea>
                    <img alt="image" src={data.image}></img>
                </ImageArea>
                <IDArea>
                    <p>{data.user_nickname}</p>
                </IDArea>
                <TitleArea>
                    <h1>{data.posting_title}</h1>
                </TitleArea>
                <HashTagArea>
                {remakeTime(data.posting_time)}
                </HashTagArea>
                <TimeArea>
                {remakeTime(data.posting_time)}
                </TimeArea>

            </Card>
        </>
    )
}

const Card = styled.div`
    width:23%;
    height:55vh;
    border:1px solid balck;
    margin-bottom:10vh;
    user-select:none;
    ${props => {
        if(props.notEmpty) {
            return css`
            cursor: pointer;
        `
        }
    }}
`

const ImageArea = styled.div`
    height:65%;
    background:white;
    img {
        width:100%;
        height:100%;
    }
`
const IDArea = styled.div`
    display:flex;
    align-items:center;
    height:7%;

    p {
        margin:0;
        padding:0;
    }
`
const TitleArea = styled.div`
    height:10%;
    
    display:-webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    
    h1 {
        font-size:15px;
        margin:0;
    }
`

const HashTagArea = styled.div`
    // background:black;
    height:10%;
`
const TimeArea = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    height:8%;
    font-size:12px;
`

export default ItemCard;