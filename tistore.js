// helper function to perform a GET request
function getURL(url, callBack) {
	var xhrClient = Ti.Network.createHTTPClient();

	xhrClient.onload = function(e) {
		callBack(xhrClient.responseText);
	};
	xhrClient.onerror = function(e) {
		Ti.API.info("Error loading " + url);
		Ti.API.info(e);
	};
	xhrClient.timeout = 10000;
	xhrClient.open('GET', url);
	xhrClient.send();
}

// Opens the App page in the AppStore
exports.openAppPage = function(appId) {
	if (appId) {
		Ti.Platform.openURL('http://itunes.apple.com/us/app/id' + appId);
	}
}
// check for update gets the latest version number of an app, compares
// to the current and then performs a callback if there's an update.

exports.checkForAppUpdate = function(appId, callBack) {
	getURL('https://itunes.apple.com/lookup?id=' + appId, function(result) {
		var version = JSON.parse(result).results[0].version;
		if (version.toString() != Ti.App.version) {
			callBack(version);
		}
	});
}
