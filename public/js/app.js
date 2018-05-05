'use strict';

// Declare app level module which depends on filters, and services

angular.module('chatApp', ['ngRoute', 'Chat.controller', 'Settings.controller', 'Socket.service', 'Messages.service', 'Settings.service']).
	config(function ($routeProvider, $locationProvider) {
	  $routeProvider.
		when('/', {
		  templateUrl: 'pages/chat',
		  controller: 'chatCtrl'
		}).
		when('/settings', {
		  templateUrl: 'pages/settings',
		  controller: 'settingsCtrl'
		}).
		otherwise({
		  redirectTo: '/'
		});

	  $locationProvider.html5Mode(true);
	});
