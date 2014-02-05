/*jslint node: true*/
/*global describe, it*/

var assert = require("assert");

describe('public', function() {
    "use strict";
    describe('client side code', function() {
        it('should not fail', function() {
            assert.equal(3, 3);
        });
    });
});