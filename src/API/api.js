import axios from 'axios';
import key from './key';

const signUp = (userInfo) => {
    let url = `/api/member/signup`;
    return axios.post(url, userInfo);
}

const getmember = () => {
    let url = `/api/member/memberInfo`;
    return axios.get(url);
}


export {signUp, getmember};