/*jslint nomen: true */
/*jslint node: true */
/*global describe, beforeEach, it, expect, angular, inject, spyOn, jasmine, moment */
"use strict";

describe("InboxController", function() {
	
	var scope = null, serviceMock = {
		getInbox: function() {
			return [{
				id: 1,
				title: "Task",
				completed: false
			}];
		}
	};
	
	beforeEach(function () {
		angular.mock.module('yata.controllers');
		angular.mock.inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			scope.$emit = jasmine.createSpy("$emit");
			spyOn(serviceMock, "getInbox").andCallThrough();
			$controller('InboxController', {
				$scope: scope,
				TodoService: serviceMock
			});
		});
	});
	
	it('clears active project', function() {
		expect(scope.$emit).toHaveBeenCalledWith('activeProject', null);
	});
	
	it('Sets tasks', function() {
		expect(serviceMock.getInbox).toHaveBeenCalled();
		expect(scope.tasks.length).toBe(1);
		expect(scope.tasks[0].title).toBe("Task");
	});
});