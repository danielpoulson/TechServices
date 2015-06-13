(function (module) {
    'use strict';

    var setupDom = function (element) {
        var input = element.querySelector("input, textarea, select");
        var type = input.getAttribute("type");
        var name = input.getAttribute("name");
        if (type !== "checkbox" && type !== "radio") {
            input.classList.add("form-control");
        }

        var label = element.querySelector("label");
        label.classList.add("control-label");
        label.classList.add("col-sm-2");


        element.classList.add("form-group");

        return name;
    };

    var addMessages = function (form, element, name, $compile, scope) {
        var messages;

        messages = "<div class='help-block' ng-if='" + form.$name + ".$invalid && vm.submitted' " + "ng-messages='" + form.$name + "." + name + ".$error' " +
            " ng-messages-include='/partials/common/messages'><div>";

        element.append($compile(messages)(scope));

    };


    var link = function ($compile) {

        return function (scope, element, attributes, form) {
            var name = setupDom(element[0]);
            addMessages(form, element, name, $compile, scope);
        };
    };


    var forminput = function ($compile) {

        return {
            restrict: "A",
            require: "^form",
            link: link($compile)
        };

    };

    module.directive('forminput', forminput);

}(angular.module('app')));
//This is the style of directive is taken from Scott Allen "AngularJS Playbook"