/*jslint node: true, nomen: true*/

"use strict";
var PostProvider = function () {
    var self = this,
        mongoose = require("mongoose"),
        postSchema = mongoose.Schema({
            body: String,
            tags: Array
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

PostProvider.prototype.savePost = function (post) {
    var self = this,
        newPost = new self.Post(post);

    newPost.save(function (err, newPost) {
        if (err) {
            console.log(err + newPost.title);
        }
    });
};

PostProvider.prototype.deletePost = function (post) {
    var self = this;

    self.Post.remove({ _id:  post._id }, function (err) {
        if (err) {
            console.log(err);
        }
    });
};

exports.PostProvider = PostProvider;

// var provider = new PostProvider();
// provider.deletePost("title");