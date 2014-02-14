/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, _ */
"use strict";

angular.module('yata.filters').filter('RangeFilter', ['TodoService', function(service) {
	return function(tasks, range) {
		return _.filter(tasks, function(task) {
			return service.isTaskInRange(task, range.begin, range.end) && !task.completed;
		});
	};
}]);