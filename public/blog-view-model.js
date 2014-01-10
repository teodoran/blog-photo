/*jslint nomen: true*/
/*global ko, $, location, _*/

var BLOG = this.BLOG || {};

(function (B) {
    "use strict";
    B.blogViewModel = function() {
        var self = this;

        self.choosenPosts = ko.observable();

        self.editBody = ko.observable("");
        self.editTags = ko.observable(["all"]);

        self.isAdmin = ko.observable(false);
        self.showPosts = ko.observable(true);

        self.editCreated = null;
        self.editId = null;

        self.editTagsList = ko.computed({
            read: function () {
                return "#" + self.editTags().join(" #");
            },
            write: function (value) {
                var tagsList = _.map(value.split("#"), function (tagString) {
                    return tagString.trim();
                });
                self.editTags(_.reject(tagsList, function (tag) {
                    return tag === "";
                }));
            }
            // owner: self // Needed?
        });

        self.goToTag = function(tag) {
            if (self.isAdmin()) {
                location.hash = "/admin/" + tag;
            } else {
                location.hash = "/" + tag;
            }
        };

        self.clearEdit = function () {
            self.editBody("");
            self.editTags(["all"]);
            self.editId = null;
            self.editCreated = null;
        };

        self.newPost = function() {
            location.hash = "/edit/new";
        };

        self.editPost = function (post) {
            self.editBody(post.body);
            self.editTags(post.tags);
            self.editId = post._id;
            self.editCreated = post.created;
            location.hash = '/edit/' + post._id;
        };

        self.deletePost = function (post) {
            self.choosenPosts(_.filter(self.choosenPosts(), function (oldPost) {
                return oldPost._id !== post._id;
            }));

            $.ajax({
                type: 'POST',
                data: JSON.stringify(post),
                contentType: 'application/json',
                url: '/posts/delete'
            });
        };

        self.savePost = function () {
            var newPost = {
                body: self.editBody(),
                tags: self.editTags()
            };

            if (self.editId) {
                newPost._id = self.editId;
                newPost.created = self.editCreated;
                self.deletePost(newPost);
            }

            $.ajax({
                type: 'POST',
                data: JSON.stringify(newPost),
                contentType: 'application/json',
                url: '/posts/save'
            });

            self.clearEdit();
            // self.choosenPosts(self.choosenPosts().push(newPost));
            self.goToTag("all");
        };
    };
}(BLOG));