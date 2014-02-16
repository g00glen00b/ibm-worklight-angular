/*jslint nomen: true */
/*jslint node: true */
/*global describe, beforeEach, afterEach, it, expect, angular, inject, spyOn, moment */
"use strict";

describe("TodoService", function() {
	
	var scope;
	
	beforeEach(function () {
		angular.mock.module('yata.services');
		angular.mock.inject(function($injector) {
            scope = $injector.get('TodoService');
       });
	});

	it('adds task', function() {
		var project = {
			id: 1,
			title: "Project",
			tasks: []
		}, task = {
			id: 2,
			title: "Task",
			completed: false
		};
		scope.getProject = function() {
			return project;
		};
		scope.addTask(task, project);
		expect(project.tasks.length).toBe(1);
		expect(project.tasks[0].title).toBe("Task");
	});
	
	it('moves task', function() {
		var project = {
			id: 1,
			title: "Project",
			tasks: []
		}, task = {
			id: 2,
			title: "Task",
			completed: false
		};
		scope.getProject = function() {
			return project;
		};
		scope.moveTask(task, project);
		expect(project.tasks.length).toBe(1);
		expect(project.tasks[0].title).toBe("Task");
	});
	
	it('deletes task from tasks',function() {
		var tasks = [{
			id: 1,
			title:" Task",
			completed: false
		}, {
			id: 2,
			title: "Task 2",
			completed: false
		}], task = tasks[0];
		scope.deleteTaskInTasks(task, tasks);
		expect(tasks.length).toBe(1);
		expect(tasks[0].title).toBe("Task 2");
	});
	
	it('verifies that task is in range', function() {
		var task = {
			id: 1,
			title: "Task",
			completed: false,
			due: new Date()
		};
		expect(scope.isTaskInRange(task, moment().add(-1, 'd'), moment().add(1, 'd'))).toBe(true);
	});
	
	it('verifies that task is not in range', function() {
		var task = {
			id: 1,
			title: "Task",
			completed: false,
			due: new Date()
		};
		expect(scope.isTaskInRange(task, moment().add(-2, 'd'), moment().add(-1, 'd'))).toBe(false);
	});
	
	it('does not verify that task in range if no due date', function() {
		var task = {
			id: 1,
			title: "Task",
			completed: false
		};
		expect(scope.isTaskInRange(task, moment().add(-1, 'd'), moment().add(1, 'd'))).toBe(false);
		
		task.due = null;
		expect(scope.isTaskInRange(task, moment().add(-1, 'd'), moment().add(1, 'd'))).toBe(false);
	});
});