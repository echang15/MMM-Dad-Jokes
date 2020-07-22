# MMM-Dad-Jokes

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Random Dad Jokes... from https://icanhazdadjoke.com/

This was a learning exercise with node and Magic Mirror - feel free to do what you want with it.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Dad-Jokes',
            position: 'bottom_left', // Or wherever you want
            config: {
                updateInterval: 60000,
                fadeSpeed: 4000
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| updateInterval   | *Required* How often to grab an amazing joke! Defaults to one minute
| fadeSpeed        | How quickly the jokes fade in and out. Defaults to four seconds
| filters          | Array of words not to include in jokes
