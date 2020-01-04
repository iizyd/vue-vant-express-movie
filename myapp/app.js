var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var zhixiaoRouter = require('./routes/zhixiao');
var movieRouter = require('./routes/movie');
var apiMovieRouter = require('./routes/api_movie');
var apiMovie_88Router = require('./routes/api_movie_88');
var apiMovieWebSiteRouter = require('./routes/api_movie_website_list');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
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
// 88接口--未完成
app.use('/api/movie_88', apiMovie_88Router);
// 电影网站列表接口
app.use('/api/movie/web_list', apiMovieWebSiteRouter);


module.exports = app;