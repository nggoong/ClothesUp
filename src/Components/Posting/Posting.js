import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../../Context/LoginProvider';
import { clothesPostPosting } from '../../API/api';

export const HashTagBox = ({ text }) => {
    
    return(
        <>
            <TagBox>
                <p>{text}</p>
            </TagBox>
        </>
    )
}

const TagBox = styled.div`
    display:flex;
    align-items:center;
    height:30%;
    background:white;
    color:black;
    border-radius:10px;
    margin:0 3%;
    box-sizing:border-box;
    padding:10px;

    
    
    p {
        font-weight:bold;
        user-select:none;
        cursor:pointer;
        padding:0;
    }
`



const Posting = () => {
    const LoginStore = useContext(LoginContext);
    const imgRef = useRef();
    const [inputs, setInputs] = useState({
        title:'',
        contentText:'',
        file:null,
        hashtag:'',
    })
    const tmpHashtag = useRef([]);

    const keyUpHandler = (e) => {
        if(e.keyCode === 13) {
            if(e.target.value === '') return; 
            let value = `#${e.target.value.replace(/[ ]/g, '')}`;
            setInputs((inputs) => ({...inputs, hashtag:inputs.hashtag+=value}));
            tmpHashtag.current.push(value);
            e.target.value = '';
        }
    }

    const setThumbnail = (e) => {
        let files = e.target.files;
        if(files && files[0]) {
            setInputs((inputs)=>({...inputs, file:files[0]}));
            console.log(inputs);
            let reader = new FileReader();
            let current = imgRef.current;
            
    
            reader.onload = (e)=> {
                current.setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(files[0]);
        }
       
    }

    const textChangeHandler = (e) => {
        setInputs((inputs)=>({...inputs, [e.target.name]:e.target.value}));
    }

    const postingHandler = () => {
        const formData = new FormData();
        formData.append('nickname', LoginStore.state.data.nickname);
        formData.append('title', inputs.title);
        formData.append('contents', inputs.contentText);
        formData.append('hashtag', inputs.hashtag);
        formData.append('image', inputs.file);

        clothesPostPosting(formData)
        .then((res)=>{
            alert('posting완료');
        })
        .catch((e)=>{
            console.log(e);
        })

        setInputs(
            {title:'',
            contentText:'',
            file:null,
            hashtag:'',}
        )
    }

    return(
        <>
            <PostingInputsWrapper>
                <ImageViewer>
                    <div className='Image'>
                        <img ref={imgRef}></img>
                    </div>
                </ImageViewer>
                <Inputs>
                <Contentarea>
                    <input type='text' onChange={textChangeHandler} name='title' value={inputs.title}></input>
                    <textarea maxLength='100' name='contentText' value={inputs.contentText} onChange={textChangeHandler} placeholder='100자 이하로 작성해주세요 '/>
                </Contentarea>
                <HashImageBtnWrapper>
                    <div className='file-input-area'>
                        <input type='file' name='file' onChange={setThumbnail}></input>
                    </div>
                    <div className='hashtag-area'>
                        <div className='hashtag-viewer'>
                            {tmpHashtag.current.map((tag, index)=>(<HashTagBox text={tag} key={index}></HashTagBox>))}
                        </div>
                        <div className='hashtag-input-area'>
                            <input name='hashtag'onKeyUp={keyUpHandler} placeholder='해시태그 입력 후 엔터' ></input>
                        </div>

                    </div>
                    <div className='button-area'>
                    <Button onClick={postingHandler}>포스트</Button>
                    <Button>나가기</Button>
                    </div>
                </HashImageBtnWrapper>
                </Inputs>
            </PostingInputsWrapper>
        </>
    )
}

export default Posting;

const PostingInputsWrapper = styled.div`
    height:80vh;
    width:100%;
    // background:yellow;
`

const ImageViewer = styled.div`
    height:60%;
    // background:red;
    display:flex;
    justify-content:center;
    align-items:center;

    .Image {
        width:50%;
        max-width:calc(110px*0.7)px;
        height:100%;
        background:white;
    }

    img {
        width:100%;
        height:100%;
        
    }
`

const Inputs = styled.div`
    display:flex;
    width:100%;
    height:40%;
    border:2px solid black;
`

const Contentarea = styled.div`
    background:yellow;
    height:100%;
    width:75%;

    textarea {
        width:100%;
        height:85%;
        box-sizing:border-box;
        padding:1%;
        font-size:20px;
        resize:none;
        border:none;
        border-right:1px solid black;
    }
    textarea:focus {
        outline:none;
    }
    input {
        height:15%;
        box-sizing:border-box;
        margin:0;
        border:0;
        border-bottom:1px solid black;
        border-right:1px solid black;
        width:100%;
        font-size:18px;
        
    }
`

const HashImageBtnWrapper = styled.div`
    width:25%;
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content:space-between;
    background:#eeeeee;

    .file-input-area{
        border:1px solid black;
    }
    .hashtag-area {
        position:relative;
        // display:flex;
        // flex-direction:column;
        // justify-content:space-between;
        height:50%;
        background:lightgray;

        .hashtag-viewer {
            display:flex;
            align-items:center;
            overflow-x:auto;
            overflow-y: hidden;
            height:80%;
           
        }
        .hashtag-input-area {
            width:100%;
            height:50%;
            background:yello;

            input {
                box-sizing:border-box;
                width:100%;
                
            }
        }
    }
    .button-area {
        height:20%;
        
    }
`

const Button = styled.button`
    width:50%;
    
    background:black;
    height:100%;
    color:white;
    font-weight:bold;
    border:none;

    &:hover {
        background: #304ffe;
    }
`


