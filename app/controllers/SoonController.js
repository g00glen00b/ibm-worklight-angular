/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, moment */
"use strict";

angular.module('yata.controllers')

.controller('SoonController', [ '$scope', 'TodoService', function($scope, service) {
	$scope.title = "Soon";
	$scope.range = $scope.ranges.soon;
	
	$scope.$emit('activeProject', null);
}]);