'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use('/', express.static(__dirname + '/app'));

// parse application/json
app.use(bodyParser.json());

app.get('/results', function(req, res) {
    fs.readFile('./results/results.json', {encoding:'utf8'},function(err, allResults) {
        if (err) {
            console.log(err);
            res.send(400, err);
        }
        res.json(allResults);
    });
});

app.get('/load', function(req, res){
    fs.readFile('/data/images.json', function(err, data){
        if(err){
            res.send(400, err);
        }else{
            res.json(data);
        }
    });
});

// Save user results
app.post('/save', function(req, res) {
    if (!req.body.user) {
        req.body.user = {
            name: (new Date()).getTime()
        }
    }
    console.log("Saving user : " + JSON.stringify(req.body.user));
    console.log("Results : " + JSON.stringify(req.body.user));

    // Append result data
    var allResults = require('./results/results.json');
    console.log("Current Results : " + JSON.stringify(allResults));
    allResults.push(req.body);

    fs.writeFile("./results/results.json", JSON.stringify(allResults), function(err) {
        if (err) {
            console.log(err);
            res.send(400, err);
        }
        else {
            console.log("The file was saved!");
            res.send(200);
        }
    });
})

var server = app.listen(PORT, function() {
    console.log('Server started on port : ' + PORT);
});