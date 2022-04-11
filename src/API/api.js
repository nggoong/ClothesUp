import axios from 'axios';

const signUp = (signUpInput) => {
    let url = `/api/member/signup`;
    return axios.post(url, signUpInput);
}

const login = (loginInput) => {
    let url = `/api/member/login/${loginInput.id}`;
    return axios.get(url, loginInput);
}


export {signUp, login};