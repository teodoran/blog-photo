/*global ko, $, marked, highlightAuto*/

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