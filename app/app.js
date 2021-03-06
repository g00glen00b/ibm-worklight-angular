/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console */
"use strict";

angular.module('yata', [
	'ngRoute', 'ionic', 'angular-gestures',
	'yata.controllers', 'yata.services', 'yata.filters'

]).config(['$routeProvider', function ($route) {
	
	$route.when('/inbox', {
		templateUrl: 'app/views/tasks.html',
		controller: 'InboxController'
	})
	.when('/project/:id', {
		templateUrl: 'app/views/tasks.html',
		controller: 'ProjectController'
	})
	.when('/past', {
		templateUrl: 'app/views/tasksAll.html',
		controller: 'PastController'
	})
	.when('/today', {
		templateUrl: 'app/views/tasksAll.html',
		controller: 'TodayController'
	})
	.when('/soon', {
		templateUrl: 'app/views/tasksAll.html',
		controller: 'SoonController'
	})
	.when('/settings', {
		templateUrl: 'app/views/settings.html',
		controller: 'SettingsController'
	})
	.otherwise({
		redirectTo: '/inbox'
	});
}]);

angular.module('yata.controllers', []);
angular.module('yata.services', []);
angular.module('yata.filters', []);