/* Magic Mirror
 * Node Helper: MMM-Dad-Jokes
 *
 * By Eric Chang
 * MIT Licensed
 */

var NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-Dad-Jokes helper started');
	},

	getJoke: async function () {
		var parent = this; // save this object

		fetch('https://icanhazdadjoke.com', {
			method: 'GET',
			headers: {
				'Accept':'application/json',
				'User-Agent': 'MMM-Dad-Jokes (https://github.com/brucetony/MMM-Dad-Jokes)'
			}
		}).then(response => {
			parent.sendSocketNotification('JOKE_RESULT', response.json())
		}).catch(err => console.error(err));
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification == 'GET_JOKE') {
			this.getJoke(payload);
		}
	}
});
