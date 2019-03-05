var express = require('express');
const bodyParser = require('body-parser');
var Twit = require('twit');
//var fs   = require('fs');
var config = require('./config');
var T = new Twit(config);

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index', {
        query: null
    });
});


app.post('/', function (req, res) {
    var query = req.body.query;
    var date = getDate();
    var query = {
        q: `${query} since:${date}`,
        result_type: 'popular',
        count: 3,
        lang: 'en',
        truncated: 'false',
        tweet_mode: 'extended',
    };

    T.get('search/tweets', query)
        .catch(function (err) {
            console.log('ERROR: ', err);
        }).
    then(function (result) {
        s
        var x = [];
        result.data.statuses.forEach(element => {
            x.push(element.full_text);
        });
        //  x.forEach(element => {
        //     console.log(element);
        //  });
        res.render('index', {
            query: x
        });
    });
});

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    return yyyy-mm-dd;
}


app.listen(3000);