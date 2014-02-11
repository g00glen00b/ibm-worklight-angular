/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, moment */
"use strict";

angular.module('yataApp.controllers')

.controller('SettingsController', [ '$scope', '$ionicModal', 'TodoService', function($scope, $ionicModal, service) {
	$scope.title = "Settings";
	$scope.projects = service.getProjects();
	$scope.newProject = {
		name: null
	};
	
	$scope.model = {
		project: null,
		projectName: null
	};
	
	$scope.projectBtns = [{
		text: '',
		type: 'button icon ion-edit',
		onTap: function(project) {
			$scope.model.project = project;
			$scope.model.projectName = project.title;
			$scope.modal.show();
		}
	}, {
		text: '',
		type: 'button icon ion-trash-a',
		onTap: function(project) {
			service.deleteProject(project);
		}
	}];
	
	$ionicModal.fromTemplateUrl('app/views/project.html', function(modal) {
		$scope.modal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});
	
	$scope.saveModal = function() {
		// TODO Convert to service call
		$scope.model.project.title = $scope.model.projectName;
		$scope.closeModal();
	};

	$scope.closeModal = function() {
		$scope.modal.hide();
		$scope.model.project = null;
		$scope.model.projectName = null;
	};
	
	$scope.addProject = function() {
		service.addProject($scope.newProject.name);
		$scope.newProject.name = null;
	};
}]);