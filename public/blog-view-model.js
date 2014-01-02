/*jslint nomen: true*/
/*global ko, $, location*/

var BLOG = this.BLOG || {};

(function (B) {
    "use strict";
    B.blogViewModel = function() {
        var self = this;

        self.showPosts = function() {
            $('#edit').hide();
            $('#posts').show();
        };

        self.showEdit = function() {
            $('#posts').hide();
            $('#edit').show();
        };

        self.categories = ["all", "photo", "other"];
        self.choosenPosts = ko.observable();

        self.editTitle = ko.observable();
        self.editBody = ko.observable();

        self.goToTag = function(tag) {
            location.hash = tag;
        };

        self.editPost = function (post) {
            self.editTitle(post.title);
            self.editBody(post.body);
            location.hash = 'edit/' + post.id;
        };
    };
}(BLOG));