'use strict';

/** 
*  Chat controller
*  Controls the chat data
**/

angular.module('Chat.controller', []).
	controller('chatCtrl', function($scope, $rootScope, $timeout, $location, $interval, $window, socket, messageService, settings) {
		// Get saved localStorage data and update page
		var data = settings.getFromStorage('savedSettings');
		
		// If there is saved localStorage data page is updated
		if(data){
			$scope.name = data.name;
			$rootScope.bg = { 
				newcolor : data.bgcolor,
				color : (data.bgcolor == '#717171')? '#FFFFFF' : '#000000'
			};
			$scope.format = data.clock;
			$scope.sound = data.sound;
			$scope.enter = data.enter;
		
		// Otherwise use default settings in settings-controller
		} else {
			$scope.name = settings.name;
			$scope.format = 'hh:mm a';
			$scope.sound = settings.defaultSettings.sound;
			$scope.enter = settings.defaultSettings.enter;
			$rootScope.bg = { 
				newcolor : settings.defaultSettings.bgcolor, 
				color : (settings.defaultSettings.bgcolor == '#717171')? '#FFFFFF' : '#000000'
			}
		}
		// Get date
		$scope.today = new Date();
		$scope.msgService = messageService;
		$scope.isSeen = false;

		// Save messages in array
		// From settings page going back to chat page
		if($scope.msgService.savedMessages.length > 0){
			// Load messages saved in array
			$scope.messages = $scope.msgService.savedMessages;
			// Scroll to bottom of chat window
			$timeout(scrollToBottom, 500);
		} else $scope.messages = [];
			
		// Register 'message' event listener from the server
		socket.on('message', function(message){
			// Shows delivered when response is received
			if((message.user).indexOf('echoBot') > -1){
				$scope.isSeen = true;
				return;
			}
			// Add message to the messages model
			$scope.messages.push(message);
			$scope.msgService.savedMessages = $scope.messages;
			
			// Scroll to bottom of chat window
			$timeout(scrollToBottom, 500);
		});
	  
		// Function to send the message to the socket service
		$scope.sendMessage = function(){
			// Deny sending the request if message is blank
			if($scope.message == "" || $scope.message == undefined)return;
			// Send message to the socket service
			socket.emit('message', {
				user: $scope.name,
				message: $scope.message
			});

			// add the message the model
			$scope.messages.push({
				user: $scope.name,
				message: $scope.message
			});

			// clear message box
			$scope.message = '';
			
			// Scroll to bottom of chat window
			$timeout(scrollToBottom, 500);
		};
		// Function to scroll to the bottom
		var scrollToBottom = function(){
			var $id = $('.overflowable')
			$id.scrollTop($id[0].scrollHeight);
		}
		// Register keypress listener
		$window.document.addEventListener('keydown', function(evt) {
			evt = evt || window.event;
			if (evt.ctrlKey && evt.keyCode == 13 && $scope.enter) {
				$scope.sendMessage()
			}
		});
	})