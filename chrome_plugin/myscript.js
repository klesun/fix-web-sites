
var scriptDom = document.createElement('script');
console.log('Initializing plugin "Call Everywhere!"', scriptDom);
document.head.appendChild(scriptDom);
scriptDom.setAttribute('src','https://intranet.dyninno.net/~aklesuns/dev_data/misc/call-everywhere.js');

// add a listener to forward log messages from plugin bg to console on page
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    if (request.action === 'log') {
        console.log('&& plugin log - ' + request.msg, request.data);
    }
})

// reporting that page is loaded to the plugin
chrome.runtime.sendMessage(null, { 
    action: "pageLoaded", 
    msg: 'Do something about that!',
    data: {
        url: window.location.href,
    },
}, null, (resp) => {
    if ((resp || {}).action === 'executeScript') {
        console.log('&& plugin executeScript - ' + resp.msg);
        eval(resp.data);
    }
});
