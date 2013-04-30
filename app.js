var store = require("TiStore/tistore");

store.checkForAppUpdate(function(version, appId) {
	var dialog = Ti.UI.createAlertDialog({
		view : 0,
		buttonNames : ['View', 'Cancel'],
		message : 'An app update is available. Download?',
		title : 'Version ' + version + ' available.'
	});
	
	dialog.addEventListener('click', function(e) {
		if (e.index === e.source.view) {
			store.openAppPage(appId);
		}
	});
		
	dialog.show();
});
