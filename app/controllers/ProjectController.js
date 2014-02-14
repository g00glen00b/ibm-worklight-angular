/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, moment */
"use strict";

angular.module('yata.controllers')

.controller('ProjectController', [ '$scope', 'TodoService', '$routeParams', function($scope, service, $routeParams) {
		
	$scope.project = service.getProject($routeParams.id);
	$scope.title = $scope.project !== null ? $scope.project.title : null;
	$scope.tasks = $scope.project !== null ? $scope.project.tasks : [];
	
	$scope.$emit('activeProject', $scope.project);
}]);