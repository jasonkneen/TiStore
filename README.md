TiStore
=======

Utils for iOS AppStore Search API. 

	var store = require("tistore");

Currently consists of two functions:-

**checkforAppUpdate(callBack[,appId])**

Checks if the AppStore app has a different version number to the current version, passes the version to the callBack specified. Works by replacing any . chars to get a number then doing a > comparison. Crude but works for normal x.x.x formats.
	
**openAppPage(appId)**

Opens the AppStore to the specified appId

**Usage**

User launches app which can check if a new version is available - if so, prompt the user to visit the appstore.

This is WORK IN PROGRESS!
