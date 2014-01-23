/**
 * Includes
 */
var _      = require('underscore');
var path   = require('path');

/**
 * Parse JSON into expressjs routes
 */
module.exports = function(app, options){
    var routes = require(path.join(options.basePath, options.routeName + '.js'));
    var json   = require(path.join(options.basePath, options.routeName + '.json'));
    
    for(uri in json) {
        var description = {
            "verb"          : "get",
            "middleware"    : null,
            "handler"       : "index"
        };
        
        // if only handler is specified modify object
        var routeDescription = json[uri];
        if (_.isString(routeDescription)) {
            routeDescription = {
                "handler" : routeDescription
            }
        }
        
        // make sure all required options are there or defaults
        _.extend(description, routeDescription);
        
        var handler     = routes[description.handler];
        var verb        = description.verb;
        var middleware  = getMiddleware(description.middleware);
        
        if (middleware)
            app[verb](uri, middleware, handler);
        else
            app[verb](uri, handler);
    }
    
    /**
     * Parse middleware string "file:function"
     * - load file
     * - return function
     */
    function getMiddleware(input){
        if (_.isString(input)) {
            return parseMiddleware(input)
        } else if(_.isArray(input)) {
            var items = new Array();
            
            input.forEach(function(item){
                items.push(parseMiddleware(item));
            });
            
            return items;
        }
        
        return null;
    }
    
    function parseMiddleware(input){
        var parts = input.split(':');
        
        // sanity check
        if (parts.length != 2) throw new Error("malformed middleware descriptor");
        
        var middlewareFile  = path.join(options.basePath, parts[0] + '.js');
        var middleware      = require(middlewareFile);
 
        return middleware[parts[1]];   
    }
};
