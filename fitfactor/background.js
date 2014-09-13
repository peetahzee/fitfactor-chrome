chrome.runtime.onStartup.addListener(function(){
  Parse.initialize("kKHah32xHCgNU7we80esxavR7rlecBjMV0sNtYjt", "TnxvmngkwSx7xGsWq29Y6W4acVXFp9uC093b3CjT");
});

chrome.runtime.onConnectExternal.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
  	console.log(msg);
  	chrome.tabs.query({url: 'https://www.facebook.com/*'}, function(tabs) {
  		tabs.forEach(function(tab) {
  			chrome.tabs.sendMessage(tab.id, msg);
  		});

		});

  });
});
