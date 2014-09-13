document.getElementById('off').onclick = function() {
	sendMsg({off: true});
}
document.getElementById('on').onclick = function() {
	sendMsg({on: true});
}
function sendMsg(msg) { 
	var laserExtensionId = "gahfcakeibfejbgkacehbdaojiglmboj";
	var port = chrome.runtime.connect(laserExtensionId);
	port.postMessage(msg);
}
