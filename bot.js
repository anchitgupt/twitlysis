console.log("bot is starting.");

//importing the twit Library

var Twit = require('twit');
var fs   = require('fs');

var config = require('./config');
//OAuth

var T = new Twit(config);

tweetit();
//post
function tweetit() {
  
  var query = {
    q: 'India since:2019-02-28',
    count: 3
  };
  
    T.get('search/tweets', query, tweeter);

function tweeter(err, data, response) {
    if (err) {
      console.log("SomeThing went Wrong!");
      console.log(err);
    } else {
      console.log("It Worked!!!");
      console.log('#################');
      //console.log(data);
      var x ='';
      data.statuses.forEach(element => {
        x = x + element.text;
        x = x + "\n####################";
      });
      console.log(x);
    }
  }
}