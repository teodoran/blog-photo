/*jslint node: true, nomen: true, unparam: true, es5: true */

"use strict";
var express = require("express"),
    _ = require("underscore"),
    url = require('url'),
    PostProvider = require('./post-provider').PostProvider,
    app = express(),
    NODE_MODULES = __dirname + "/node_modules",
    provider = new PostProvider();

app.use(express.bodyParser());

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));

app.get("/", function (req, res) {
    res.sendfile(__dirname + "/public" + "/index.htm");
});

app.get("/posts", function (req, res) {
    var q = url.parse(req.url, true).query;

    if (q.tag) {
        provider.allPosts(function (articles) {
            res.json(_.filter(articles, function(post) { return _.contains(post.tags, q.tag); }));
        });
    } else if (q.id) {
        provider.allPosts(function (articles) {
            res.json(_.find(articles, function(post) { return post.id === parseInt(q.id, 10); }));
        });
    } else {
        res.json({message: "no JSON for you!"});
    }
});

var port = process.env.PORT || 1704;
app.listen(port);
console.log("Jon photo started on port: " + port);
console.log("Visit at http://localhost:" + port + "/");
console.log("Want your ad here? Call 2716057 now!");