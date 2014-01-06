/*jslint nomen: true*/
/*global ko, $, location, _*/

var BLOG = this.BLOG || {};

(function (B) {
    "use strict";
    B.blogViewModel = function() {
        var self = this;

        self.categories = ["all", "photo", "other"];
        self.choosenPosts = ko.observable();

        self.editBody = ko.observable("");
        self.editTags = ko.observable(["all"]);
        self.editId = null;

        self.clearEdit = function () {
            self.editBody("");
            self.editTags(["all"]);
            self.editId = null;
        };

        self.goToTag = function(tag) {
            location.hash = tag;
        };

        self.newPost = function() {
            location.hash = "edit/new";
        };

        self.editPost = function (post) {
            self.editBody(post.body);
            self.editTags(post.tags);
            self.editId = post._id;
            location.hash = 'edit/' + post._id;
        };

        self.deletePost = function (post) {
            self.choosenPosts(_.filter(self.choosenPosts(), function (oldPost) {
                return oldPost._id !== post._id;
            }));

            $.ajax({
                type: 'POST',
                data: JSON.stringify(post),
                contentType: 'application/json',
                url: 'http://localhost:1704/posts/delete'
            });
        };

        self.savePost = function () {
            var newPost = {
                body: self.editBody(),
                tags: self.editTags()
            };

            if (self.editId) {
                newPost._id = self.editId;
                self.deletePost(newPost);
            }

            $.ajax({
                type: 'POST',
                data: JSON.stringify(newPost),
                contentType: 'application/json',
                url: 'http://localhost:1704/posts/save'
            });

            self.clearEdit();
            location.hash = "all";
        };
    };
}(BLOG));