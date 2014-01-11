/*global ko, marked, document*/

var BLOG = this.BLOG || {};

/////////////////////////////////////////////////////////////////
// app.js is resposible for bootstrapping the client application

(function () {
    "use strict";

    // Create a new view model
    var viewModel = new BLOG.blogViewModel();

    // And inject it to the routing model, and apply knockout bindings
    BLOG.clientRoutes(viewModel);
    ko.applyBindings(viewModel);
}());