/* global Module */

/* Magic Mirror
 * Module: MMM-Dad-Jokes
 *
 * By Eric Chang
 * MIT Licensed.
 */

'use strict';

Module.register("MMM-Dad-Jokes", {

  result: {},
  defaults: {
    prettyName: true,
    stripName: true,
    title: 'Dad MMM-Dad-Jokes',
    url: '',
    updateInterval: 600000,
    values: []
  },

  start: function() {
    this.getJoke();
    this.scheduleUpdate();
  },

  isEmpty: function(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  },

  getDom: function() {
    var wrapper = document.createElement("ticker");
    wrapper.className = 'dimmed small';

    var data = this.result;
    var statElement =  document.createElement("span");
    var title = this.config.title;
    statElement.innerHTML = title;
    wrapper.appendChild(statElement);

    if (data && !this.isEmpty(data)) {
      if (data.hasOwnProperty('joke'))
        {
          statElement.innerHTML = data['joke'];
          wrapper.appendChild(statElement);
        }
      
    } else {
      var error = document.createElement("span");
      error.innerHTML = "Error fetching stats.";
      wrapper.appendChild(error);
    }

    return wrapper;
  },

  getValue: function(data, value) {
    if (data && value) {
      var split = value.split(".");
      var current = data;
      while (split.length > 0) {
        current = current[split.shift()];
      }

      return current;
    }

    return null;
  },

  scheduleUpdate: function(delay) {
    var nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }

    var self = this;
    setInterval(function() {
      self.getStats();
    }, nextLoad);
  },

  getJoke: function () {
    this.sendSocketNotification('GET_JOKE', this.config.url);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "JOKE_RESULT") {
      this.result = payload;
      var fade = 500;
      console.log("fade: " + fade);
      this.updateDom(fade);
    }
  },

});

