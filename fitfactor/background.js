chrome.runtime.onConnectExternal.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
  	console.log(msg);
  	chrome.tabs.query({url: 'https://www.facebook.com/*'}, function(tabs) {
  		console.log(tabs);
  		tabs.forEach(function(tab) {
  			chrome.tabs.sendMessage(tab.id, msg);	
  		});
		  
		});

  });
});
