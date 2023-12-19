/* global Module */

/*
 * MagicMirror²
 * Module: MMM-Dad-Jokes
 *
 * By Eric Chang
 * MIT Licensed.
 */

Module.register(
	"MMM-Dad-Jokes",
	{
		defaults: {
			title: "Dad Jokes",
			updateInterval: 30 * 60 * 1000, // Every 30 minutes
			fadeSpeed: 4 * 1000, // Four seconds
			filters: []
		},

		result: {joke: "Loading dad joke…"},
		start () {
			this.getJoke();
			this.scheduleUpdate();
		},

		getDom () {
			const wrapper = document.createElement("div");
			const joke = document.createElement("div");
			joke.className = "bright light medium";
			joke.style.textAlign = "center";
			joke.style.margin = "0 auto";
			joke.innerHTML = this.result.joke;

			wrapper.appendChild(joke);
			return wrapper;
		},

		getJoke () {
			this.sendSocketNotification("GET_JOKE");
		},

		scheduleUpdate () {
			setInterval(
				() => {
					this.getJoke();
				},
				this.config.updateInterval
			);
		},

		socketNotificationReceived (notification, payload) {
			if (notification === "JOKE_RESULT") {
				if (
					this.config.filters.some((term) => payload.joke.toLowerCase().indexOf(term) > -1)
				) {
					// Filter matched, skip this joke
					this.getJoke();
				} else {
					this.result = payload;
					this.updateDom(this.config.fadeSpeed);
				}
			}
		}
	}
);
