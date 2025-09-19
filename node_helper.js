/*
 * MagicMirror²
 * Node Helper: MMM-Dad-Jokes
 *
 * By Eric Chang
 * MIT Licensed
 */

const Log = require("logger");
const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	start () {
		Log.log("MMM-Dad-Jokes helper started");
	},

	async getJoke () {
		const parent = this; // Save this object

		try {
			const response = await fetch(
				"https://icanhazdadjoke.com",
				{
					method: "GET",
					headers: {
						Accept: "application/json",
						"User-Agent":
				"MMM-Dad-Jokes (https://github.com/brucetony/MMM-Dad-Jokes)"
					}
				}
			);
			const data = await response.json();
			parent.sendSocketNotification(
				"JOKE_RESULT",
				data
			);
		} catch (err) {
			Log.error(err);
		}
	},

	socketNotificationReceived (notification, payload) {
		if (notification === "GET_JOKE") {
			this.getJoke(payload);
		}
	}
});
