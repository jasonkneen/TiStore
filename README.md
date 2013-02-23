TiStore
=======

Utils for iOS AppStore Search API. 

	var store = require("tistore");

Currently two functions:-

**checkforAppUpdate(appId,callBack)**

Checks if the AppStore app has a different version number to the current version, passes the version to the callBack specified. 
	
**openAppPage(appId)**

Opens the AppStore to the specified appId

**Usage**

User launches app which can check if a new version is available - if so, prompt the user to visit the appstore.

This is WORK IN PROGRESS!
