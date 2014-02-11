/*jslint nomen: true */
/*jslint node: true */
/*global describe, beforeEach, it, expect, angular, inject, spyOn, jasmine, moment */
"use strict";

describe("BaseController", function() {
	
	var scope, serviceMock = {
		getInbox: function() {
			return [{
				id: 1,
				title: "Test",
				completed: false
			}];
		},
		getProjects: function() {
			return [{
				id: 2,
				title: "Test",
				tasks: [{
					id: 3,
					title: "Testje",
					completed: false
				}]
			}];
		},
		getProjectByTask: function() {
			return {
				id: 1,
				title: "Test",
				tasks: []
			};
		}
	}, modal = {
		test: "test",
		show: function() { },
		hide: function() { }
	}, modalMock = {
		fromTemplateUrl: function(tmplt, callback) {
			callback(modal);
		}
	};
	beforeEach(function () {
		angular.mock.module('yataApp.controllers');
		angular.mock.inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(serviceMock, 'getInbox').andCallThrough();
			spyOn(serviceMock, 'getProjects').andCallThrough();
			spyOn(serviceMock, 'getProjectByTask').andCallThrough();
			spyOn(modalMock, 'fromTemplateUrl').andCallThrough();
			modal.show = function() { };
			modal.hide = function() { };
			spyOn(modal, 'show');
			spyOn(modal, 'hide');
			$controller('BaseController', {
				$scope: scope,
				$ionicModal: modalMock,
				TodoService: serviceMock
			});
		});
	});

	it('Initialized modal', function() {
		expect(modalMock.fromTemplateUrl).toHaveBeenCalledWith('app/views/task.html', jasmine.any(Function),
			jasmine.any(Object));
		expect(scope.taskModal.test).toBe("test");
	});
	
	it('Initialized model', function() {
		expect(serviceMock.getInbox).toHaveBeenCalled();
		expect(serviceMock.getProjects).toHaveBeenCalled();
		expect(scope.tasks.inbox.length).toBe(1);
		expect(scope.tasks.inbox[0].title).toBe("Test");
		expect(scope.tasks.inbox[0].id).toBe(1);
		expect(scope.tasks.projects.length).toBe(1);
		expect(scope.tasks.projects[0].title).toBe("Test");
		expect(scope.tasks.projects[0].id).toBe(2);
		expect(scope.tasks.projects[0].tasks.length).toBe(1);
		expect(scope.tasks.projects[0].tasks[0].title).toBe("Testje");
		expect(scope.tasks.projects[0].tasks[0].id).toBe(3);
	});
	
	it('Shows add task modal', function() {
		scope.focus.project = {
			test: "project"
		};
		scope.addTask();
		expect(modal.show).toHaveBeenCalled();
		expect(scope.taskModel.task.project.test).toBe("project");
		expect(scope.taskModel.labels.btn).toBe("Add");
	});
	
	it('Toggles sidemenu', function() {
		scope.sideMenuController = {
			toggleLeft: jasmine.createSpy('toggleLeft')
		};
		scope.headerBtns.left[0].tap();
		expect(scope.sideMenuController.toggleLeft).toHaveBeenCalled();
	});
	
	it('Shows add task modal when clicked', function() {
		scope.addTask = jasmine.createSpy('addTask');
		scope.headerBtns.right[0].tap();
		expect(scope.addTask).toHaveBeenCalled();
	});
	
	it('Closes task modal', function() {
		scope.taskModel.labels.title = "test";
		scope.taskModel.labels.btn = "test";
		scope.taskModel.task.title = "test";
		scope.taskModel.task.due = "test";
		scope.taskModel.task.project = "test";
		scope.closeTaskModal();
		expect(modal.hide).toHaveBeenCalled();
		expect(scope.taskModel.labels.title).toBe(null);
		expect(scope.taskModel.labels.btn).toBe(null);
		expect(scope.taskModel.task.title).toBe(null);
		expect(scope.taskModel.task.due).toBe(null);
		expect(scope.taskModel.task.project).toBe(null);
	});
	
	it('Focuses task', function() {
		scope.focusTask({
			test: "task"
		});
		expect(scope.focus.task.test).toBe("task");
	});
	
	it('Unfocuses task', function() {
		scope.focus.task = {
			test: "task"
		};
		scope.unfocusTask();
		expect(scope.focus.task).toBe(null);
	});
	
	it('Shows edit task modal', function() {
		scope.editTask({
			id: 1,
			title: "Task",
			completed: false
		});
		expect(modal.show).toHaveBeenCalled();
		expect(scope.taskModel.labels.title).toBe("Edit task");
		expect(scope.taskModel.labels.btn).toBe("Edit");
		expect(scope.taskModel.task.title).toBe("Task");
		expect(serviceMock.getProjectByTask).toHaveBeenCalled();
		expect(scope.taskModel.task.project.title).toBe("Test");
	});
	
	it('Shows edit task modal without due date', function() {
		scope.editTask({
			id: 1,
			title: "Task",
			completed: false,
			due: null
		});
		expect(modal.show).toHaveBeenCalled();
		expect(scope.taskModel.labels.title).toBe("Edit task");
		expect(scope.taskModel.labels.btn).toBe("Edit");
		expect(scope.taskModel.task.title).toBe("Task");
		expect(serviceMock.getProjectByTask).toHaveBeenCalled();
		expect(scope.taskModel.task.project.title).toBe("Test");
	});
	
	it('Formats due date', function() {
		scope.editTask({
			id: 1,
			title: "Task",
			completed: false,
			due: new Date()
		});
		expect(modal.show).toHaveBeenCalled();
		expect(scope.taskModel.labels.title).toBe("Edit task");
		expect(scope.taskModel.labels.btn).toBe("Edit");
		expect(scope.taskModel.task.title).toBe("Task");
		expect(scope.taskModel.task.due).toBe(moment(new Date()).format("YYYY-MM-DD"));
		expect(serviceMock.getProjectByTask).toHaveBeenCalled();
		expect(scope.taskModel.task.project.title).toBe("Test");
	});
	
	it('Deletes task', function() {
		scope.$broadcast = jasmine.createSpy('$broadcast');
		serviceMock.deleteTask = jasmine.createSpy('deleteTask');
		scope.focus.task = { };
		scope.deleteTask({
			id: 1,
			title: "Task",
			completed: false
		});
		expect(scope.focus.task).toBe(null);
		expect(serviceMock.deleteTask).toHaveBeenCalled();
		expect(scope.$broadcast).toHaveBeenCalledWith('deleteTask', jasmine.any(Object));
	});
	
	it('Activates project', function() {
		scope.$emit('activeProject', {
			id: 1,
			title: "Active project",
			tasks: []
		});
		expect(scope.focus.project.title).toBe("Active project");
	});
	
	it('Saves edited task', function() {
		var task = {
			id: 1,
			title: "Task",
			completed: false,
			due: new Date()
		}, project = {
			id: 2,
			title: "Project",
			tasks: []
		};
		scope.focus.task = task;
		scope.taskModel.task.title = "Edited task";
		scope.taskModel.task.due = null;
		scope.taskModel.task.project = project;
		serviceMock.moveTask = jasmine.createSpy("moveTask");
		scope.saveTaskModal();
		expect(scope.focus.task.title).toBe("Edited task");
		expect(scope.focus.task.due).toBe(null);
		expect(serviceMock.moveTask).toHaveBeenCalledWith(task, project);
		expect(scope.taskModel.labels.title).toBe(null);
		expect(scope.taskModel.labels.btn).toBe(null);
		expect(scope.taskModel.task.title).toBe(null);
		expect(scope.taskModel.task.due).toBe(null);
		expect(scope.taskModel.task.project).toBe(null);
		expect(modal.hide).toHaveBeenCalled();
	});
	
	it('Saves edited task with due date', function() {
		var task = {
			id: 1,
			title: "Task",
			completed: false,
			due: new Date()
		}, project = {
			id: 2,
			title: "Project",
			tasks: []
		};
		scope.focus.task = task;
		scope.taskModel.task.title = "Edited task";
		scope.taskModel.task.due = '1970-01-01';
		scope.taskModel.task.project = project;
		serviceMock.moveTask = jasmine.createSpy("moveTask");
		scope.saveTaskModal();
		expect(scope.focus.task.title).toBe("Edited task");
		expect(scope.focus.task.due.getFullYear()).toBe(1970);
		expect(serviceMock.moveTask).toHaveBeenCalledWith(task, project);
		expect(scope.taskModel.labels.title).toBe(null);
		expect(scope.taskModel.labels.btn).toBe(null);
		expect(scope.taskModel.task.title).toBe(null);
		expect(scope.taskModel.task.due).toBe(null);
		expect(scope.taskModel.task.project).toBe(null);
		expect(modal.hide).toHaveBeenCalled();
	});
	
	it('Saves new task',function() {
		var project = {
			id: 1,
			title: "Project",
			tasks: []
		};
		scope.taskModel.task.title = "New task";
		scope.taskModel.task.project = project;
		scope.taskModel.task.due = null;
		serviceMock.addTask = jasmine.createSpy("addTask");
		scope.saveTaskModal();
		expect(serviceMock.addTask).toHaveBeenCalledWith({
			title: "New task",
			due: null
		}, project);
		expect(scope.taskModel.labels.title).toBe(null);
		expect(scope.taskModel.labels.btn).toBe(null);
		expect(scope.taskModel.task.title).toBe(null);
		expect(scope.taskModel.task.due).toBe(null);
		expect(scope.taskModel.task.project).toBe(null);
		expect(modal.hide).toHaveBeenCalled();
	});
	
	it('Saves new task with due date',function() {
		var project = {
			id: 1,
			title: "Project",
			tasks: []
		}, date = moment(new Date()).format('YYYY-MM-DD');
		scope.taskModel.task.title = "New task";
		scope.taskModel.task.project = project;
		scope.taskModel.task.due = date;
		serviceMock.addTask = jasmine.createSpy("addTask");
		scope.saveTaskModal();
		expect(serviceMock.addTask).toHaveBeenCalledWith({
			title: "New task",
			due: moment(date).toDate()
		}, project);
		expect(scope.taskModel.labels.title).toBe(null);
		expect(scope.taskModel.labels.btn).toBe(null);
		expect(scope.taskModel.task.title).toBe(null);
		expect(scope.taskModel.task.due).toBe(null);
		expect(scope.taskModel.task.project).toBe(null);
		expect(modal.hide).toHaveBeenCalled();
	});
});