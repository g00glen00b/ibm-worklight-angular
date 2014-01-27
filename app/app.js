/*jslint node: true */
/*globals angular */
"use strict";

angular.module('yataApp', [ 'ngRoute', 'yataApp.controllers', 'yataApp.services', 'ionic' ])
	.config(['$routeProvider', function ($route) {
		$route.when('/inbox', {
			templateUrl: 'app/views/tasks.html',
			controller: 'InboxController'
		})
		.when('/project/:id', {
			templateUrl: 'app/views/tasks.html',
			controller: 'ProjectController'
		})
		.otherwise({
			redirectTo: '/inbox'
		});
}]);
	