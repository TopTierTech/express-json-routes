
var app     = require(process.cwd() + '/test');
var request = require('request');
var should = require('should');
const URL   = "http://localhost:8000";

describe('index routes', function() {
    
    before(function(){
        app.start();
    });
    
    describe('index', function() {
        it('should GET without error', function(done) {
            request.get(URL, function(err, res, body){
                should.not.exist(err);
                res.statusCode.should.eql(200, 'wrong status code returned from server');
                done();
            });
        });
    });
    
    describe('test2', function() {
        it('should POST test2', function(done) {
            request.post(URL + "/test2", function(err, res, body){
                should.not.exist(err);
                res.statusCode.should.eql(200, 'wrong status code returned from server');
                done();
            });
        });
    });
    
    describe('test3', function() {
        it('should GET dog', function(done) {
            request.get(URL + "/dog", function(err, res, body){
                should.not.exist(err);
                res.statusCode.should.eql(200, 'wrong status code returned from server');
                done();
            });
        });
        
        it('should GET ThisIsAdogWithAGun', function(done) {
            request.get(URL + "/ThisIsAdog", function(err, res, body){
                should.not.exist(err);
                res.statusCode.should.eql(200, 'wrong status code returned from server');
                done();
            });
        });
    });
    
    after(function(done){
        app.stop(done);
    });
});