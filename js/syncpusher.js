var startServices = function(kitchenId) {
	if (window.pusher == null && window.channel == null) {
		window.pusher = new Pusher('be378fc6b685348ae04c', {
			cluster : 'eu',
			encrypted : true
		});
		window.channel = window.pusher.subscribe(kitchenId);
		window.channel.bind('event_complete', function(menuItemJson) {
			window.currentKitchen.queue.push(menuItemJson)
			sortQueue()
			refreshPage()
		});
		window.channel.bind('event_take', function(eventJson) {
			var waiter = eventJson.waiter
			if (waiter.id != window.waiter.id
					&& waiter.name != window.waiter.name) {
				var menuItem = event.menu_item
				removeFromQueue(menuItem.id)
				sortQueue()
				refreshPage()
			}
		});
		window.channel.bind('event_kitchen_disconnected', function() {
			stopServices()
			tau.changePage("#no_kitchens");
			alert('Kuchnia została zamknięta')
		});
	}
}
var stopServices = function() {
	if (window.pusher && window.channel) {
		window.pusher.unsubscribe(window.channel.name);
	}
	resetAll()
}
