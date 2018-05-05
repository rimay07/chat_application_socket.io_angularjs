'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('Messages.service', []).
	factory('messageService', function ($rootScope) {
		var messages = {
			savedMessages: [],
			savedMessagesLength:0,
			parseMessage: function(url, callback){
				var video = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
				var img = /(https?:\/\/.*\.(?:png|jpg|gif))/i;
				var links = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
				
				var testArr = [video, img, links];
				var obj = {};
				testArr.forEach((item, idx)=>{
					if(url.match(item)){
						switch(idx){
							case 0:
								obj.msgType = 'isVideo';
								break;
							case 1:
								obj.msgType = 'isImage';
								break;
							case 2:
								if(obj.msgType == 'isVideo' || obj.msgType == 'isImage')return;
								obj.msgType = 'isLink';
								break;
						}
					}
				});
				callback(obj);
			}
		}
		return messages;
	});
