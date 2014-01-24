Express JSON Routes
===================
Express is awesome, but whats not awesome is how it handles routes.  This is an attempt to make routes much easier to use, configure, and keep track of.  It's also designed to make REST easy!

How It Works
-------------
As simple as 1, 2, 3!

### 1.
For each `route.js` file in your routes folder add a `route.json` file.  In this JSON file, define your routes
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
No need to `require` your route at all.  Its that easy.

Enjoy!