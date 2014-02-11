/*jslint nomen: true */
/*jslint node: true */
/*global describe, beforeEach, it, expect, angular, inject, spyOn, jasmine, moment */
"use strict";

describe("TodayController", function() {
	
	var scope = null, serviceMock = { };
	
	beforeEach(function () {
		angular.mock.module('yataApp.controllers');
		angular.mock.inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			scope.ranges = {
				today: {
					test: "test"
				}
			};
			scope.$emit = jasmine.createSpy("$emit");
			$controller('TodayController', {
				$scope: scope,
				TodoService: serviceMock
			});
		});
	});
	
	it('clears active project', function() {
		expect(scope.$emit).toHaveBeenCalledWith('activeProject', null);
	});
	
	it('sets range', function() {
		expect(scope.range.test).toBe("test");
	});
});