var EXTENSION_ID = 'gahfcakeibfejbgkacehbdaojiglmboj';

document.getElementById('off').onclick = function() {
	sendMsg({veil: false});
}
document.getElementById('on').onclick = function() {
	sendMsg({veil: true});
}

function sendMsg(msg) {
	var port = chrome.runtime.connect(EXTENSION_ID);
	port.postMessage(msg);
}
