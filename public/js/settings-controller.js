'use strict';

/* 
*  Settings controller
*  Controls the settings data
*/

angular.module('Settings.controller', []).
	controller('settingsCtrl', function ($scope, $rootScope, $interval, $window, messageService, settings) {
		
		var settings = settings;
		// Initialize checkboxes
		settings.buttons.init();
		
		// Setup local checkbox variables
		var interfaceBTN = $('#toggle-interface'),
		clockBTN = $('#toggle-clock'),
		soundBTN = $('#toggle-sound'),
		enterBTN = $('#toggle-enter');
		
		var defaultSettings = settings.defaultSettings;
		var sound = defaultSettings.sound;
		var enter = defaultSettings.enter
		var bgcolor = defaultSettings.bgcolor;
		var txtcolor, nmcolor;
		var clock = defaultSettings.clock;
		
		// Get saved localStorage data and update page
		var data = settings.getFromStorage('savedSettings');
		
		// If there is saved localStorage data page is updated
		if(data){
			$scope.name = data.name;
			$rootScope.bg = { 
				newcolor : data.color,
				color : (bgcolor == defaultSettings.bgcolor) ? '#000000' : '#FFFFFF'
			};
			bgcolor = data.color;
			$scope.clock = data.clock;
			$scope.sound = data.sound;
			$scope.enter = data.enter;
			
		// Otherwise use default settings in settings-controller
		} else {
			$scope.name = settings.name;
			$rootScope.bg = {
				newcolor : bgcolor,
				color : (bgcolor == defaultSettings.bgcolor) ? '#000000' : '#FFFFFF'
			}
			$scope.clock = defaultSettings.clock;
			$scope.sound = defaultSettings.sound;
			$scope.enter = defaultSettings.enter;
		}
		// Set buttons to either checked or unchecked
		setButtons();
		
		// Get initial message length 
		messageService.savedMessagesLength = messageService.savedMessages.length;
		var counter = 0;
		
		// Register interval to check the incoming messages
		var messageInterval = $interval(function(){
			// Blink chat label on incoming messages
			if(messageService.savedMessagesLength < messageService.savedMessages.length){
				$rootScope.blink = true;
				counter++;
			}
			$rootScope.isCounter = true;
			if(counter > 0)$rootScope.counter = counter;
		}, 1000);
		
		// Reset to default settings function
		$scope.resetToDefault = function(){
			var obj = settings.getDefault();
			settings.set(obj, setNew);
			resetButtons();
		}
		
		// Save settings changes
		$scope.saveSettings = function(){
			var obj = {
				name:($scope.newName == "" || $scope.newName == undefined || $scope.name == "")? $scope.name : $scope.newName,
				bgcolor:(bgcolor == "" || bgcolor == undefined)? $scope.bgcolor : bgcolor,
				clock:(clock == "" || clock == undefined)? settings.clock : $scope.clock,
				sound:$scope.sound,
				enter:$scope.enter
			};
			settings.set(obj, setNew);
		}
		
		// Cancel interval when leaving setting page
		$scope.$on('$locationChangeStart', function(){
			$interval.cancel(messageInterval);
		});
		
		// Register interface color change listener
		interfaceBTN.on('change', function(){
			if($(this).prop('checked')){
				bgcolor = defaultSettings.bgcolor;
				txtcolor = '#000000';
			} else {
				bgcolor = '#717171';
				txtcolor = '#FFFFFF';
			}
			$rootScope.bg = { newcolor : bgcolor, color : txtcolor};
			$scope.bgcolor = bgcolor;
		});
		
		// Register time format change listener
		clockBTN.on('change', function(){
			$scope.clock = ($(this).prop('checked'))? defaultSettings.clock : 'H:mm a';
		});
		
		// Register chat sound change listener
		soundBTN.on('change', function(){
			$scope.sound = ($(this).prop('checked'))? true: defaultSettings.sound ;
		});
		
		// Register CTRL + Enter on/off change listener
		enterBTN.on('change', function(){
			$scope.enter = ($(this).prop('checked'))? true: defaultSettings.sound ;
		});
		
		/**Private variables**/
		// Set buttons to true or false
		function setButtons(){
			var isDefaultBGColor = (data && data.bgcolor !== settings.defaultSettings.bgcolor)? false : true;
			interfaceBTN.prop('checked', isDefaultBGColor).change();
			
			var isDefaultClock = (data && data.clock !== settings.defaultSettings.clock)? false : true;
			clockBTN.prop('checked', isDefaultClock).change();
			
			var isDefaultSound = (data && data.sound !== settings.defaultSettings.sound)? true : false;
			soundBTN.prop('checked', isDefaultSound).change();
			
			var isDefaultEnter = (data && data.enter !== settings.defaultSettings.enter)? true : false;
			enterBTN.prop('checked', isDefaultEnter).change();
		}
		
		// Reset the buttons
		function resetButtons(){
			interfaceBTN.prop('checked', true).change();
			clockBTN.prop('checked', true).change();
			soundBTN.prop('checked', false).change();
			enterBTN.prop('checked', false).change();
		}
		
		// Send the settings data to the settings service 
		var setNew = function(data){
			settings.setToStorage('savedSettings', data);
		}
	})
