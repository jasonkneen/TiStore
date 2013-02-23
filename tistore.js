// helper function for GET request
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
// check for new app version
exports.checkForAppUpdate = function(appId, callBack) {
	getURL('https://itunes.apple.com/lookup?id=' + appId, function(result) {
		var versionStore = JSON.parse(result).results[0].version
		var versionApp = Ti.App.version;
		
		Ti.API.info(versionStore + '/' + versionApp); 
		
		// currently using a straight replace of . to get the number value, then compare for greater than.
		// TODO: replace this with a regular expression to pull out just the numeric value and compare that.
		if (parseInt(versionStore.replace(new RegExp('\\.', 'g'),'')) > parseInt(versionApp.replace(new RegExp('\\.', 'g'),''))) {
			callBack(versionStore);
		}
	});
}
