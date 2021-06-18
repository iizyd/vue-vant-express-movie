import {
    Get
} from "./api";

// export const getIndexData = (config) => {
//     return Get('/api/index', config)
// };
let base_url = 'http://localhost:3002';
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

// ---------------------
let Mbase_url = 'http://localhost:3002';
let Mtemp = '/movie/morning';


export const MgetIndexData = (config) => {
    return Get(`${Mbase_url}/api${Mtemp}/index`, config)
};
export const MgetDetailData = (config) => {
    return Get(`${Mbase_url}/api${Mtemp}/get_set`, config)
};
export const MgetPlayUrl = (config) => {
    return Get(`${Mbase_url}/api${Mtemp}/get_play_url`, config)
};
export const MgetSearchData = (config) => {
    return Get(`${Mbase_url}/api${Mtemp}/get_search`, config)
};
export const MgetSiteList = (config) => {
    return Get(`${Mbase_url}/api${Mtemp}/web_list/index`, config)
};
