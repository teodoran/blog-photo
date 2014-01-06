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
            body: String,
            tags: Array
        }),
        Post = mongoose.model('Post', postSchema),
        post1 = new Post({
            body: IPSUM_LOREM,
            tags: ["photo", "all"]
        }),
        post2 = new Post({
            body: IPSUM_LOREM,
            tags: ["photo", "all"]
        }),
        post3 = new Post({
            body: IPSUM_LOREM,
            tags: ["other", "all"]
        }),
        post4 = new Post({
            body: IPSUM_LOREM,
            tags: ["other", "all"]
        });

    post1.save();
    post2.save();
    post3.save();
    post4.save();

    Post.find(function (err, posts) {
        if (err) {
            console.log(err);
        }
        console.log(posts);
    });
});