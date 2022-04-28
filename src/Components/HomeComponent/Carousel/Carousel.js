import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const ImageDiv = ( { item } ) => {


    return(
        <>
            <IMG src={item}></IMG>
        </>
    )
}

const IMG = styled.img`
    width:65vw;
    height:100%;
    margin:0;
    padding:0;
    min-width:65vw;
`

const Carousel = () => {

    const ImageList = ['/CarouselImage/clothesupImage1.png', '/CarouselImage/clothesupImage2.png',
    '/CarouselImage/clothesupImage3.png'];
    const TOTAL_SLIDES = ImageList.length - 1;
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);

    const PrevClickHander = () => {
        if(currentSlide === 0) setCurrentSlide(TOTAL_SLIDES);
        else setCurrentSlide(currentSlide - 1);
    }

    const NextClickHandler = () => {
        if(currentSlide >= TOTAL_SLIDES) setCurrentSlide(0);
        else setCurrentSlide(currentSlide + 1);
    }

    useEffect(()=> {
        slideRef.current.style.transition = `all 0.5s ease-in-out`;
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }, [currentSlide])


    return(
        <>
            <CarouselWrapper>
            <MoveBtn prev={true} onClick={PrevClickHander}>{'<'}</MoveBtn>
            <CarouselViewer>
                <CarouselSlider ref={slideRef}>
                        {ImageList.map((item, index)=> <ImageDiv key={index} item={item}></ImageDiv>)}
                </CarouselSlider>
                </CarouselViewer>
                <MoveBtn onClick={NextClickHandler}>{'>'}</MoveBtn>
            </CarouselWrapper>
            <CarouselIndexArea><p>{`${currentSlide + 1} / ${TOTAL_SLIDES + 1}`}</p></CarouselIndexArea>
        </>
    )
}

export default Carousel;

const CarouselWrapper = styled.div`
    display:flex;
    height:100%;
    width:100%;
    // overflow:hidden;
    justify-content:space-between;
    user-select:none;
`

const MoveBtn = styled.div`
    user-select:none;
    height:100%;
    display:flex;
    justify-content:${(props) => props.prev ? 'flex-start' : 'flex-end'};
    align-items:center;
    width:5%;
    font-size:30px;
`

const CarouselViewer = styled.div`
    width:65vw;
    max-width:65vw;
    overflow:hidden;
    margin: 0 auto;
`

const CarouselSlider = styled.div`
    height:100%;
    display:flex;
    margin: 0 auto;
    width:65vw;
`

const CarouselIndexArea = styled.div`
    width:100%;
    text-align:center;
    user-select:none;
    
    p{
        font-size:1.5vw;
    }
`
