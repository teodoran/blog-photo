/*global ko, $, marked*/

ko.bindingHandlers.markdown = {
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