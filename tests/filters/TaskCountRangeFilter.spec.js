/*jslint nomen: true */
/*jslint node: true */
/*global describe, beforeEach, afterEach, it, expect, angular, inject, spyOn, moment */
"use strict";

describe('TaskCountRangeFilter', function() {
	var filter, serviceMock = {
		isTaskInRange: function() {
			return true;
		}
	};
	
	beforeEach(function () {
		angular.mock.module(function($provide) {
			$provide.value('TodoService', serviceMock);
		});
		angular.mock.module('yata.filters');
		angular.mock.inject(function($filter) {
			filter = $filter('TaskCountRangeFilter');
		});
	});
	
	it("counts tasks", function() {
		var tasks = {
			inbox: [{
				id: 1,
				title: "Task",
				completed: false
			}],
			projects: [{
				id: 2,
				title: "Project one",
				tasks: [{
					id: 3,
					title: "Task 2",
					completed: false
				}]
			}, {
				id: 4,
				title: "Project two",
				tasks: [{
					id: 4,
					title: "Task 3",
					completed: false
				}]
			}]
		}, range = {
			begin: null,
			end: moment()
		};
		
		expect(filter(tasks, range)).toBe(3);
	});
	
	it("doesn't count task in range",function() {
		serviceMock.isTaskInRange = function() {
			return false;
		};
		
		var tasks = {
			inbox: [{
				id: 1,
				title: "Task",
				completed: false
			}],
			projects: [{
				id: 2,
				title: "Project one",
				tasks: [{
					id: 3,
					title: "Task 2",
					completed: false
				}]
			}, {
				id: 4,
				title: "Project two",
				tasks: [{
					id: 4,
					title: "Task 3",
					completed: false
				}]
			}]
		}, range = {
			begin: null,
			end: moment()
		};
		
		expect(filter(tasks, range)).toBe(0);
	});
	
	it("returns 0 if no tasks are found", function() {
		serviceMock.isTaskInRange = function() {
			return true;
		};
		
		var tasks = {
			inbox: [],
			projects: [{
				id: 2,
				title: "Project one",
				tasks: []
			}, {
				id: 4,
				title: "Project two",
				tasks: []
			}]
		}, tasks2 = {
			inbox: [],
			projects: []
		}, range = {
			begin: null,
			end: moment()
		};
		
		expect(filter(tasks, range)).toBe(0);
		expect(filter(tasks2, range)).toBe(0);
	});
});