var veilCounter = 0;

function onReceive(info){
  var buf = info.data;

  var bytes = new Int8Array(buf);

  //arduino writes ascii
  var good = bytes[0] == 49;

  //simple saturation counter to prevent flickering
  if(!good) {
    veilCounter++;
  } else {
    veilCounter = 3;
  }

  if(veilCounter > 4) {
    sendMsg({veil: true});
  } else {
    sendMsg({veil: false});
  }
}

function sendMsg(msg) {
  var laserExtensionId = "gahfcakeibfejbgkacehbdaojiglmboj";
  var port = chrome.runtime.connect(laserExtensionId);
  port.postMessage(msg);
}


chrome.app.runtime.onLaunched.addListener(function() {
  console.log('launched');

  chrome.app.window.create('window.html', {
    'bounds': {
      'width': 400,
      'height': 500
    }
  });

  chrome.serial.getDevices(function(ports) {
    var port = null;

    for(var i = 0; i < ports.length; i++) {
      console.log(ports[i].path);
      var path = ports[i].path;
      console.log(path);
      if(path.indexOf('/tty.usbserial')) {
        port = ports[i].path;
      }
    }

    chrome.serial.connect(port, function(connectionInfo){
      console.log('connected!');

      chrome.serial.onReceive.addListener(onReceive)
    });
  });

});
