var blockDiv = null;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if(request.veil) {
  		if (!blockDiv) {
		 		blockDiv = document.createElement('div');
	  		blockDiv.setAttribute('style', 'width:100%;height:100%;background:#000;position:absolute;top:0;left:0;z-index:9999');
	  		document.getElementsByTagName('body')[0].appendChild(blockDiv);
	  	}
	 	} else {
	 		if (blockDiv) {
  			document.getElementsByTagName('body')[0].removeChild(blockDiv);
  			blockDiv = null;
  		}
  	}
  }
);
