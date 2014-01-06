/*global $, Sammy*/

var BLOG = this.BLOG || {};

(function (B) {
    "use strict";
    B.clientRoutes = function (viewModel) {
        var sammy = new Sammy(function() {
            var showPosts = function() {
                    $('#edit').hide();
                    $('#posts').show();
                },

                showEdit = function() {
                    $('#posts').hide();
                    $('#edit').show();
                };

            this.get('#:tag', function() {
                showPosts();
                $.get("/posts", { tag: this.params.tag }, viewModel.choosenPosts);
            });

            this.get('#edit/:postTitle', function() {
                showEdit();
            });

            this.get('#edit/new', function() {
                showEdit();
                console.log("edit new post");
            });

            this.get('/', function() {
                showPosts();
                this.app.runRoute('get', '/#all');
            });
        });

        sammy.run();
    };
}(BLOG));