/*jslint nomen: true */
/*jslint node: true */
/*global describe, beforeEach, afterEach, it, expect, angular, inject, spyOn, moment */
"use strict";

describe('RangeFilter', function() {
	var filter, serviceMock = { };
	
	beforeEach(function () {
		angular.mock.module(function($provide) {
			$provide.value('TodoService', serviceMock);
		});
		angular.mock.module('yata.filters');
		angular.mock.inject(function($filter) {
			filter = $filter('RangeFilter');
		});
		
		serviceMock.isTaskInRange = function() {
			return true;
		};
	});
	
	it("filters tasks", function() {
		var tasks = [{
			id: 1,
			title: "Task",
			completed: false
		}, {
			id: 2,
			title: "Task 2",
			completed: false
		}], range = {
			begin: null,
			end: moment()
		};
		
		expect(filter(tasks, range).length).toBe(2);
		expect(filter(tasks, range)[0].title).toBe("Task");
		expect(filter(tasks, range)[1].title).toBe("Task 2");
	});
	
	it("filters tasks", function() {
		var tasks = [{
			id: 1,
			title: "Task",
			completed: false
		}, {
			id: 2,
			title: "Task 2",
			completed: false
		}], range = {
			begin: null,
			end: moment()
		};
		
		expect(filter(tasks, range).length).toBe(2);
		expect(filter(tasks, range)[0].title).toBe("Task");
		expect(filter(tasks, range)[1].title).toBe("Task 2");
	});
	
	it("filters tasks not in range", function() {
		var tasks = [{
			id: 1,
			title: "Task",
			completed: false
		}, {
			id: 2,
			title: "Task 2",
			completed: false
		}], range = {
			begin: null,
			end: moment()
		};
		serviceMock.isTaskInRange = function() {
			return false;
		};
		
		expect(filter(tasks, range).length).toBe(0);
	});
	
	it("filters completed tasks", function() {
		var tasks = [{
			id: 1,
			title: "Task",
			completed: false
		}, {
			id: 2,
			title: "Task 2",
			completed: true
		}], range = {
			begin: null,
			end: moment()
		};
		
		expect(filter(tasks, range).length).toBe(1);
		expect(filter(tasks, range)[0].title).toBe("Task");
	});
});