/*jslint nomen: true*/
/*global ko, $, location, _*/

var BLOG = this.BLOG || {};

//////////////////////
// The view-model for the single page app.
// Uses knockout.js for binding javascript variable values to the html view.
// Visit http://knockoutjs.com/documentation/introduction.html for more information.

(function (B) {
    "use strict";
    B.blogViewModel = function() {
        var self = this,
            isAuthor = function (tag) {
                return _.contains(["steffenp", "magnuskiro", "teodoran"], tag);
            };

        // contains posts in current view
        self.choosenPosts = ko.observable();

        // Variable to control if admin options are shown
        self.isAdmin = ko.observable(false);
        // Variable to control if view is showing posts stream or edit form
        self.showPosts = ko.observable(true);

        // Variables to bind to the new/edit form
        self.currentPost = ko.observable(new BLOG.post(''));

        self.editBody = ko.observable("");
        self.editTags = ko.observable(["all"]);
        self.editCreated = null;
        self.editId = null;

        self.editTagsList = ko.computed({
            read: function () {
                return _.reduce(self.editTags(), function(memo, tag) {
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
                self.editTags(_.reject(tagsList, function (tag) {
                    return tag === "";
                }));
            }
        });

        self.goToTag = function(tag) {
            if (self.isAdmin()) {
                location.hash = "/admin/" + tag;
            } else {
                location.hash = "/" + tag;
            }
        };

        // Helper function to clear the new/edit variables
        self.clearEdit = function () {
            self.currentPost(new BLOG.post(''));
        };

        self.newPost = function() {
            location.hash = "/edit/new";
        };

        self.editPost = function (post) {
            self.currentPost(post);
            location.hash = '/edit/' + post.id;
        };

        self.savePost = function () {
            var newPost = {
                body: self.editBody(),
                tags: self.editTags()
            };

            // If a save is done on a edited post. Delete old post and save new edit.
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
            self.goToTag("all");
        };

        self.publishPost = function (post) {
            self.choosenPosts(_.map(self.choosenPosts(), function (oldPost) {
                if (oldPost._id !== post._id) {
                    oldPost.published = true;
                }
                return oldPost;
            }));

            $.ajax({
                type: 'POST',
                data: JSON.stringify(post),
                contentType: 'application/json',
                url: '/posts/publish'
            });
        };

        self.unpublishPost = function (post) {
            self.choosenPosts(_.map(self.choosenPosts(), function (oldPost) {
                if (oldPost._id !== post._id) {
                    oldPost.published = false;
                }
                return oldPost;
            }));

            $.ajax({
                type: 'POST',
                data: JSON.stringify(post),
                contentType: 'application/json',
                url: '/posts/unpublish'
            });
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
    };
}(BLOG));