Express JSON Routes
===================
Express is awesome, but whats not awesome is how it handles routes.  This is an attempt to make routes much easier to use, configure, and keep track of.  It's also designed to make REST easy!

How It Works
-------------
As simple as 1, 2, 3!

### 1.
For each `route.js` file in your routes folder add a `route.json` file.  In this JSON file, define your routes.
```javascript
{
    // a simple path to handler mapping
    "VERB /route/path" : "handler",
    "GET /simple/example" : "simpleHandler",
    
    // configurable mapping
    "VERB /example/path" : {
        "handler"    : "functionName",
        "middleware" : "fileName:functionName",
        "regex"      : true | false
    }
}
```
-   The `VERB` can be any verb that express supports (`GET`, `POST`, `PUT`, `DELETE`)
    -   The verb _MUST_ be uppsercase
    -   The verb _MUST_ be followed by a space and a forward slash such as `"GET /"`.  This forward slash begins the url pattern or the regex pattern that follows.
-   The route handler just has to be an __exported__ function defined in the relative `route.js` file.
-   Any middleware can be linked in by providing a `"fileName"` a `":"` and then a `"functionName"` exported in that file.  Keep in mind that the file path is relative to the routes folder.


### 2.
In your app.js file just include the module like
```javascript

// Includes
var express     = require('express');
var routes      = require('express-json-routes');

...

var app = express();
// setup stuff
app.set(...);
app.use(...);
```


### 3!
```javascript
// Thats It!
routes(app);
```
No need to `require` your routes at all.  Its that easy.

There are a few advanced topics below. Keep reading if you haven't seen exactly what you need yet!  And if there is a feature you need that you don't see, feel free to let me know or issue a pull request!

Enjoy!


More About Middleware
---------------------
If you want to include multiple middleware functions, we've got you covered! When you define your middleware instead of just defining `"fileName:functionName"` you can define an array.

```javascript
{
    "VERB /example/path" : {
        "handler"    : "functionName",
        "middleware" : [
            "fileName:functionName",
            "fileName:functionName2",
            "fileName2:functionName"
        ]
    }
}
```

Other Options & Passing Variables
-----------------
So you want to pass variables into your routes file?  You'll love this!

When you initialize the module (step 3 above), you can specify a few options.  All are listed below with the default values.  An explaination follows.

```javascript

var routeOptions = {
    routes  : "./routes",
    setup   : "init",
    vars    : null
}

routes(app, routeOptions);

```
-   **routes**  : the path to your routes folder.
-   **setup**   : the function you want called in your routes when they get loaded
-   **vars**    : an object you want passed into your setup function

For example, lets say you have a database connection you want to pass to all of your routes.
```javascript
var r       = require("rethinkdb");
var express = require('express');
var routes  = require("express-json-routes");

var app = express();

...

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

var routeOptions = {
    vars : {
        dbConnection : connection
    }
}

routes(app, routeOptions);

```

Now in your routes file just export a function `init` and recieve the connection

```javascript
var connection
exports.init = function(vars) {
    connection = vars.dbConnection;
}
```

And your all set!