var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var log  = require('./libs/logger')(module);


app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('combined'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/ErrorExample', function(req, res, next){
    next(new Error('Random error!'));
});

app.get('/api', function (req, res) {
    res.send('API is running');
    log.info('Express server listening on port 1337');
});

app.get('/',function(req,res){       
     res.sendFile('index.html');
});

app.listen(1337, function(){
    console.log('Express server listening on port 1337');
});

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});
