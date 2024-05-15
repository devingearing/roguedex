console.log('content script start');

const browserApi = typeof browser !== "undefined" ? browser : chrome;

// inject injected script
var s = document.createElement('script');
s.src = browserApi.runtime.getURL('injected.js');
s.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
 
// receive message from injected script
window.addEventListener('message', function (e) {
    ///GET_SAVEDATA and UPDATE_SAVEDATA will only be used upon load, then everything will fall to UPDATE_ALL
    if (e.data.type === 'GET_SAVEDATA') {
        browserApi.runtime.sendMessage({ type: 'HTTP_SESSION_DATA', data: e.data.data }, function(response) {
          if (response && response.success) {
            console.log('Successfully updated game info');
          } else {
            console.error('Failed to update game info');
          }
        });
    }
    if(e.data.type === 'GET_PLAYER_DATA') {
        //
        // browserApi.runtime.sendMessage({type: 'GET_SAVEDATA_2', data: e.data.data}, function (response) {
        //     localStorage.setItem('updateSaveData', JSON.stringify(e.data.data));
        // });
        browserApi.runtime.sendMessage({ type: 'HTTP_PLAYER_DATA', data: e.data.data }, function(response) {
            console.log(e.data.data);
            if (response && response.success) {
                console.log('Successfully updated player info');
            } else {
                console.error('Failed to update player info');
            }
        });
    }
    if (e.data.type === 'UPDATE_ALL') {
        browserApi.runtime.sendMessage({ type: 'HTTP_SESSION_DATA', data: (e.data.data)["session"]}, function(response) {
            if (response && response.success) {
                console.log('Successfully updated game info (all)');
            } else {
                console.error('Failed to update game info (all)');
            }
        });
        browserApi.runtime.sendMessage({ type: 'HTTP_PLAYER_DATA', data: (e.data.data)["system"]}, function(response) {
            if (response && response.success) {
                console.log('Successfully updated player info (all)');
            } else {
                console.error('Failed to update player info (all)');
            }
        });
    }

    if (e.data.type === "INJ_READ_LOCAL_STORAGE") {
        const localStorageData = localStorage.getItem(e.data.data);
        window.postMessage({ type: "INJ_READ_LOCAL_STORAGE_RESPONSE", response: localStorageData }, "*");
    }

});