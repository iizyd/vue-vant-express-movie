var express = require('express');
var router = express.Router();
var request = require('request');

// ------------------------------

const cheerio = require('cheerio');
const superagent = require('superagent');

// 网站地址
let base_url = 'http://m.86cg.com';

// [description] - 使用superagent.get()方法来访问xxx首页
function getHtml(target_url) {
    return superagent.get(target_url);
}

// 获取集数
function getSetData(target_url) {
    return new Promise((resolve, reject) => {
        let set_result = [];
        getHtml(target_url).end((err, res) => {
            if (err) {
                console.log('getSetData请求错误' + err);
            } else {
                let $ = cheerio.load(res.text);
                t = res.text;
                $('.m_title h2').each((index, element) => {
                    // 筛选播放源
                    if ($(element).text().includes("播")) {
                        let source_obj = {
                            set_source: $(element).text(),
                            sets: []
                        };
                        // 真正的播放地址
                        $(element).parent().siblings().find('.swiper-navcontainer a').each((i, e) => {
                            let item = {
                                set_title: $(e).text(), // 获取标题
                                set_href: $(e).attr('href') // 获取网页链接
                            };
                            source_obj.sets.push(item) // 存入数组
                        })
                        set_result.push(source_obj);
                    }
                });
            }
            resolve(set_result);
        });
    })
};

// 获取首页数据
function getData(target_url) {
    return new Promise((resolve, reject) => {
        let result = [];
        getHtml(target_url).end((err, res) => {
            if (err) {
                console.log('getData请求错误' + err);
            } else {
                let $ = cheerio.load(res.text);
                $('.list_model a').each((index, element) => {
                    let item = {
                        title: $(element).attr('title'), // 获取标题
                        href: $(element).attr('href'), // 获取网页链接
                        banner: base_url + $(element).find('dl dt img').attr('data-src') // 背景图
                    };
                    result.push(item) // 存入最终结果数组
                });
                resolve(result);
            }
        })
    })
};

// 获取播放地址
function getPlayUrl(target_url) {
    console.log(target_url);

    return new Promise((resolve, reject) => {
        let result = [];
        getHtml(target_url).end((err, res) => {
            if (err) {
                console.log('getPlayUrl请求错误' + err);
            } else {
                let $ = cheerio.load(res.text);
                let str = $('.ent_detail .ent_poster script').html().match(/\{.+\}/).toString().replace(/\\/, '');
                str = JSON.parse(str);
                let re_str = str.apiurl + str.url;
                if (re_str.startsWith('htt')) {
                    resolve([{
                        src: re_str
                    }])
                } else {
                    resolve([{
                        src: base_url + re_str
                    }])
                }

            }
        })
    })
};

// 获取搜索结果
function getSearchResult(wd) {
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
                        banner: img_src.startsWith('htt') ? img_src : base_url + img_src // 背景图
                    };
                    result.push(item) // 存入最终结果数组
                });
                console.log(result);
                resolve(result);
            }
        });
    })
};

// 首页
router.get('/index', async (req, res, next) => {
    getData(base_url).then(data => {
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
});

// 集数
router.get('/get_set', async (req, res, next) => {
    let url = req.query.url;
    if (!url) {
        res.send('参数不正确');
    } else {
        getSetData(base_url + url).then(result => {
            let set_data = result;
            res.send(set_data);
        }).catch(err => {
            console.log(err);
            res.send(err);
        });
    }
});

// 播放地址
router.get('/get_play_url', async (req, res, next) => {
    let url = req.query.url;
    console.log(base_url + url);
    if (!url) {
        res.send('参数不正确');
    } else {
        getPlayUrl(base_url + url).then(result => {
            let set_data = result;
            res.send(set_data);
        }).catch(err => {
            console.log(err);
            res.send(err);
        });
    }
});

// 搜索
router.get('/get_search', async (req, res, next) => {
    let wd = unescape(req.query.wd);
    if (!wd) {
        res.send('参数不正确');
    } else {
        getSearchResult(wd).then(result => {
            let search_data = result;
            res.send(search_data);
        }).catch(err => {
            console.log(err);
            res.send(err);
        });
    }
});


/* GET api movie page. */
router.get('/', function (req, res, next) {
    res.send('success');
});

module.exports = router;