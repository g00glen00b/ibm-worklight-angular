var yataObj = {
	"inbox": [{
		"id": "1",
		"title": "My task",
		"completed": false,
		"due": new Date()
	}, {
		"id": "2",
		"title": "My other task",
		"completed": true
	}, {
		"id": "3",
		"title": "Another task",
		"completed": true
	}, {
		"id": "4",
		"title": "Some other task",
		"completed": false
	}, {
		"id": "5",
		"title": "A task",
		"completed": false
	}],
	"projects": [{
		"id": "2",
		"title": "My project",
		"tasks": [{
			"id": "1",
			"title": "My other task",
			"completed": false
		}]
	}]
};

angular.module('yataApp.services', []).service('TodoService', [ function () {
	return {
		getInbox: function() {
			return yataObj.inbox;	
		},
		
		getProject: function(/** String */ id) {
			return _.find(yataObj.projects, function(project) {
				return project.id === id;
			});
		},
		
		getProjects: function() {
			return yataObj.projects;	
		}
	};
}]);