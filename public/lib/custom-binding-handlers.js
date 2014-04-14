/*global ko, $, marked, hljs*/

///////////////////////////////////
// A knockout binding-handler to convert markdown syntax to html code.
// Uses marked.js to transform markdown to html code on the fly.
// Highlights code sections using highlight.js.
// Reusable. Use example: <div data-bind='markdown: body'></div>
// marked.js information: https://github.com/chjj/marked
// highlight.js information: http://highlightjs.org/

ko.bindingHandlers.markdown = {
    init: function () {
        "use strict";
        marked.setOptions({
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        });
    },
    update: function(element, valueAccessor) {
        "use strict";
        var valueUnwrapped = ko.unwrap(valueAccessor());

        if (valueUnwrapped) {
            $(element).html(marked(valueUnwrapped));
        } else {
            $(element).html("");
        }
    }
};

ko.bindingHandlers.tag = {
    init: function () {},
    update: function(element, valueAccessor) {
        "use strict";
        var tag = ko.unwrap(valueAccessor());

        if (_.contains(["spohner", "magnuskiro", "_teodoran"], tag)) {
            $(element).text("@" + tag + " ");
        } else{
            $(element).text("#" + tag + " ");            
        };
    }
};