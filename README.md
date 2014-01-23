Express JSON Routes
===================

Express is awesome, but whats not awesome is how it handles routes.  This is an attempt to make routes much easier to use, configure, and keep track of.
Disclaimer: This is a very new module, and probably has bugs.  Consider it alpha.

How It Works
-------------
It's very simple and straight forward.  For each file.js in your routes folder add a file.json.  In this JSON file, define your routes as follows

```javascript
{
    // a simple path to handler mapping
    "route/path" : "handler",
    
    // configurable mapping
    "example/path" : {
        "verb"       : "get",
        "handler"    : "functionName",
        "middleware" : "fileName:functionName"
    }
    
    // By default the verb is "get" and the handler is "index".  There is no default middleware.
}
```


