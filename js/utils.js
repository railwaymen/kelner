var uuid = function() {
	var s4 = function() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16)
				.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4()
			+ s4() + s4();
};
var currentTime = function() {
	return formatTime(new Date());
}

var formatTime = function(date) {
	var tmp = new Date(date);
	return tmp.getHours() + ":" + (tmp.getMinutes() < 10 ? "0" : "")
			+ tmp.getMinutes();
}
var sortQueue = function() {
	window.currentKitchen.queue.sort(function(menuItem1, menuItem2) {
		return menuItem1.date ? -1 : menuItem2.date ? 1 : 0;
	});
}
var removeFromQueue = function(menuItemId) {
	window.currentKitchen.queue = _.reject(window.currentKitchen.queue,
			function(menuItem) {
				return menuItem.id === menuItemId;
			});
}