/*jslint nomen: true */
/*jslint node: true */
/*global describe, beforeEach, it, expect, angular, inject, spyOn, jasmine, moment */
"use strict";

describe("BaseController", function() {
	
	var scope, serviceMock = {
		getProject: function() {
			return {
				id: 1,
				title: "Test",
				tasks: [{
					id: 3,
					title: "Testje",
					completed: false
				}]
			};
		}
	};
	
	beforeEach(function () {
		angular.mock.module('yata.controllers');
		angular.mock.inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			scope.$emit = jasmine.createSpy();
			spyOn(serviceMock, 'getProject').andCallThrough();
			$controller('ProjectController', {
				$scope: scope,
				TodoService: serviceMock,
				$routeParams: {
					id: 1
				}
			});
		});
	});

	it('emits active project', function() {
		expect(scope.$emit).toHaveBeenCalledWith('activeProject', serviceMock.getProject());
	});
	
	it('retrieved project', function() {
		expect(serviceMock.getProject).toHaveBeenCalledWith(1);
		expect(scope.project.id).toBe(1);
		expect(scope.title).toBe("Test");
		expect(scope.tasks.length).toBe(1);
		expect(scope.tasks[0].title).toBe("Testje");
	});
});