var express = require('express');
var router = express.Router();
var request = require('request');
const cheerio = require('cheerio');
const superagent = require('superagent');

let base_url_1090 = '1090ys.com';
let base_url_morning = 'http://m.86cg.com';
let base_url_haimi = 'https://www.haiduomi.cc';

// 1090获取搜索结果
function getSearchResult1090(wd) {
    return new Promise((resolve, reject) => {
        let result = [];
        request.post({
            url: 'http://1090ys.com/?c=search', // 请求的URL
            form: {
                wd: wd
            }
        }, function (error, response, body) {
            if (error) {
                console.log(error);
                reject(error);
            }
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(body);
                $('.stui-vodlist__media .activeclearfix .v-thumb').each((index, element) => {
                    // let item = {
                    //     title: $(element).attr('title'), // 获取标题
                    //     href: $(element).attr('href'), // 获取网页链接
                    //     banner: $(element).attr('data-original') // 背景图
                    // };

                    let img_src = $(element).attr('data-original');
                    let item = {
                        title: $(element).attr('title'), // 获取标题
                        href: $(element).attr('href'), // 获取网页链接
                        banner: img_src.startsWith('htt') ? img_src : base_url_1090 + img_src // 背景图
                    };
                    result.push(item) // 存入最终结果数组
                });
                console.log(result);
                resolve(result);
            }
        });
    })
};


// morning获取搜索结果
function getSearchResultMorning(wd) {
    return new Promise((resolve, reject) => {
        let result = [];
        request.post({
            url: 'http://m.86cg.com/search/', // 请求的URL
            form: {
                wd: wd
            }
        }, function (error, response, body) {
            if (error) {
                console.log(error);
                reject(error);
            }
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(body);
                $('.list_model a').each((index, element) => {
                    // let item = {
                    //     title: $(element).attr('title'), // 获取标题
                    //     href: $(element).attr('href'), // 获取网页链接
                    //     banner: base_url + $(element).find('dl dt img').attr('data-src') // 背景图
                    // };

                    let img_src = $(element).find('dl dt img').attr('data-src');
                    let item = {
                        title: $(element).attr('title'), // 获取标题
                        href: $(element).attr('href'), // 获取网页链接
                        banner: img_src.startsWith('htt') ? img_src : base_url_morning + img_src // 背景图
                    };
                    result.push(item) // 存入最终结果数组
                });
                console.log(result);
                resolve(result);
            }
        });
    })
};

// haimi获取搜索结果
function getSearchResultHaiMi(wd) {
    return new Promise((resolve, reject) => {
        let result = [];
        request.get({
            url: `https://www.haiduomi.cc/search.html?wd=${wd}`, // 请求的URL
        }, function (error, response, body) {
            if (error) {
                console.log(error);
                reject(error);
            }
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(body);
                $('.stui-vodlist__media .thumb>a').each((index, element) => {
                    let img_src = $(element).attr('data-original');
                    let item = {
                        title: $(element).attr('title'), // 获取标题
                        href: $(element).attr('href'), // 获取网页链接
                        banner: img_src.startsWith('htt') ? img_src : base_url_haimi + img_src // 背景图
                    };
                    result.push(item) // 存入最终结果数组
                });
                console.log(result);
                resolve(result);
            }
        });
    })
};

async function searchAll(wd) {
    let api_movie_wd = unescape(wd);
    let api_movie_morning_wd = unescape(wd);
    let api_movie_haimi_wd = encodeURI(wd);

    let result = [];

    try {
        let result_1 = await getSearchResult1090(api_movie_wd);
        let result_2 = await getSearchResultMorning(api_movie_morning_wd);
        let result_3 = await getSearchResultHaiMi(api_movie_haimi_wd);

        result = [{
                name: '资源一',
                id: 1,
                data: result_1
            },
            {
                name: '资源二',
                id: 2,
                data: result_2
            },
            {
                name: '资源三',
                id: 3,
                data: result_3
            }
        ]
        return new Promise((resolve, reject) => {
            resolve(result);
        })
    } catch (err) {
        result = err.toString();
        return new Promise((resolve, reject) => {
            reject(result);
        })
    }
}



// 搜索
router.get('/search_all', async (req, res, next) => {
    let wd = req.query.wd;
    if (!wd) {
        res.send('参数不正确');
    } else {
        searchAll(wd).then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        })
    }
});

// 路由根据id重定向
router.get('/main', function (req, res, next) {
    let id = req.query.id;
    let type = req.query.type;
    let url = req.query.url;
    if (id == 1) {
        res.redirect(`/api/movie/${type}?url=${url}`);
    } else if (id == 2) {
        res.redirect(`/api/movie/morning/${type}?url=${url}`);
    } else {
        res.redirect(`/api/movie/haimi/${type}?url=${url}`);
    }
});

router.get('/main/search', function (req, res, next) {
    let id = req.query.id;
    let type = req.query.type;
    let wd = req.query.wd;
    if (id == 1) {
        res.redirect(`/api/movie/${type}?wd=${wd}`);
    } else if (id == 2) {
        res.redirect(`/api/movie/morning/${type}?wd=${wd}`);
    } else {
        res.redirect(`/api/movie/haimi/${type}?wd=${wd}`);
    }
});

/* GET api movie page. */
router.get('/', function (req, res, next) {
    res.send('success');
});

module.exports = router;