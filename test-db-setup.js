/*jslint node: true*/

"use strict";

var mongoose = require("mongoose"),
    dbLocation = "mongodb://localhost/blog-db",
    IPSUM_LOREM = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

mongoose.connect(dbLocation);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
    console.log("yay!");

    var postSchema = mongoose.Schema({
            title: String,
            tags: Array,
            body: String
        }),
        Post = mongoose.model('Post', postSchema),
        post1 = new Post({
            title: "More photos from the Oslo bowl",
            tags: ["photo", "all"],
            body: IPSUM_LOREM
        }),
        post2 = new Post({
            title: "Went to Nordmarka",
            tags: ["photo", "all"],
            body: IPSUM_LOREM
        }),
        post3 = new Post({
            title: "Nikon vs. Cannon, an easy choice?",
            tags: ["other", "all"],
            body: IPSUM_LOREM
        }),
        post4 = new Post({
            title: "Still looking for a god lens...",
            tags: ["other", "all"],
            body: IPSUM_LOREM
        });

    post1.save(function (err, post) {
        if (err) {
            console.log(err);
        }
        console.log(post.title);
    });

    post2.save(function (err, post) {
        if (err) {
            console.log(err);
        }
        console.log(post.title);
    });

    post3.save(function (err, post) {
        if (err) {
            console.log(err);
        }
        console.log(post.title);
    });

    post4.save(function (err, post) {
        if (err) {
            console.log(err);
        }
        console.log(post.title);
    });

    Post.find(function (err, posts) {
        if (err) {
            console.log(err);
        }
        console.log(posts);
    });
});