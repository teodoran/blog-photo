/*jslint nomen:true*/
/*global ko*/

var BLOG = this.BLOG || {};

(function (B) {
    "use strict";
    B.post = function(json) {
        var self = this;

        self.id = json._id || '';
        self.body = ko.observable(json.body || '');
        self.tags = ko.observableArray(json.tags || []);
        self.created = ko.observable(json.created || '');
        self.published = ko.observable(json.published || false);

        self.getTime = function() {
            return self.created().split('T')[0];
        };
    };
}(BLOG));