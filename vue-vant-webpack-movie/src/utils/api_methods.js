import {
    Get
} from "./api";

// export const getIndexData = (config) => {
//     return Get('/api/index', config)
// };
let base_url = 'http://39.107.243.50:3002';
let temp = '/movie';

export const getIndexData = (config) => {
    return Get(`${base_url}/api${temp}/index`, config)
};
export const getDetailData = (config) => {
    return Get(`${base_url}/api${temp}/get_set`, config)
};
export const getPlayUrl = (config) => {
    return Get(`${base_url}/api${temp}/get_play_url`, config)
};
export const getSearchData = (config) => {
    return Get(`${base_url}/api${temp}/get_search`, config)
};
export const getSiteList = (config) => {
    return Get(`${base_url}/api${temp}/web_list/index`, config)
};