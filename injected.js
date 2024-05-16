// Intercept XMLHttpRequest
(function (xhr) {
    var XHR = XMLHttpRequest.prototype;
    var open = XHR.open;
    var send = XHR.send;

    XHR.open = function (method, url) {
        this._method = method;
        this._url = url;
        return open.apply(this, arguments);
    };

    XHR.send = function (postData) {
        this.addEventListener('load', function () {
            if (this.responseType === '' || this.responseType === 'text') {
                window.postMessage({ type: 'XHR_RESPONSE', url: this._url, body: this.responseText }, '*');
            }
        });
        return send.apply(this, arguments);
    };
})(XMLHttpRequest);

// Intercept fetch API calls
const { fetch: origFetch } = window;
window.fetch = async (...args) => {
    args[1] = { ...args[1], mode: 'cors' };
    const response = await origFetch(...args);
    const url = response.url;
    const request = args[1];

    if (url.includes('api.pokerogue.net/savedata/get?datatype=1')) {
        response.clone().json().then(data => {
            window.postMessage({type: 'GET_SAVEDATA', data: data}, '*');
        }).catch(err => console.error(err));
    } else if (url.includes('api.pokerogue.net/savedata/updateall')) {
        window.postMessage({type: 'UPDATE_ALL', data: JSON.parse(request.body)}, '*');
    } else if (url.includes('api.pokerogue.net/savedata/get?datatype=0')) {
        response.clone().json().then(data => {
            window.postMessage({type: 'GET_PLAYER_DATA', data: data}, '*');
        }).catch(err => console.error(err));
    } else if (url.includes('api.pokerogue.net/savedata/system/verify')) {
        window.postMessage({type: 'GET_VERIFY', data: JSON.parse(request.body)}, '*');
    } else if (url.includes('api.pokerogue.net/savedata/session?slot')) {
        const dataSlot = new URL(url).searchParams.get('slot');
        try {
            const data = await response.clone().json();
            window.postMessage({type: 'GET_SESSION', data: {slot: dataSlot, data: data}}, '*');
        } catch (err) {
            console.error(err);
        }
    }

    return response;
};

// Listen for messages from the content script and forward them to the background script
window.addEventListener('message', function(event) {
    if (event.source !== window) return;

    if (event.data.type === 'FETCH_RESPONSE' || event.data.type === 'XHR_RESPONSE' || event.data.type === 'GET_SAVEDATA' || event.data.type === 'UPDATE_ALL' || event.data.type === 'GET_PLAYER_DATA' || event.data.type === 'GET_VERIFY' || event.data.type === 'GET_SESSION') {
        browserApi.runtime.sendMessage({type: event.data.type, data: event.data.data, url: event.data.url});
    }
});
