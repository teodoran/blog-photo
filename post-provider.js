/*jslint node: true*/

"use strict";
var PostProvider = function () {
    var self = this,
        mongoose = require("mongoose"),
        postSchema = mongoose.Schema({
            title: String,
            tags: Array,
            body: String
        });

    mongoose.connect("mongodb://localhost/blog-db");
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

    self.Post = mongoose.model('Post', postSchema);
};

PostProvider.prototype.allPosts = function (callback) {
    var self = this;

    self.Post.find(function (err, posts) {
        if (!err) {
            callback(posts);
        } else {
            callback(err);
        }
    });
};

exports.PostProvider = PostProvider;