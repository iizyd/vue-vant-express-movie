import Axios from 'axios';

// const instance = Axios.create()

function Get(url, config) {
    return Axios.get(url, {
        ...config
    });
}

function Post(url, data, config) {
    return Axios.get(url, {
        data,
        ...config
    });
}

export {
    Get,
    Post
}