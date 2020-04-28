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

// GET
app.get('/', function (req, res) {
    res.render('index', {
        query: null,
        red: null,
        green: null
    });
});

// POST default
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
        }).then(function (result) {
        var x = [];
        var json_res = [];
        var pos = 0,neg = 0;
        
        result.data.statuses.forEach(element => {
            var text = element.full_text;
            x.push(text);
            var model = sentiment.analyze(text);
            // console.log("Analysis:: ", model.score);
            if (model.score >= 0) 
            { // to add the neutral statement
                pos++;
            } else {
                neg++;
            }
            k = {
                'text': text,
                'score': model.score,
                'user': element.user.name,
                'location': element.user.location
            };
            json_res.push(k); 
        });
        res.render('index', {
            query: x,
            red: neg,
            green: pos,
            res: json_res
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
});