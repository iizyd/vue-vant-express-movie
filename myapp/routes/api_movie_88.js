var express = require('express');
var router = express.Router();
var request = require('request');

// ------------------------------

const cheerio = require('cheerio');
const superagent = require('superagent');

// 网站地址
let base_url = 'm.88ys.com';

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
                $('.tab2 dd').each((index, element) => {
                    let children_data = [];
                    $(element).find('.ulNumList a').each((index1, el) => {
                        let item = {
                            set_title: $(el).attr('title'), // 获取标题
                            set_href: $(el).attr('href') // 获取网页链接
                        };
                        children_data.push(item) // 存入最终结果数组
                    });

                    let item = {
                        source_name: $(element).attr('class'),
                        data: children_data
                    };
                    set_result.push(item) // 存入最终结果数组
                });
            }
            resolve(set_result);
            // resolve(res.text);
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
                $('.tb_a .picTxt .con a').each((index, element) => {
                    $(element).children('img').each((index, el) => {
                        let item = {
                            title: $(element).attr('title'), // 获取标题
                            href: $(element).attr('href'), // 获取网页链接
                            banner: $(el).attr('src') // 背景图
                        };
                        result.push(item) // 存入最终结果数组
                    });
                });
                resolve(result);
            }
        })
    })
};

// 获取播放地址
function getPlayUrl(target_url) {
    return new Promise((resolve, reject) => {
        let result = [];
        getHtml(target_url).end((err, res) => {
            if (err) {
                console.log('getPlayUrl请求错误' + err);
            } else {
                let $ = cheerio.load(res.text);
                // console.log($('iframe'));
                $('iframe').each((index, element) => {

                    console.log(index)
                    let item = {
                        src: $(element).attr('src')
                    };
                    result.push(item) // 存入最终结果数组
                });
                // resolve(result);
                resolve(res.text);
            }
        })
    })
};

// 获取搜索结果
function getSearchResult(wd) {
    return new Promise((resolve, reject) => {
        let result = [];
        request.post({
            url: 'https://1090ys.com/?c=search', // 请求的URL
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
                    let item = {
                        title: $(element).attr('title'), // 获取标题
                        href: $(element).attr('href'), // 获取网页链接
                        banner: $(element).attr('data-original') // 背景图
                    };
                    result.push(item) // 存入最终结果数组
                });
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