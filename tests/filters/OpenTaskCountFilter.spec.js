/*jslint nomen: true */
/*jslint node: true */
/*global describe, beforeEach, afterEach, it, expect, angular, inject, spyOn, moment */
"use strict";

describe('OpenTaskCountFilter', function() {
	var filter, serviceMock = {
		getOpenTasks: function() {
			return new Array(100);
		}
	};
	
	beforeEach(function () {
		angular.mock.module(function($provide) {
			$provide.value('TodoService', serviceMock);
		});
		angular.mock.module('yata.filters');
		angular.mock.inject(function($filter) {
			filter = $filter('OpenTaskCountFilter');
		});
	});
	
	it("counts tasks", function() {
		var project = {
			id: 1,
			title: "Project",
			tasks: [{
				id: 2,
				title: "Task",
				completed: false
			}]
		};
		
		expect(filter(project)).toBe(100);
	});
});