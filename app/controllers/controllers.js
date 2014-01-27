angular.module('yataApp.controllers', [])
	.controller('InboxController', [ '$scope', 'TodoService', function ($scope, service) {
		
		$scope.title = "Inbox";
		
		$scope.tasks = service.getInbox();
}])

.controller('NavigationController', [ '$scope', 'TodoService', function($scope, service) {
	
	$scope.menuTitle = "Menu";
	$scope.headerTitle = "Yata - Yet Another Todo App";
	
	$scope.projects = service.getProjects();
	
	$scope.leftButtons = [{ 
		type: 'button-positive',
		content: '<i class="icon ion-navicon"></i>',
		tap: function(evt) {
			$scope.sideMenuController.toggleLeft();
		}
	}];
}])

.controller('ProjectController', [ '$scope', 'TodoService', '$routeParams', function($scope, service, $routeParams) {
	$scope.project = service.getProject($routeParams.id);
	
	$scope.tasks = $scope.project !== null ? $scope.project.tasks : [];
	
	$scope.title = $scope.project !== null ? $scope.project.title : null;
}])
