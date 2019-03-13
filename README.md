# Twitlysis
Simple tweet analyser using Nodejs.

### Technology Used

In this: 

* NodeJS
* Express
* Twit
* EJS
* Sentiment

### Prerequisite
    * NodeJS (version above 8)
    
### Installation

1. Download Zip or Import using fork the repository and then to your desktop.
2. run  `npm install`  to install all node dependencies in your project.
3. Add the **config.js** file in the project and add following code into the file
    ```
    var T = new Twit({
    consumer_key:         '...',
    consumer_secret:      '...',
    access_token:         '...',
    access_token_secret:  '...',
    timeout_ms:           60*1000,  // optional HTTP  
   })
    ```
4. Then go to https://developer.twitter.com/en/apps and create new app and copy corresponding keys and paste in the **config.js** file.
5. run `npm start` or `node index.js` here **index.js** is the main file.
6. open https://localhost:3000 to see the project

#### TODO:
    * To fix UI components.
    * Adding name to the tweets.
    * Indivisual tweets sentiment.

**Feel free to contact for suggestions**
