/*jslint node: true, nomen: true, unparam: true, es5: true */
"use strict";
var express = require("express"),
    _ = require("underscore"),
    url = require('url'),
    app = express(),
    NODE_MODULES = __dirname + "/node_modules",
    IPSUM_LOREM = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    TEST_JSON = {
        "articles": [
            {
                "id": 0,
                "title": "More phortos from the Oslo bowl",
                "tags": ["photo", "all"],
                "body": IPSUM_LOREM
            },
            {
                "id": 1,
                "title": "Went to Nordmarka",
                "tags": ["photo", "all"],
                "body": IPSUM_LOREM
            },
            {
                "id": 2,
                "title": "Nikon vs. Cannon, an easy choice?",
                "tags": ["other", "all"],
                "body": IPSUM_LOREM
            },
            {
                "id": 3,
                "title": "Still looking for a god lens...",
                "tags": ["other", "all"],
                "body": IPSUM_LOREM
            },
        ]
    };

app.use(express.bodyParser());

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));

app.get("/", function (req, res) {
    res.sendfile(__dirname + "/public" + "/index.htm");
});

app.get("/posts", function (req, res) {
    var q = url.parse(req.url, true).query;

    if (q.tag) {
        res.json(_.filter(TEST_JSON.articles, function(post) { return _.contains(post.tags, q.tag); }));
    } else if (q.id) {
        res.json(_.find(TEST_JSON.articles, function(post) { return post.id === parseInt(q.id, 10); }));
    } else {
        res.json({message: "no JSON for you!"});
    }
});

app.post('/endpoint', function (req, res) {
    TEST_JSON = req.body;
    res.send("OK");
});

var port = process.env.PORT || 1704;
app.listen(port);
console.log("Jon photo started on port: " + port);