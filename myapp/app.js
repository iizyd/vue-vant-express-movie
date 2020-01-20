var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var zhixiaoRouter = require('./routes/zhixiao');
var movieRouter = require('./routes/movie');
// api接口
var apiMovieRouter = require('./routes/api_movie');
var apiMovieMorningRouter = require('./routes/api_movie_morning_light');
var apiMovieWebSiteRouter = require('./routes/api_movie_website_list');
var apiMovieHaiMiRouter = require('./routes/api_movie_haimi');
var apiMovieSearchAllRouter = require('./routes/api_movie/search_all');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
// 静态资源
app.use(express.static(path.join(__dirname, 'public')));
app.use('/zhixiao', express.static(path.join(__dirname, 'zhixiao')));
app.use('/movie', express.static(path.join(__dirname, 'movie')));


//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


// 首页
app.use('/', indexRouter);
// 知晓
app.use('/zhixiao', zhixiaoRouter);
// 电影app
app.use('/movie', movieRouter);

// 1090接口
app.use('/api/movie', apiMovieRouter);
// 晨光影院
app.use('/api/movie/morning', apiMovieMorningRouter);
// haiduomi
app.use('/api/movie/haimi', apiMovieHaiMiRouter);
// 搜索所有
app.use('/api/movie/all', apiMovieSearchAllRouter);

// 电影网站列表接口
app.use('/api/movie/web_list', apiMovieWebSiteRouter);


module.exports = app;