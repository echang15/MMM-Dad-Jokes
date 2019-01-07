# MMM-Dad-Jokes Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


## [1.0.0] - Unreleased

First public release


## [1.1.0]

2 January 2019
Audi McAvoy

initialize "result" to display "loading dad joke" at startup
add "fadeSpeed" (defaults to 4 seconds) to config
socketNotificationReceived() function updates DOM with "fadeSpeed" setting
simplified getDom() and scheduleUpdate() functions
eliminated isEmpty() and (unused) getValue() functions
