var express = require('express');
var router = express.Router();
var request = require('request');

// ------------------------------

const cheerio = require('cheerio');
const superagent = require('superagent');

// 网站地址
let web_list = [{
        id: 1,
        title: '88影视',
        url: 'https://m.88ys.com/'
    },
    {
        id: 2,
        title: '猫咪影视',
        url: 'http://tv.k8aa.com/'
    },
    {
        id: 3,
        title: '看看屋',
        url: 'https://m.kankanwu.com/'
    },
    {
        id: 4,
        title: '极速影视',
        url: 'https://www.jisuysw.com/'
    },
    {
        id: 5,
        title: '6v影视',
        url: 'https://www.6vdy.tv/'
    },
    {
        id: 6,
        title: '4k屋',
        url: 'http://www.4kwu.cc/'
    },
    {
        id: 7,
        title: 'BT4K影院',
        url: 'http://www.bt4kyy.com/'
    },
    {
        id: 8,
        title: '乐看',
        url: 'http://m.lelekan.com/'
    },
    {
        id: 9,
        title: '飞空',
        url: 'https://www.feikong.cc/'
    },
    {
        id: 10,
        title: '面包',
        url: 'https://m.mianbao99.com/'
    },
    {
        id: 11,
        title: '查好啦',
        url: 'http://www.chahao.la/'
    },
    {
        id: 12,
        title: '看空间',
        url: 'https://www.chaokankongjian.com/'
    },
    {
        id: 13,
        title: '琪琪电影',
        url: 'http://www.gzyingmei.com/'
    },
    {
        id: 14,
        title: '青苹果影院',
        url: 'http://www.ywsjyj.com/'
    },
    {
        id: 15,
        title: '淘电影',
        url: 'http://www.tao2t.com/'
    },
    {
        id: 16,
        title: '农民影视',
        url: 'http://www.raodo.cn/'
    },
    {
        id: 17,
        title: '高清云影视',
        url: 'https://mip.xunleiyy.com/'
    },
    {
        id: 18,
        title: '33电影',
        url: 'https://www.33lai.com/'
    },
    {
        id: 19,
        title: '873',
        url: 'https://www.873g.com/'
    },
    {
        id: 20,
        title: '873',
        url: 'http://m.86cg.com/variety/'
    }
]

// 首页
router.get('/index', async (req, res, next) => {
    res.send(web_list);
});

/* GET api movie page. */
router.get('/', function (req, res, next) {
    res.send('success');
});

module.exports = router;