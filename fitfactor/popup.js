$(document).ready(function() {
	chrome.storage.sync.get({
		goal: 10,
		blacklist: ['facebook.com']
	}, function(items) {
		$('#goal').val(items.goal);
		$('#blacklist').val(items.blacklist.join('\n'));
	});

	$('#prefs').submit(function(e) {
		e.preventDefault();
		var goal = $(this).find('#goal').val();
		var blacklist = $(this).find('#blacklist').val().split('\n');

		chrome.storage.sync.set({
			goal: goal,
			blacklist: blacklist
		}, function() {
			chrome.runtime.sendMessage({mode: 'updateConfig'});
		});
		return false;
	});
});
