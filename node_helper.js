/* Magic Mirror
 * Node Helper: MMM-Dad-Jokes
 *
 * By Eric Chang
 * MIT Licensed
 */

var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-Dad-Jokes helper started');
	},

	getJoke: function (url) {
		var parent = this; // save this object
		request({ url: 'https://icanhazdadjoke.com',
			headers:{
				'Accept':'application/json',
				'User-Agent': 'MMM-Dad-Jokes (https://github.com/echang15/MMM-Dad-Jokes)'
			},
			method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var result = JSON.parse(response.body);
				parent.sendSocketNotification('JOKE_RESULT', result);
			}
		});
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification == 'GET_JOKE') {
			this.getJoke(payload);
		}
	}
});
