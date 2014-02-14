/*jslint nomen: true */
/*jslint node: true */
/*global describe, beforeEach, it, expect, angular, inject, spyOn, jasmine, moment */
"use strict";

describe("SoonController", function() {
	
	var scope = null, serviceMock = { };
	
	beforeEach(function () {
		angular.mock.module('yata.controllers');
		angular.mock.inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			scope.ranges = {
				soon: {
					test: "test"
				}
			};
			scope.$emit = jasmine.createSpy("$emit");
			$controller('SoonController', {
				$scope: scope,
				TodoService: serviceMock
			});
		});
	});
	
	it('clears active project', function() {
		expect(scope.$emit).toHaveBeenCalledWith('activeProject', null);
	});
	
	it('Sets range', function() {
		expect(scope.range.test).toBe("test");
	});
});