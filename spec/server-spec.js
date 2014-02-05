/*jslint node: true*/
/*global describe, it*/

var assert = require("assert");

describe('server', function() {
    "use strict";
    describe('server side code', function() {
        it('should not fail', function() {
            assert.equal(3, 3);
        });
    });
});