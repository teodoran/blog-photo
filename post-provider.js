/*jslint node: true, nomen: true, es5: true*/

"use strict";
var PostProvider = function () {
    var self = this,
        mongoUrl = process.env.MONGOHQ_URL || "mongodb://localhost/blog-db",
        mongoose = require("mongoose"),
        postSchema = mongoose.Schema({
            body: String,
            tags: Array,
            created:  {
                type: Date,
                default: Date.now
            }
        });

    mongoose.connect(mongoUrl);
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

    self.Post = mongoose.model('Post', postSchema);
};

PostProvider.prototype.allPosts = function (callback) {
    var self = this;

    self.Post.find({}).sort({created: -1}).exec(function (err, posts) {
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