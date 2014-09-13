document.getElementById('off').onclick = function() {
	sendMsg({veil: false});
}
document.getElementById('on').onclick = function() {
	sendMsg({veil: true});
}
function sendMsg(msg) {
	var laserExtensionId = "hcoibkkgaadbdmoifphicfielhmmmkci";
	var port = chrome.runtime.connect(laserExtensionId);
	port.postMessage(msg);
}
