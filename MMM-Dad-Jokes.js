/* global Module */

/* Magic Mirror
 * Module: MMM-Dad-Jokes
 *
 * By Eric Chang
 * MIT Licensed.
 */

"use strict";

Module.register("MMM-Dad-Jokes", {

	result: {joke: "loading dad joke..."},

	defaults: {
		title: "Dad Jokes",
		updateInterval: 60*1000, // every 60 seconds
		fadeSpeed: 4*1000, // four seconds
		filters: [],
	},

	start: function() {
		this.getJoke();
		this.scheduleUpdate();
	},

	getDom: function() {
		var wrapper = document.createElement("div");

		var joke = document.createElement("div");
		joke.className = "bright light medium";
		joke.style.textAlign = "center";
		joke.style.margin = "0 auto";
		joke.innerHTML = this.result["joke"];

		wrapper.appendChild(joke);
		return wrapper;
	},

	getJoke: function () {
		this.sendSocketNotification("GET_JOKE");
	},

	scheduleUpdate: function() {
		setInterval(() => {
			this.getJoke();
		}, this.config.updateInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification == "JOKE_RESULT") {
			if( this.config.filters.some( term => payload.joke.toLowerCase().indexOf(term) > -1 ) ) {
				// Filter matched, skip this joke
				this.getJoke();
			}
			else {
				this.result = payload;
				this.updateDom(this.config.fadeSpeed);
			}
		}
	},
});
