/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, _ */
"use strict";

angular.module('yata.filters').filter('TaskCountRangeFilter', ['TodoService', function(service) {
	return function(tasks, range) {
		var nr = _.filter(tasks.inbox, function(task) {
			return service.isTaskInRange(task, range.begin, range.end) && !task.completed;
		}).length;
		_.each(tasks.projects, function(project) {
			nr += _.filter(project.tasks, function(task) {
				return service.isTaskInRange(task, range.begin, range.end) && !task.completed;
			}).length;
		});
		return nr;
	};
}]);
