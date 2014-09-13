document.getElementById('hello').onclick = sendMsg;
function sendMsg() { 
	var laserExtensionId = "gahfcakeibfejbgkacehbdaojiglmboj";
	var port = chrome.runtime.connect(laserExtensionId);
	port.postMessage('hello fitfactor');
}
