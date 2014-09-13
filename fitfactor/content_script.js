var blockDiv = document.createElement('div');
blockDiv.setAttribute('id', 'veil');
blockDiv.innerHTML = '<i class="fa fa-minus-circle"></i><h1>Blocked</h1><p>Sit up straight!</p>';
document.getElementsByTagName('body')[0].appendChild(blockDiv);

var veilActive = false;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log(request)
  	if(request.veil) {
  		if (!veilActive) {
        blockDiv.setAttribute('class', 'active');
        veilActive = true;
	  	}
	 	} else {
	 		if (veilActive) {
        blockDiv.setAttribute('class', '');
        veilActive = false;
  		}
  	}
  }
);
