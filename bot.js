console.log("bot is starting.");

//importing the twit Library

var Twit = require('twit');

var config = require('./config');
//OAuth

var T = new Twit(config);

tweetit();
//post
function tweetit() {
  var r = Math.floor(Math.random() * 100);
  var tweet = {
    status: '#Nodejs #npm #twit Tweet From NodeJS This is number '+r+'.'
  };
  T.post('statuses/update', tweet, tweeter);

function tweeter(err, data, response) {
    if (err) {
      console.log("SomeThing went Wrong!");
      console.log(err);
    } else {
      console.log("It Worked!!!");
    }
  }

}