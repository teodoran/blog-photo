/*jslint nomen:true*/
/*global ko, _, $*/

var BLOG = this.BLOG || {};

(function (B) {
    "use strict";
    B.post = function(json) {
        var self = this,
            isAuthor = function (tag) {
                return _.contains(["steffenp", "magnuskiro", "teodoran"], tag);
            };

        self.id = json._id || null;
        self.body = ko.observable(json.body || '');
        self.tags = ko.observableArray(json.tags || ['all']);
        self.created = ko.observable(json.created || new Date());
        self.published = ko.observable(json.published || false);

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

        self.getTime = function() {
            return self.created().split('T')[0];
        };

        self.json = function () {
            return {
                "_id": self.id,
                "body": self.body(),
                "tags": self.tags(),
                "created": self.created(),
                "published": self.published()
            };
        };

        self.remove = function() {
            $.ajax({
                type: 'POST',
                data: JSON.stringify(self.json()),
                contentType: 'application/json',
                url: '/posts/delete'
            });
        };

        self.save = function() {
            $.ajax({
                type: 'POST',
                data: JSON.stringify(self.json()),
                contentType: 'application/json',
                url: '/posts/save'
            });
        };
    };
}(BLOG));