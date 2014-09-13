chrome.runtime.onConnectExternal.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
  	chrome.tabs.query({url: 'https://www.facebook.com/*'}, function(tabs) {
  		tabs.forEach(function(tab) {
  			chrome.tabs.sendMessage(tab.id, msg);	
  		});
		  
		});

  });
});
