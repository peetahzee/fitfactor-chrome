function onReceive(info){
  var buf = info.data;

  var bytes = new Int8Array(buf);

  //arduino writes ascii
  var good = bytes[0] == 49;

  var contentWindow = chrome.app.window.getAll()[0].contentWindow;
  contentWindow.document.body.innerHTML += (good == 1) ? "true" : "false";
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
