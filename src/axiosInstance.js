import axios from "axios";

const instance = axios.create({
    baseURL: 'https://burger-5c39e.firebaseio.com/'
});

export default instance;