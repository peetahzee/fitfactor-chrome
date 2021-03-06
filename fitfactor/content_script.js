var CHROME_APP_ID = 'jlljinddnhmcpjdfoiepcaeaojgegcpc';
var EXTENSION_ID = 'gahfcakeibfejbgkacehbdaojiglmboj';

var blockDiv = document.createElement('div');
blockDiv.setAttribute('id', 'veil');
var html = '<div>';
html += '<i class="fa fa-minus-circle"></i>';
html += '<h1>Access Blocked.</h1>';
html += '<p id="ff-message"></p>';
html += '<div id="ff-progress"><div id="ff-progress-completed"></div></div>';
html += '<button id="ff-friend-button">Ask a friend to unlock ></button>';

html += '</div>';
blockDiv.innerHTML = html;
console.log(html);
document.getElementsByTagName('body')[0].appendChild(blockDiv);

var state = {};
var veilActive = false;
var message = '';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    state = request;
    veilActive = true;
    message = '';


    if (state.slouch) {
      veilActive = true;
      message = 'Sit up straight!'
    } else {
      veilActive = !state.friendUnlock && !state.steps;
      message = 'Work out more. ' + state.stepsCount + ' / ' + state.stepsGoal + ' steps walked today.'
      document.getElementById('ff-progress-completed')
        .setAttribute('style', 'width:' + (state.stepsCount / state.stepsGoal) + '%');
    }

    blockDiv.setAttribute('class', veilActive ? 'active' : '');
    document.getElementById('ff-message').innerHTML = message;
  }
);

document.getElementById('ff-friend-button').onclick = function() {
  chrome.runtime.sendMessage({mode: 'ask-friend'});
}
