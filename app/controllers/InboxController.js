/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, moment */
"use strict";

angular.module('yata.controllers')

.controller('InboxController', [ '$scope', 'TodoService', function ($scope, service) {
	$scope.title = "Inbox";
	$scope.tasks = service.getInbox();
	
	$scope.$emit('activeProject', null);
}]);