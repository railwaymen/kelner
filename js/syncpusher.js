var startServices = function(kitchenId) {
	if (window.pusher == null && window.channel == null) {
		window.pusher = new Pusher('be378fc6b685348ae04c', {
			cluster : 'eu',
			encrypted : true
		});
		window.channel = window.pusher.subscribe(kitchenId);
		window.channel.bind('event_complete', function(menuItemJson) {
			
		});
		window.channel.bind('event_take', function(eventJson) {
			
		});
		window.channel.bind('event_kitchen_disconnected', function() {
		
		});
	}
}
var stopServices = function() {
	if (window.pusher && window.channel) {
		window.pusher.unsubscribe(window.channel);
	}
	resetAll()
}
