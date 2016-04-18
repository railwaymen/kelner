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
	if (window.kitchens.length != 0) {
		if (window.kitchens.length)
			tau.changePage("#kitchens");
		$("#kitchenList").empty();
		window.kitchens.sort(function compare(lok1, lok2) {
			if (lok1.name.toLowerCase() < lok2.name.toLowerCase())
				return -1;
			if (lok1.name.toLowerCase() > lok2.name.toLowerCase())
				return 1;
			return 0;
		});
		window.kitchens.forEach(function(kitchen) {
			$("#kitchenList").append(renderKitchen(kitchen));
		});
		$("#kitchenList li").click(kitchenClickListener);
	} else {
		$("#no-kitchens").text('Brak zarejestrowanych kuchni');
	}
}
var renderKitchen = function(kitchen) {
	return "<li data-id=\"" + kitchen.id
			+ "\"><a href=\"#\" class=\"ui-li-text-sub\">" + kitchen.name
			+ "</a></li>";

}
var renderMenuItems = function() {
	$("#menuItemsList").empty();
	if (window.currentKitchen.queue.length != 1) {
		tau.changePage("#menu_items");
		sortQueue()
		window.currentKitchen.queue.forEach(function(menuItem) {
			$("#menuItemsList").append(renderMenuItem(menuItem));
		});
		$("#menuItemsList li").click(menuItemClickListener);
	} else {
		tau.changePage("#single_menu_item_container");
		renderSinglePageMenuItem(window.currentKitchen.queue[0])
	}
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
$(".waiter_name").text(window.waiter.name);
	if (window.currentKitchen.queue.length === 0) {
		tau.changePage("#no_menu_items");
	} else if (window.currentKitchen.queue.length === 1) {
		tau.changePage("#single_menu_item_container");
		renderSinglePageMenuItem(window.currentKitchen.queue[0])
	} else {
		tau.changePage("#menu_items");
		renderMenuItems();
	}
}
var bindResponsibility = function(menuItem) {
tau.changePage("#well_done");
	$("#menu_item").text(menuItem.name);
	$("#menu_item_date").text(formatTime(menuItem.date));
	$('#well_done').unbind("click");
	var timeTask = window.setTimeout(function() {
		checkQueue();
	}, 3000);
	$('#well_done').click(function() {
		window.clearTimeout(timeTask)
		checkQueue();
	});
}
var resetAll = function() {
	window.pusher = null;
	window.channel = null;
	window.currentKitchen = null;
	window.kitchens = {};
	window.deviceId = null;
	window.waiter = null;
}
