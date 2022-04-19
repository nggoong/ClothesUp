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


const getClothesPost = (from, to) => {
    let url = `/api/posting/clothes-post/count/${from}/${to}`;
    return axios.get(url);
}

const getCodiPost = (from, to)=>{
    let url = `/api/posting/codi-post/count/${from}/${to}`;
    return axios.get(url);
}

export {signUp, login, clothesPostPosting, codiPostPosting, getClothesPost, getCodiPost};