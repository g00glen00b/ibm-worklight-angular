/*jslint nomen: true */
/*jslint node: true */
/*global describe, beforeEach, it, expect, angular, inject, spyOn, jasmine, moment */
"use strict";

describe("SettingsController", function() {
	
	var scope, serviceMock = {
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
		angular.mock.module('yata.controllers');
		angular.mock.inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			spyOn(serviceMock, 'getProjects').andCallThrough();
			spyOn(modalMock, 'fromTemplateUrl').andCallThrough();
			modal.show = jasmine.createSpy();
			modal.hide = jasmine.createSpy();
			$controller('SettingsController', {
				$scope: scope,
				$ionicModal: modalMock,
				TodoService: serviceMock
			});
		});
	});

	it('has the correct title', function() {
		expect(scope.title).toBe("Settings");
	});
	
	it('retrieved projects', function() {
		expect(serviceMock.getProjects).toHaveBeenCalled();
		expect(scope.projects.length).toBe(1);
		expect(scope.projects[0].title).toBe("Test");
	});
	
	it('initializes modal', function() {
		expect(modalMock.fromTemplateUrl).toHaveBeenCalledWith('app/views/project.html', jasmine.any(Function),
			jasmine.any(Object));
		expect(scope.modal.test).toBe("test");
	});
	
	it('adds a project', function() {
		scope.newProject.name = "Project name";
		serviceMock.addProject = jasmine.createSpy("addProject");
		scope.addProject();
		expect(serviceMock.addProject).toHaveBeenCalledWith("Project name");
		expect(scope.newProject.name).toBe(null);
	});
	
	it('shows edit project modal', function() {
		var project = {
			title: "test"
		};
		expect(scope.projectBtns.length).toBe(2);
		scope.projectBtns[0].onTap(project);
		expect(scope.model.project).toBe(project);
		expect(scope.model.projectName).toBe("test");
		expect(modal.show).toHaveBeenCalled();
	});
	
	it('Closes edit project modal', function() {
		scope.model.project = {
			title: "test"
		};
		scope.model.projectName = "test";
		scope.closeModal();
		expect(modal.hide).toHaveBeenCalled();
		expect(scope.model.project).toBe(null);
		expect(scope.model.projectName).toBe(null);
	});
	
	it('Saves edit project modal', function() {
		var project = {
			title: "Test 1"
		};
		scope.model.project = project;
		scope.model.projectName = "Test 2";
		scope.saveModal();
		expect(project.title).toBe("Test 2");
		expect(scope.model.project).toBe(null);
		expect(scope.model.projectName).toBe(null);
		expect(modal.hide).toHaveBeenCalled();
	});
	
	it('Deletes project', function() {
		serviceMock.deleteProject = jasmine.createSpy("deleteProject");
		var project = {
			id: 1,
			title: "Test",
			tasks: []
		};
		scope.projectBtns[1].onTap(project);
		expect(serviceMock.deleteProject).toHaveBeenCalledWith(project);
	});
});