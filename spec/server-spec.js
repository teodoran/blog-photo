/*jslint node: true*/
/*global describe, it*/

var should = require("should");

describe('server', function() {
    "use strict";
    describe('server side code', function() {
        it('should not fail', function() {
            var three = 3;
            three.should.equal(3);
        });
    });
});