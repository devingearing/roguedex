const browserApi = typeof browser !== "undefined" ? browser : chrome;

function sendMessage(data, message) {
    browserApi.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs);
        browserApi.tabs.sendMessage(tabs[0].id, { type: message, data: data}, (response) => {
            if (response && response.success) {
                console.log('Session Data Sent Successfully');
            } else {
                console.error('Failed to sent Session Data');
            }
        });
    });
}



function convertPokemonId(pokemonId) {
  const conversionList = {
    2019: 10091,
    2020: 10092,
    2026: 10100,
    2027: 10101,
    2028: 10102,
    2037: 10103,
    2038: 10104,
    2050: 10105,
    2051: 10106,
    2052: 10107,
    2053: 10108,
    2074: 10109,
    2075: 10110,
    2076: 10111,
    2088: 10112,
    2089: 10113,
    2103: 10114,
    2105: 10115,
    2670: 10061,
    4052: 10162,
    4077: 10163,
    4078: 10164,
    4079: 10165,
    4080: 10166,
    4083: 10167,
    4110: 10168,
    4122: 10169,
    4144: 10170,
    4145: 10171,
    4146: 10172,
    4199: 10173,
    4222: 10174,
    4263: 10175,
    4264: 10176,
    4554: 10177,
    4555: 10178,
    4562: 10179,
    4618: 10180,
    6058: 10229,
    6059: 10230,
    6100: 10231,
    6101: 10232,
    6157: 10233,
    6211: 10234,
    6215: 10235,
    6503: 10236,
    6549: 10237,
    6570: 10238,
    6571: 10239,
    6628: 10240,
    6705: 10241,
    6706: 10242,
    6713: 10243,
    6724: 10244,
    8128: 10252,
    8194: 10253,
    8901: 10272
  }
  if (pokemonId in conversionList) {
    return conversionList[pokemonId]
  } else {
    return pokemonId
  }
}

browserApi.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if(request.type === "HTTP_SESSION_DATA"){
        sendMessage({data: request.data, type: 'HTTP_SESSION_DATA'});
    }
    if(request.type === "HTTP_PLAYER_DATA") {
        console.log("Hit HTTP_STATS_DATA");
        sendMessage({data: request.data, type: 'HTTP_PLAYER_DATA'});
    }
});

browserApi.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.method === 'POST') {
            try {
                let sessionData = JSON.parse(new TextDecoder().decode(details.requestBody.raw[0].bytes))
                console.log("POST Session data:", sessionData)
                //if (details.url.includes("updateall")) sessionData = sessionData.session
                sendMessage({data: JSON.parse(sessionData), type: 'HTTP_SESSION_DATA'});
            } catch (e) {
                console.error("Error while intercepting web request: ", e)
            }
        }
    },
    {
        urls: ['https://api.pokerogue.net/savedata/update?datatype=1*']
    },
    ["requestBody"]
);
browserApi.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.method === 'POST') {
            try {
                let sessionData = JSON.parse(new TextDecoder().decode(details.requestBody.raw[0].bytes))
                console.log("POST Player data:", sessionData)
                sendMessage({data: JSON.parse(sessionData), type: 'HTTP_PLAYER_DATA'});
            } catch (e) {
                console.error("Error while intercepting web request: ", e)
            }
        }
    },
    {
        urls: ['https://api.pokerogue.net/savedata/update?datatype=0*']
    },
    ["requestBody"]
);
browserApi.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.method === 'POST') {
            try {
                let sessionData = JSON.parse(new TextDecoder().decode(details.requestBody.raw[0].bytes))
                console.log("POST Update data:", sessionData)
                //if (details.url.includes("updateall")) sessionData = sessionData.session
                sendMessage({data: JSON.parse(sessionData.session), type: 'HTTP_SESSION_DATA'});
                sendMessage({data: JSON.parse(sessionData.system), type: 'HTTP_PLAYER_DATA'});
            } catch (e) {
                console.error("Error while intercepting web request: ", e)
            }
        }
    },
    {
        urls: ['https://api.pokerogue.net/savedata/updateall']
    },
    ["requestBody"]
)


// browserApi.webRequest.onBeforeSendHeaders.addListener(
//     function(details) {
//         if (details.url.includes('api.pokerogue.net/savedata/get?datatype=0')) {
//             const requestBody = new TextDecoder("utf-8").decode(details.requestBody.raw[0].bytes);
//             window.postMessage({ type: 'HTTP_PLAYER_DATA', data: JSON.parse(requestBody) }, '*');
//         }
//         return { requestHeaders: details.requestHeaders };
//     },
//     { urls: ['*://api.pokerogue.net/*'] },
//     ['requestBody', 'requestHeaders', 'extraHeaders']
// );