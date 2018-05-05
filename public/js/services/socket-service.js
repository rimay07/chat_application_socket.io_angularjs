'use strict';

/* 
*  Socket Services 
*  Connect to the socket server
*  Register listeners for incoming/outgoing 'message' event
*  
*/
 
angular.module('Socket.service', []).
	factory('socket', function ($rootScope) {
	//Setup connection to the socket.io server
	var socket = io.connect('http://185.13.90.140:8081');
		return {
			//Register on listener
			on: function (eventName, callback) {
				socket.on(eventName, function () {  
					var args = arguments;
					$rootScope.$apply(function () {
						callback.apply(socket, args);
					});
				});
			},
			//Register emit
			emit: function (eventName, data, callback) {
				socket.emit(eventName, data, function () {
					var args = arguments;
					$rootScope.$apply(function () {
						if (callback) {
							callback.apply(socket, args);
						}
					});
				})
			}
		 };
	})