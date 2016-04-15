window.buildUrlSettings = function(endpoint) {
	return 'https://kuchnia-api-railwaymen.herokuapp.com/api/' + endpoint;
};
var buildUrl = function(endpoint) {
	return window.buildUrlSettings(endpoint);
};
var sendRequest = function(method, url, onSuccess, onError) {
	sendRequestWithBody(method, url, null, onSuccess, onError)
}
var sendRequestWithBody = function(method, url, body, onSuccess, onError) {
	var request = new XMLHttpRequest()
	request.open(method, url, true);
	request.setRequestHeader("Content-type", "application/json", "charset",
			"utf-8");
	request.send(body);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status >= 200 && request.status < 300) {
				var data
				if (request.responseText) {
					data = JSON.parse(request.responseText);
				}
				(typeof onSuccess == 'function' ? onSuccess(request, data)
						: null);
			} else {
				(typeof onError == 'function' ? onError(request.responseText)
						: null);
			}
		}
	};
}

var getKitchens = function() {
	sendRequest('GET', buildUrl('kitchens', ''), function(request, data) {
	}, function(data) {
		alert('Nie można pobrać kuchni!');
	});
}
var logoutWaiter = function(kitchenId, waiterId) {
	sendRequest('DELETE', buildUrl('kitchens/' + kitchenId + '/waiters/'
			+ waiterId), function(request, data) {
	}, function(data) {
		alert('Problem wylogowania');
	});
}
var getMenuItems = function(kitchenId, waiter) {
	sendRequestWithBody('POST', buildUrl('kitchens/' + kitchenId
			+ '/menu_items'), waiter, function(request, data) {
	}, function(data) {

	});
}
var takeMenuItem = function(menuItem, waiter) {
	sendRequestWithBody('DELETE', buildUrl('kitchens/'
			+ window.currentKitchen.id + '/menu_items/' + menuItem.id, ''),
			waiter, function(request, data) {
			}, function(request, data) {
			});
}
