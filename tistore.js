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


/**
 * Simply compares two string version values.
 * https://gist.github.com/alexey-bass/1115557
 * 
 * Example:
 * versionCompare('1.1', '1.2') => -1
 * versionCompare('1.1', '1.1') =>  0
 * versionCompare('1.2', '1.1') =>  1
 * versionCompare('2.23.3', '2.22.3') => 1
 * 
 * Returns:
 * -1 = left is LOWER than right
 *  0 = they are equal
 *  1 = left is GREATER = right is LOWER
 *  And FALSE if one of input versions are not valid
 *
 * @function
 * @param {String} left  Version #1
 * @param {String} right Version #2
 * @return {Integer|Boolean}
 * @author Alexey Bass (albass)
 * @since 2011-07-14
 */
versionCompare = function(left, right) {
    if (typeof left + typeof right != 'stringstring')
        return false;
    
    var a = left.split('.'),   
    	b = right.split('.'),   
    	i = 0, len = Math.max(a.length, b.length);
        
    for(; i < len; i++) {
        if((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1;
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1;
        }
    }
    
    return 0;
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
		if(versionCompare(versionStore, versionApp)) {
			callBack(versionStore);
		} else {
			Ti.API.info('No new version available')
		}
	});
}
