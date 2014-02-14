/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, moment */
"use strict";

angular.module('yata.controllers')

.controller('PastController', ['$scope', 'TodoService', function($scope, service) {
	$scope.title = "Too late";
	$scope.range = $scope.ranges.past;
	
	$scope.$emit('activeProject', null);
}]);