// This is a hack because in background.js we cannot read web request response's body.
// When we need to do that, we intercept the web request here, and send a message to background.js with the response data, elaborate there and send back to content.js
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
        //console.log('injected script xhr request:', this._method, this._url, this.getAllResponseHeaders(), postData);
        this.addEventListener('load', function () {
            //window.postMessage({ type: 'xhr', data: this.response }, '*');  // send to content script
        });
        return send.apply(this, arguments);
    };
})(XMLHttpRequest);



const { fetch: origFetch } = window;
window.fetch = async (...args) => {
    args[1] = { ...args[1], mode: 'cors' };
    const response = await origFetch(...args);
    const url = response.url;
    const request = args[1];
    if (url.includes('api.pokerogue.net/savedata/get?datatype=1')) {
        response
            .clone()
            .json()
            .then(data => {
                window.postMessage({type: 'GET_SAVEDATA', data: data}, '*');
            })
            .catch(err => console.error(err));
    }
    else if (url.includes('api.pokerogue.net/savedata/updateall')) {
        window.postMessage({type: 'UPDATE_ALL', data: JSON.parse(request.body)}, '*');
    }
    else if(url.includes('api.pokerogue.net/savedata/get?datatype=0')) {
        response
            .clone()
            .json()
            .then(data => {
                window.postMessage({ type: 'GET_SAVEDATA_2', data: data, extra: request }, '*');
            })
            .catch(err => console.error(err));
    }
    else {
        return response;
    }

    return response;
};