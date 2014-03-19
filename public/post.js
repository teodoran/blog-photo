var BLOG = this.BLOG || {};

(function (B) {
    "use strict";
    B.post = function() {
        var self = this;

        self.body = 'Test';
        self.tags = [];
        self.created = "";
        self.published = false;
    };
}(BLOG));