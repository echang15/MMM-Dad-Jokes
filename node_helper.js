/* Magic Mirror
 * Node Helper: MMM-Dad-Jokes
 *
 * By Eric Chang
 * MIT Licensed.
 */

var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
  start: function () {
    console.log('mmm-Dad-Jokes helper started...');
  },

  getJoke: function (url) {
      var self = this;

      request({ url: 'https://icanhazdadjoke.com', 
          headers:{
            'Accept':'application/json',
            'User-Agent': 'MMM-Dad-Jokes (https://github.com/echang15/repo)'
          },
          method: 'GET' }, function (error, response, body) {
          //console.log(response);
          if (!error && response.statusCode == 200) {
            var result = JSON.parse(response.body);
            //console.log(result);
            self.sendSocketNotification('JOKE_RESULT', result);
          }
      });

  },

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_JOKE') {
      this.getJoke(payload);
    }
  }

});

