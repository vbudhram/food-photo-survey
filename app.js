'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/app'));


var server = app.listen(PORT, function(){
    console.log('Server started on port : ' + PORT);
});