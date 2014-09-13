var user = null;

function init(){
  Parse.initialize('KqI3fIwrmgp1rep6UX31wZipcJACRJwtG66GNYoV', 'Xc5WRZyHmPAA0VeCJjKOcHJi8avThuzwlOQOX2pP');

  user = new Parse.User();

  // Set your id to desired user object id
  user.id = '6IFfy1uAcv';

  setInterval(checkParse, 1000);
}

init();

chrome.runtime.onStartup.addListener(init);

chrome.runtime.onConnectExternal.addListener(function(port) {
  port.onMessage.addListener(send);
});

function notify(userId, forUserId){
  var notifyUser = new Parse.User();
  notifyUser.id = userId;

  var query = new Parse.Query(Parse.Installation);
  query.equalTo('user', notifyUser);

  Parse.Push.send({
    where: query,
    data: {
            alert: 'Vinnie requested an unlock',
            title: 'FitFactor',
            forUser: forUserId
          }
  }, {
    success: function() {
      console.log('success');
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

function checkParse(){
  var StepCountUpdate = Parse.Object.extend('StepCountUpdate');
  var query = new Parse.Query(StepCountUpdate);
  query.equalTo('user', user);
  query.find({
    success: function(results) {
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        //alert(object.id + ' - ' + object.get('value'));
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

function unblock() {
  send({veil: false});
}

function block() {
  send({veil: true});
}

function send(msg) {
  console.log(msg);
  chrome.tabs.query({url: 'https://www.facebook.com/*'}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.sendMessage(tab.id, msg);
    });
  });
}
