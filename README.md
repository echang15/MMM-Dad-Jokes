# MMM-Dad-Jokes

This is a module for the [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror/).

Random Dad Jokes... from <https://icanhazdadjoke.com/>

This was a learning exercise with node and MagicMirror² - feel free to do what you want with it.

## Screenshot example

![screenshot](screenshot.png)

## Installation

Just clone the module into your modules folder of your MagicMirror² and execute `npm install` in the module’s directory:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/brucetony/MMM-Dad-Jokes
```

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
let config = {
    modules: [
        {
            module: 'MMM-Dad-Jokes',
            position: 'bottom_left', // Or wherever you want
            config: {
                updateInterval: 30*60*1000, // every 30 minutes
                fadeSpeed: 4*1000, // four seconds
                filters: [],
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| updateInterval   | How often to grab an amazing joke! Default is 30 minutes.
| fadeSpeed        | How quickly the jokes fade in and out. Default is four seconds.
| filters          | Array of words not to include in jokes.
