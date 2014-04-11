/*jslint nomen:true*/
/*global ko*/

var BLOG = this.BLOG || {};

(function (B) {
    "use strict";
    B.post = function(json) {
        var self = this,
            isAuthor = function (tag) {
                return _.contains(["steffenp", "magnuskiro", "teodoran"], tag);
            };

        self.id = json._id || '';
        self.body = ko.observable(json.body || '');
        self.tags = ko.observableArray(json.tags || []);
        self.created = ko.observable(json.created || '');
        self.published = ko.observable(json.published || false);

        self.getTime = function() {
            return self.created().split('T')[0];
        };

        self.editTagsList = ko.computed({
            read: function () {
                return _.reduce(self.tags(), function(memo, tag) {
                    if (isAuthor(tag)) {
                        return memo + " @" + tag;
                    }
                    return memo + " #" + tag;
                }, "").trim();
            },
            write: function (value) {
                var tagsList = _.map(value.split(/[#,@]/), function (tagString) {
                    return tagString.trim();
                });
                self.tags(_.reject(tagsList, function (tag) {
                    return tag === "";
                }));
            }
        });
    };
}(BLOG));