/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, _ */
"use strict";

angular.module('yataApp.filters').filter('OpenTaskCountFilter', ['TodoService', function(service) {
	return function(project) {
		return service.getOpenTasks(project.tasks).length;
	};
}]);