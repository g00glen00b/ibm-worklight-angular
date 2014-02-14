/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, _ */
"use strict";

angular.module('yata.filters').filter('TaskCountFilter', ['TodoService', function(service) {
	return function(tasks) {
		return service.getOpenTasks(tasks).length;
	};
}]);