/*global $, Sammy*/

var BLOG = this.BLOG || {};

(function (B) {
    "use strict";
    B.clientRoutes = function (viewModel) {
        var sammy = new Sammy(function() {
            this.get('#:tag', function() {
                viewModel.showPosts();
                $.get("/posts", { tag: this.params.tag }, viewModel.choosenPosts);
            });

            this.get('#edit/:postTitle', function() {
                viewModel.showEdit();
            });

            this.get('#edit/new', function() {
                viewModel.showEdit();
                console.log("edit new post");
            });

            this.get('/', function() {
                viewModel.showPosts();
                this.app.runRoute('get', '#all');
            });
        });

        sammy.run();
    };
}(BLOG));