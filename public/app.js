/*global ko, marked*/

var BLOG = this.BLOG || {};

(function () {
    "use strict";
    var viewModel = new BLOG.blogViewModel();

    BLOG.clientRoutes(viewModel);
    ko.applyBindings(viewModel);
}());