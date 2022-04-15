import axios from 'axios';

const signUp = (signUpInput) => {
    let url = `/api/member/signup`;
    return axios.post(url, signUpInput);
}

const login = (loginInput) => {
    let url = `/api/member/login/${loginInput.id}`;
    return axios.get(url, loginInput);
}

const clothesPostPosting = (PostingInput) => {
    let url = '/api/posting/clothes-post';
    return axios.post(url, PostingInput);
}

const codiPostPosting = (PostingInput) => {
    let url = '/api/posting/codi-post';
    return axios.post(url, PostingInput);
}

const getClothesPost = (num) => {
    let url = `/api/posting/clothes-post/count/${num}`;
    return axios.get(url);
}

export {signUp, login, clothesPostPosting, getClothesPost};