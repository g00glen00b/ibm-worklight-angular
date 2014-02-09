/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, _ */
"use strict";

angular.module('yataApp.filters', []).filter('OpenTaskCountFilter', ['TodoService', function(service) {
	return function(project) {
		return service.getOpenTasks(project.tasks).length;
	};
}])

.filter('TaskCountFilter', ['TodoService', function(service) {
	return function(tasks) {
		return service.getOpenTasks(tasks).length;
	};
}])

.filter('TaskCountRangeFilter', ['TodoService', function(service) {
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
}])

.filter('RangeFilter', ['TodoService', function(service) {
	return function(tasks, range) {
		return _.filter(tasks, function(task) {
			return service.isTaskInRange(task, range.begin, range.end) && !task.completed;
		});
	};
}]);
