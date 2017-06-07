/** 
 * if i understand correctly this is a background script of plugin
 * gona try to use it to pass CORS data to facebook page
 */

/** @param string n - url @return {then: Callback<string resp>} */
var http=(n,e,t,o)=>{e=e||"GET";t=t||{};var r={then:n=>{}};o=o||(n=>{});var s=encodeURIComponent;n+=e.toUpperCase()==="GET"?"?"+Object.keys(t).map(n=>s(n)+"="+s(t[n])).join("&"):"";var p=new XMLHttpRequest;p.open(e,n,true);p.responseType="text";p.onload=(()=>r.then(p.response));p.onprogress=(()=>o(p.response));p.send(JSON.stringify(t));return r};

// a func to send message to currently open page
var sendMessageToPage = function(action, msg, data) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: action, msg: msg, data: data});
    });
};

var log = function(msg, data) {
    msg = '&& From plugin bg script: ' + msg;
    // log to page console
    sendMessageToPage('log', msg, data);
    // log to popup console
    console.log(msg, data);
};

// listen for events sent from content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let waitForCb = false;
    if (request.action == "pageLoaded") {
        let url = (request.data || {}).url || '';
        if (url.match(/facebook\.com/)) {
            waitForCb = true;
            http('http://midiana.lv/unversioned/gits/fix-web-sites/cjs/facebook.com.js').then = function(page) {
                sendResponse({action: 'executeScript', msg: 'Facebook Script To Improve UI', data: page});
                log('Loaded facebook script', page.length);
            };
        }
    }
    return waitForCb;
});
