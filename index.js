var express = require('express');
const bodyParser = require('body-parser');
var Twit = require('twit');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
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
        query: null,
        red: null,
        green: null
    });
});


app.post('/', function (req, res) {
    var query = req.body.query;
    var date = getDate();
    var query = {
        q: `${query} since:${date}`,
        result_type: 'popular',
        count: 20,
        lang: 'en',
        truncated: 'false',
        tweet_mode: 'extended',
    };

    T.get('search/tweets', query)
        .catch(function (err) {
            console.log('ERROR: ', err);
        }).
    then(function (result) {
        var x = [];
        result.data.statuses.forEach(element => {
            x.push(element.full_text);
        });
        var pos = 0,
            neg = 0;
        x.forEach(element => {
            var x = sentiment.analyze(element);
            //console.log("ANalysis:: ", x.score);

            if (x.score >= 0) { // to add the neutral statement
                pos++;
            } else {
                neg++;
            }
        });
        res.render('index', {
            query: x,
            red: neg,
            green: pos
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
    return yyyy - mm - dd;
}


app.listen(3000, () => {
    console.log(`App running at http://localhost:3000`)
})