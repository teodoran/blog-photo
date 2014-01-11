/*global $, Sammy*/

var BLOG = this.BLOG || {};

///////////////////////
// Client side routing
// Hash-based routing by using Sammy.js
// Visit https://github.com/quirkey/sammy for more information.

(function (B) {
    "use strict";
    B.clientRoutes = function (viewModel) {
        var sammy = new Sammy(function() {

            this.get('/', function () {
                this.app.runRoute('get', '/#/all');
            });

            this.get('#/new', function () {
                viewModel.clearEdit();
                viewModel.showPosts(false);
                viewModel.isAdmin(true);
            });

            this.get('#/admin/:tag', function () {
                viewModel.showPosts(true);
                viewModel.isAdmin(true);
                $.get("/posts", { tag: this.params.tag || "all" }, viewModel.choosenPosts);
            });

            this.get('#/edit/:postTitle', function() {
                viewModel.showPosts(false);
                viewModel.isAdmin(true);
            });

            this.get('#/:tag', function() {
                viewModel.showPosts(true);
                viewModel.isAdmin(false);
                $.get("/posts", { tag: this.params.tag || "all" }, viewModel.choosenPosts);
            });
        });

        sammy.run();
    };
}(BLOG));