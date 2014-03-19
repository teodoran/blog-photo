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
    enviroment = process.env.NODE_ENV || "local",

    returnUrlGoogle =  enviroment === "local" ? 'http://localhost:' + port + '/auth/google/return' : 'http://kodekollektivet.herokuapp.com/auth/google/return',
    realmGoogle = enviroment === "local" ? 'http://localhost:' + port + '/' : 'http://kodekollektivet.herokuapp.com/',
    trustedUsers = [
        "https://www.google.com/accounts/o8/id?id=AItOawkB_ny6pA-IpZyZw1gATOJ2lk61yOdNE-k",
        "https://www.google.com/accounts/o8/id?id=AItOawkSPNcAh4w9gqvpEG6F7W9Bx5kNEGusey4",
        "https://www.google.com/accounts/o8/id?id=AItOawmny2ue1nyD2TgVyWQNMAuCFeke86F1WjQ",
        "https://www.google.com/accounts/o8/id?id=AItOawmZZtFm0H9HjS9SABlpSnoD1waGdZwNGRE"
    ],

    app = express(),

    ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.send("403");
    };

/////////////////////////////
// Passport.js configuration
// Visit http://passportjs.org/guide/google/ for more info.

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL: returnUrlGoogle,
    realm: realmGoogle
}, function(identifier, profile, done) {
    done(null, identifier);
}));

/////////////////////////////////
// General express server config

app.configure(function() {
    app.use(express.json());
    app.use(express.urlencoded());

    app.use(express.cookieParser());
    app.use(express.session({ secret: String(crypto.randomBytes(256)) }));

    app.use(express.static(__dirname + "/public"));
    app.use(express.static(__dirname + "/images"));
    app.use(express.static(__dirname + "/bower_components"));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);
});

/////////////////
// Server routes

// Serves initial html page
app.get("/", function (req, res) {
    res.sendfile(__dirname + "/public/html/index.html");
});

// Serves JSON for specified posts. If no tag or id is specified, an error message is returned.
app.get("/posts", function (req, res) {
    var q = url.parse(req.url, true).query;

    if (q.tag) {
        provider.allPublishedPosts(function (articles) {
            res.json(_.filter(articles, function(post) { return _.contains(post.tags, q.tag); }));
        });
    } else if (q.id) {
        provider.allPublishedPosts(function (articles) {
            res.json(_.find(articles, function(post) { return post.id === parseInt(q.id, 10); }));
        });
    } else {
        res.json({errormessage: "no JSON for you!"});
    }
});

// Secure route for getting both unpublished and published posts.
app.get("/unpublished", ensureAuthenticated, function (req, res) {
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
        res.json({errormessage: "no JSON for you!"});
    }
});

// Secure routes for post deletion, publish, unpublish and save
app.post('/posts/save', ensureAuthenticated, function (req, res) {
    provider.savePost(req.body);
    res.send("201");
});

app.post('/posts/publish', ensureAuthenticated, function (req, res) {
    provider.publishPost(req.body);
    res.send("200");
});

app.post('/posts/unpublish', ensureAuthenticated, function (req, res) {
    provider.unpublishPost(req.body);
    res.send("200");
});

app.post('/posts/delete', ensureAuthenticated, function (req, res) {
    provider.deletePost(req.body);
    res.send("200");
});

// Routes required by Google OAuth
app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/return',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        if (_.contains(trustedUsers, req.user)) {
            res.redirect('/#/admin/all');
        } else {
            res.send("403 Forbidden for: " + req.user);
        }
    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// Start server on given port
app.listen(port);
console.log("}|{ started at http://localhost:" + port + "/");