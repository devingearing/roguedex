const browserApi = typeof browser !== "undefined" ? browser : chrome; // eslint-disable-line no-unused-vars

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchFusionImageHtml") {
        const { fusionId, pokemonId } = request;

        fetch(`https://if.daena.me/find/?head=${fusionId}&body=${pokemonId}`)
            .then(response => response.text())
            .then(html => {
                sendResponse({ success: true, html });
            })
            .catch(error => {
                console.error('Error fetching fusion image HTML:', error);
                sendResponse({ success: false, error });
            });

        return true; // Will respond asynchronously
    } else if (request.action === "showOptions") {
        // solution #1
        chrome.windows.create({ url: chrome.runtime.getURL("options/options.html"), type: "popup", height : 800, width : 710 });
    } else if (request.action === "fetchImage") {
        fetch(request.url)
            .then(response => response.blob())
            .then(blob => {
                const reader = new window.FileReader();
                reader.onloadend = () => {
                    sendResponse({ success: true, dataUrl: reader.result });
                };
                reader.onerror = () => {
                    sendResponse({ success: false, error: 'Failed to read blob' });
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                sendResponse({ success: false, error });
            });

        return true; // Will respond asynchronously
    }
});

