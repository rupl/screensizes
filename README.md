# Screensizes

[Check it out on the live site!](http://screensizes.org) It displays visitors' screen sizes in real-time.

Inspired by the visualization on Brad Frost's [This Is Responsive](http://bradfrost.github.io/this-is-responsive/).

## Use this on your own site

There's a route called `/screen` which takes two params:

* `w` is the width
* `h` is the height

You can measure these on the client-side by checking `window.innerWidth` and `window.innerHeight`. Then just GET the URL and supply the two dimensions. The server handles the rest!

```
/screen?w=480&h=640
```

## Screenshot

![image](https://cloud.githubusercontent.com/assets/39191/8488716/9ec0e90e-20c9-11e5-85e3-a1cc586a9cdc.png)

Made with :revolving_hearts: by [Chris Ruppel](http://chrisruppel.com).
