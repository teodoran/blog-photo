var BLOG = this.BLOG || {};

(function (B) {
    "use strict";
    B.post = function(json) {
        var self = this;

        self.body = json.body || '';
        self.tags = json.tags || [];
        self.created = json.created || '';
        self.published = json.published || false;
    };
}(BLOG));