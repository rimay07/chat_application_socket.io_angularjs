'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('Settings.service', []).
	factory('settings', function($rootScope, $window) {
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
			getDefault: function(){
				return this.defaultSettings;
			},
			set: function(obj, callback){
				this.name = obj.name;
				this.bgcolor = obj.bgcolor;
				this.clock = obj.clock;
				this.sound = obj.sound;
				this.enter = obj.enter;
				var args = arguments;
				callback.apply(obj, args);
			},
			setToStorage: function(name, data){
				$window.localStorage.setItem(name, JSON.stringify(data));
			},
			getFromStorage: function(name){
				var data = $window.localStorage.getItem(name);
				return JSON.parse(data);
			},
			buttons:{
				init: function(){
					$('#toggle-interface, #toggle-clock, #toggle-sound, #toggle-enter').bootstrapToggle();
				}
			}
		}
		return personalSettings;
	});
