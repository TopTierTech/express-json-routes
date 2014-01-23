
var app = require(process.cwd() + '/test');
var Browser = require('zombie');
var assert = require('assert');

describe('index routes', function() {
    
    before(function(){
        app.start();
        this.browser = new Browser({ site: 'http://localhost:8000' });
    });
    
    
    describe('index', function() {
        
        before(function(done) {
            this.browser.visit('/', done);
        });
        
        it('should load', function() {
            assert.ok(this.browser.success);
            assert.equal(this.browser.text('h1'), 'Test 1');
        });
    });
    
    describe('other index', function() {
        
        before(function(done) {
            this.browser.visit('/other', done);
        });
        
        it('should load', function() {
            assert.ok(this.browser.success);
            assert.equal(this.browser.text('h1'), 'Other 1');
        });
    });
    
    describe('index', function() {
        
        before(function(done) {
            this.browser.visit('/test2', done);
        });
        
        it('should load', function() {
            assert.ok(this.browser.success);
            assert.equal(this.browser.text('h1'), 'Test 2');
        });
    });
    
    after(function(done){
        app.stop(done);
    });
});