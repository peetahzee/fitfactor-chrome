function onReceive(connectionId, data){
  var contentWindow = chrome.app.window.getAll()[0].contentWindow;
  contentWindow.document.body.innerHTML += data;
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
      onReceive(0, "hello");

      chrome.serial.onReceive.addListener(onReceive)
    });
  });

});
