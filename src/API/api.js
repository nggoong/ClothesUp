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

export {signUp, login, clothesPostPosting};