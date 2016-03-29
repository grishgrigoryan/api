/**
 * Created by Grigor on 3/28/16.
 */
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var topicResource = require('./resource/topic');
var userResource = require('./resource/user');
var basicAuth = require('./utils/basicAuth');
var config = require('./utils/config');


mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connection ok :)")
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use( basicAuth);
app.use('/api/topic', topicResource);
app.use('/api/user', userResource);



//error handlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({status:err.status,message: err.message});
});

var port = process.env.PORT || 3113;
app.listen(port);
console.log('Magic happens on port ' + port);