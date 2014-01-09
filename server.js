/*jslint node: true, nomen: true, unparam: true, es5: true */

"use strict";
var express = require("express"),
    url = require('url'),
    _ = require("underscore"),

    crypto = require('crypto'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy,

    PostProvider = require('./post-provider').PostProvider,
    provider = new PostProvider(),
    port = process.env.PORT || 1704,
    app = express(),

    ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.send("403");
    };

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:' + port + '/auth/google/return',
    realm: 'http://localhost:' + port + '/'
}, function(identifier, profile, done) {
    done(null, identifier);
}));

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: String(crypto.randomBytes(256)) }));

    app.use(express.static(__dirname + "/public"));
    app.use(express.static(__dirname + "/images"));
    app.use(express.static(__dirname + "/bower_components"));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);
});

app.get("/", function (req, res) {
    res.sendfile(__dirname + "/public/html/index.htm");
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

app.post('/posts/delete', ensureAuthenticated, function (req, res) {
    provider.deletePost(req.body);
    res.send("200");
});

app.post('/posts/save', ensureAuthenticated, function (req, res) {
    provider.savePost(req.body);
    res.send("201");
});

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/return',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        //console.log(req.user);
        if (req.user === 'https://www.google.com/accounts/o8/id?id=AItOawkB_ny6pA-IpZyZw1gATOJ2lk61yOdNE-k') {
            res.redirect('/#/admin/all');
        } else {
            res.send("403");
        }
    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(port);
console.log("}|{ started at http://localhost:" + port + "/");