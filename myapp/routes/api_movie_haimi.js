var express = require('express');
var router = express.Router();
var request = require('request');
var {
    list
} = require('./api-hai-mi/site-list');

// ------------------------------

const cheerio = require('cheerio');
const superagent = require('superagent');

// 网站地址
let base_url = 'https://www.haiduomi.cc';

// 使用superagent.get()方法来访问xxx首页
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
                // $('.stui-content__playlist a').each((index, element) => {
                //     let item = {
                //         set_title: $(element).text(), // 获取标题
                //         set_href: $(element).attr('href') // 获取网页链接
                //     }
                //     set_result.push(item);
                // });
                $('.playlist .stui-pannel_hd .title').each((index, element) => {
                    let name = `云播${index}`;
                    let source_obj = {
                        set_source: name,
                        sets: []
                    };
                    $('.stui-content__playlist').each((i, e) => {
                        if (index == i) {
                            $(e).find('a').each((ind, el) => {
                                let item = {
                                    set_title: $(el).text(), // 获取标题
                                    set_href: $(el).attr('href') // 获取网页链接
                                }
                                source_obj.sets.push(item);
                            })
                        }
                    });
                    set_result.push(source_obj);
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
                $('.stui-vodlist .stui-vodlist__box>a').each((index, element) => {
                    let img_src = $(element).attr('data-original');
                    let item = {
                        title: $(element).attr('title'), // 获取标题
                        href: $(element).attr('href'), // 获取网页链接
                        banner: img_src.startsWith('htt') ? img_src : base_url + img_src // 背景图
                        // banner: base_url + $(element).attr('data-original') // 背景图
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
                // 异步script标签文本
                let script_text = $('.stui-player__video script').html();
                // 解析成对象
                let script_obj = JSON.parse(script_text.match(/\{.+\}/).toString().replace(/\\/, ''));
                // 地址列表
                let from_url = script_obj.from;
                // 结果URL是由两个URL拼接成的
                let head_url = '';
                let tail_url = '';
                if (list[from_url]) {
                    head_url = list[from_url].parse.replace(/\\/, '')
                    // base64解码
                    let b = new Buffer(script_obj.url, 'base64')
                    let s = b.toString();
                    tail_url = s;
                }
                resolve([{
                    src: head_url + tail_url
                }]);
            }
        })
    })
};

// 获取搜索结果
function getSearchResult(wd) {
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
    let wd = encodeURI(req.query.wd);
    // let wd = unescape(req.query.wd);
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