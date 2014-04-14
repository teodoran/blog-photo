/*jslint node: true, nomen: true, es5: true*/

//////////////////////////////////////////
// Serves posts from the mongodb database.
// Uses mongose.js to interact with the database.

"use strict";
var _ = require("underscore");

var PostProvider = function () {
    var self = this,
        mongoUrl = process.env.MONGOHQ_URL || "mongodb://localhost/blog-db",
        mongoose = require("mongoose"),
        postSchema = mongoose.Schema({
            body: String,
            tags: Array,
            created: {
                type: Date,
                default: Date.now
            },
            published: {
                type: Boolean,
                default: false
            }
        });

    mongoose.connect(mongoUrl);
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

    self.Post = mongoose.model('Post', postSchema);
};

PostProvider.prototype.allPosts = function (callback) {
    var self = this;

    self.Post.find().sort({created: -1}).exec(function (err, posts) {
        if (!err) {
            callback(posts);
        } else {
            callback(err);
        }
    });
};

PostProvider.prototype.allPublishedPosts = function (callback) {
    var self = this;

    self.Post.find({published: true}).sort({created: -1}).exec(function (err, posts) {
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

    newPost.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
};

PostProvider.prototype.publishPost = function (post) {
    var self = this;

    self.Post.findByIdAndUpdate(post._id, { published: true }, function (err) {
        if (err) {
            console.log(err);
        }
    });
};

PostProvider.prototype.unpublishPost = function (post) {
    var self = this;

    self.Post.findByIdAndUpdate(post._id, { published: false }, function (err) {
        if (err) {
            console.log(err);
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

PostProvider.prototype.topTags = function (callback) {
    var self = this;

    self.Post.find({ published: true }, function (err, posts) {
        if (!err) {
            var tags = _.chain(posts)
                .map(function(post) {
                    return post.tags;
                })
                .flatten()
                .countBy()
                .pairs()
                .sortBy(1).reverse()
                .first(5)
                .pluck(0)
                .value();

            callback(tags);
        } else {
            callback(err);
        }
    });
};

exports.PostProvider = PostProvider;