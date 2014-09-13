var user = null;

var stepsGoal = 10;
//20 hours in ms
//var goalInterval = 20 * 60 * 60 * 1000;
var goalInterval = 60 * 1000;

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
  port.onMessage.addListener(function(msg){
    console.log(msg);
  });
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

function checkParse(callback){
  getSteps(function(steps) {
    isFriendUnlock(function(friendUnlock) {
      var message = {
        slouch: false,
        steps: steps > stepsGoal,
        stepsCount: steps,
        stepsGoal: stepsGoal,
        interval: goalInterval,
        friendUnlock: friendUnlock
      };

      send(message);
    });
  })
}

function getSteps(callback) {
  var StepCountUpdate = Parse.Object.extend('StepCountUpdate');
  var recentSteps = new Parse.Query(StepCountUpdate);
  recentSteps.equalTo('user', user);
  recentSteps.greaterThan('createdAt', new Date(new Date().getTime() - goalInterval));

  recentSteps.find({
    success: function(results) {
      var totalSteps = 0;
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        totalSteps += parseInt(object.get('value'));
      }
      callback(totalSteps);
    },
    error: function(error) {
      console.error("Error: " + error.code + " " + error.message);
    }
  });
}

function isFriendUnlock(callback) {
  var FriendUnlock = Parse.Object.extend('FriendUnlock');
  var friendQuery = new Parse.Query(FriendUnlock);
  friendQuery.equalTo('unlockFor', user);
  friendQuery.greaterThan('createdAt', new Date(new Date().getTime() - goalInterval));

  friendQuery.count({
    success: function(count) {
      callback(count > 0);
    },
    error: function(error) {
      // The request failed
      callback(false);
    }
  });
}

function send(msg) {
  console.log(msg);
  chrome.tabs.query({url: 'https://www.facebook.com/*'}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.sendMessage(tab.id, msg);
    });
  });
}
