import React from 'react';
import styled from 'styled-components';

const ItemCard = ({ data }) =>{


    return(
        <>
            <Card>
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

                </HashTagArea>
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
    cursor:pointer;
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
    display:flex;
    align-items:center;
    height:10%;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: [...];
    

    h1 {
        font-size:16px;
        margin:0;
    }
`

const HashTagArea = styled.div`
    background:black;
    height:18%;
`

export default ItemCard;