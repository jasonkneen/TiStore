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

// helper function to remove chars from a string
function removeChars(string,char) {
	string = string.replace(new RegExp(char, 'g'), '')
	return string
}

// Opens the App page in the AppStore App.
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
		
		// parse the versions to remove . so 2.3.4 becomes 234 then compare as integers		
	
		if (parseInt(removeChars(versionStore,'\\.')) > parseInt(removeChars(versionApp,'\\.'))) {
			callBack(versionStore);
		} else {
			Ti.API.info('No new version available')
		}
	});
}
