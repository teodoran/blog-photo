/*jslint node: true*/
/*global describe, it, BLOG*/
// Collision between jslint and structure of shouldjs. Ignore "Expected an assignment or function call and instead saw an expression."

describe('post class', function() {
    "use strict";
    describe('BLOG.post', function() {

        var json, p;
        
        beforeEach(function(){
            json = {
                    "__v": 0,
                    "_id": "5303842a83c67e920bdc533d",
                    "body": "bodytext, hipp",
                    "published": true,
                    "created": "2014-02-18T16:02:50.410Z",
                    "tags": ["all", "markdown", "lorum"]
                };
            p = new BLOG.post(json);
        });

        it('should exist', function() {
            p.should.be.ok;
        });

        it('should have a body string', function() {
            p.body.should.be.type('string');
        });

        it('should have a tags array', function() {
            p.tags.should.be.an.instanceOf(Array);
        });

        it('should have a created string', function() {
            p.created.should.be.type('string');
        });

        it('should have a published boolean', function() {
            p.published.should.be.type('boolean');
        });

        it('should initalize post.body from json', function(){  
            p.body.should.equal(json.body);
        });

        it('should initalize post.published from json', function(){  
            p.published.should.equal(json.published);
        });

        it('should initalize post.tags from json ', function(){
            p.tags.should.equal(json.tags);
        });

        it('should initalize post.created from json ', function(){
            p.created.should.equal(json.created);
        });

    });
});