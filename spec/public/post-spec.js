/*jslint node: true*/
/*global describe, it, BLOG*/
// Collision between jslint and structure of shouldjs. Ignore "Expected an assignment or function call and instead saw an expression."

describe('post class', function() {
    "use strict";
    describe('BLOG.post', function() {
        it('should exist', function() {
            var p = new BLOG.post();
            p.should.be.ok;
        });

        it('should have a body string', function() {
            var p = new BLOG.post();
            p.body.should.be.type('string');
        });

        it('should have a tags array', function() {
            var p = new BLOG.post();
            p.tags.should.be.an.instanceOf(Array);
        });

        it('should have a created string', function() {
            var p = new BLOG.post();
            p.created.should.be.type('string');
        });

        it('should have a published boolean', function() {
            var p = new BLOG.post();
            p.published.should.be.type('boolean');
        });
    });
});