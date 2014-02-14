/*jslint nomen: true */
/*jslint node: true */
/*jslint browser: true */
/*global angular, document, console, _ */
"use strict";

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
			"id": "6",
			"title": "My other task",
			"completed": false,
			"due": new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
		}]
	}, {
		"id": "3",
		"title": "My other project",
		"tasks": [ ]
	}]
};

angular.module('yata.services').service('TodoService', [ function () {
	return {
		getInbox: function() {
			return yataObj.inbox;
		},
		
		getProject: function(/** String */ id) {
			return _.find(yataObj.projects, function(project) {
				return project.id === id;
			});
		},
		
		getProjectByTask: function(/** Task */ myTask) {
			return _.find(yataObj.projects, function(project) {
				var found = _.find(project.tasks, function(task) {
					return myTask.id === task.id;
				});
				return found !== null && found !== undefined;
			});
		},
		
		deleteProject: function(/** Project */ myProject) {
			var myIdx = null;
			_.each(yataObj.projects, function(project, idx) {
				if (project.id === myProject.id) {
					myIdx = idx;
				}
			});
			if (myIdx !== null) {
				yataObj.projects.splice(myIdx, 1);
			}
		},
		
		addProject: function(/** String */ name) {
			var highestId = _.max(yataObj.projects, function(project) {
				return project.id;
			}).id;
			if (name !== null) {
				yataObj.projects.push({
					id: highestId + 1,
					title: name,
					tasks: []
				});
			}
		},
		
		deleteTask: function(/** Task */ task) {
			var self = this;
			_.each(yataObj.projects, function(project) {
				self.deleteTaskInTasks(task, project.tasks);
			});
			self.deleteTaskInTasks(task, yataObj.inbox);
		},
		
		addTask: function(/** Task */ myTask, /** Project */ project) {
			var highestId = 0, maxId = 0;
			_.each(yataObj.projects, function(project) {
				var maxId = _.max(project.tasks, function(task) {
					return task.id;
				}).id;
				if (maxId > highestId) {
					highestId = maxId;
				}
			});
			maxId = _.max(yataObj.inbox, function(task) {
				return task.id;
			});
			if (maxId > highestId) {
				highestId = maxId;
			}
			
			myTask.id = highestId + 1;
			
			if (project !== undefined && project !== null && project.id !== undefined) {
				this.getProject(project.id).tasks.push(myTask);
			} else {
				yataObj.inbox.push(myTask);
			}
		},
		
		moveTask: function(/** Task */ task, /** Project */ project) {
			this.deleteTask(task);
			if (project !== undefined && project !== null && project.id !== undefined) {
				this.getProject(project.id).tasks.push(task);
			} else {
				yataObj.inbox.push(task);
			}
		},
		
		deleteTaskInTasks: function(/** Task */ myTask, /** Tasks */ tasks) {
			var myIdx = null;
			_.each(tasks, function(task, idx) {
				if (task.id === myTask.id) {
					myIdx = idx;
				}
			});
			if (myIdx !== null) {
				tasks.splice(myIdx, 1);
			}
		},
		
		getTasksByDates: function(/** Date */ start, /** Date */ end) {
			var tasks = [], self = this;
			_.forEach(yataObj.projects, function(project) {
				tasks = tasks.concat(_.filter(project.tasks, function(task) {
					return self.isTaskInRange(task, start, end);
				}));
			});
			
			tasks = tasks.concat(_.filter(yataObj.inbox, function(task) {
				return self.isTaskInRange(task, start, end);
			}));
			
			return tasks;
		},
		
		getOpenTasks: function(/** Array */ tasks) {
			return _.filter(tasks, function(task) {
				return !task.completed;
			});
		},
		
		isTaskInRange: function(/** Task */ task, /** Date */ start, /** Date */ end) {
			return task !== null && task.due !== undefined && (start === null || start.isBefore(task.due) ||
				start.isSame(task.due)) && (end.isAfter(task.due) || end.isSame(task.due));
		},
		
		getProjects: function() {
			return yataObj.projects;
		}
	};
}]);