TiStore
=======

Utils for iOS AppStore Search API. 

Currently two functions:-

(where appId is the ID from iTunes Connect)

	checkforAppUpdate(appId,callBack);
	
	openAppPage(appId);

Example:-

Add the module to your project

  	var store = require("TiStore/tistore");
	
Check if a new version of the current app is available:-

	// using Yelp app as example here, pass your app ID from iTunes Connect instead

	store.checkForAppUpdate('284910350', function(version) {
	    var dialog = Ti.UI.createAlertDialog({
	  		view : 0,
	  		buttonNames : ['View', 'Cancel'],
	  		message : 'An app update is available. Download?',
	  		title : 'Version ' + version + ' available.'
	  	});
	  	
	  	dialog.addEventListener('click', function(e) {
	  		if (e.index === e.source.view) {
	  			store.openAppPage('284910350');
	  		}
	  	});
	  		
	  	dialog.show();
	  });

This is WORK IN PROGRESS!
