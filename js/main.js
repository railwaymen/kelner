window.pusher = null;
window.channel = null;
window.currentKitchen = null;
window.kitchens = {};
window.waiter = null

window.onload = function() {
	// add eventListener for tizenhwkey
	document.addEventListener('tizenhwkey', function(e) {
		if (e.keyName === "back") {
			var currentPage = $(".ui-page-active").attr('id');
			if (currentPage === 'no_kitchens') {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else if (currentPage === 'kitchens') {
				tau.changePage("#no_kitchens");
				stopServices()
			} else if (currentPage === 'menu_items'
					|| currentPage === 'single_menu_item_container'
					|| currentPage === 'no_menu_items') {
				getKitchens();
				if (window.waiter) {
					logoutWaiter(window.currentKitchen.id, window.waiter.id);
				}
				stopServices()
			} else if (currentPage === 'to_slow') {
				checkQueue()
			}
		}
	});
	$("#no-kitchens").click(function() {
		getKitchens();
	});
	$("#to_slow").click(function() {
		checkQueue();
	});

	tau.changePage("#no_kitchens");
	Pusher.log = function(message) {
		if (window.console && window.console.log) {
			window.console.log(message);
		}
	};

};
var refreshPage = function() {
	var currentPage = $(".ui-page-active").attr('id');
	if (currentPage === 'menu_items'
			|| currentPage === 'single_menu_item_container'
			|| currentPage === 'to_slow' || currentPage === 'no_menu_items') {
		checkQueue();
	}
}

var renderKitchens = function() {

}
var renderKitchen = function(kitchen) {
	return "<li data-id=\"" + kitchen.id
			+ "\"><a href=\"#\" class=\"ui-li-text-sub\">" + kitchen.name
			+ "</a></li>";

}
var renderMenuItems = function() {

}

var renderMenuItem = function(menuItem) {
	return "<li data-id=\"" + menuItem.id
			+ "\"><a href=\"#\" class=\"ui-li-text-sub\">" + menuItem.name
			+ ' ' + formatTime(menuItem.date) + "</a></li>";
}
var renderSinglePageMenuItem = function(menuItem) {
	$("#single_menu_item").text(menuItem.name);
	$("#single_menu_item_date").text(formatTime(menuItem.date));
	$('#single_menu_item_container').unbind("click");
	$('#single_menu_item_container').click(
			function() {
				takeMenuItem(window.currentKitchen.queue[0], JSON
						.stringify(window.waiter));
			});

}
var kitchenClickListener = function(e) {
}

var menuItemClickListener = function(e) {

}
var checkQueue = function() {

}
var bindResponsibility = function(menuItem) {

}
var resetAll = function() {
	window.pusher = null;
	window.channel = null;
	window.currentKitchen = null;
	window.kitchens = {};
	window.deviceId = null;
	window.waiter = null;
}
