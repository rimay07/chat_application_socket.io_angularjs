'use strict';

/*
* Settings service
*/

// Settings service setup
angular.module('Settings.service', []).
	factory('settings', function($rootScope, $window) {
		// Set personal settings initial values
		var personalSettings = {
			name: 'guest0001',
			bgcolor: '#dde1e2',
			clock: 'hh:mm a',
			sound: false,
			enter: false,
			defaultSettings: {
				name: 'guest0001',
				bgcolor: '#dde1e2',
				clock: 'hh:mm a',
				sound: false,
				enter: false
			},
			// Function to get default settings
			getDefault: function(){
				return this.defaultSettings;
			},
			// Function so set new settings
			set: function(obj, callback){
				this.name = obj.name;
				this.bgcolor = obj.bgcolor;
				this.clock = obj.clock;
				this.sound = obj.sound;
				this.enter = obj.enter;
				var args = arguments;
				callback.apply(obj, args);
			},
			// Save settings to local storage
			setToStorage: function(name, data){
				$window.localStorage.setItem(name, JSON.stringify(data));
			},
			// Get settings from local storage
			getFromStorage: function(name){
				var data = $window.localStorage.getItem(name);
				return JSON.parse(data);
			},
			// Initialize buttons
			buttons:{
				init:function(){
					$('#toggle-interface, #toggle-clock, #toggle-sound, #toggle-enter').bootstrapToggle();
				}
			}
		}
		return personalSettings;
	});
