/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, moment */
"use strict";

angular.module('yataApp.controllers')

.controller('TodayController', [ '$scope', 'TodoService', function($scope, service) {
	$scope.title = "Today";
	$scope.range = $scope.ranges.today;
	
	$scope.$emit('activeProject', null);
}]);