const browserApi = typeof browser !== "undefined" ? browser : chrome;
const scaleSlider = document.getElementById('scaleSlider');
const scaleValue = document.getElementById('scaleValue');
const extensionId = browserApi.runtime.id;

function scaleElements() {
    const manualScaleFactor = (scaleSlider.value);
    const enemiesDiv = document.getElementById('enemies');
    const alliesDiv = document.getElementById('allies');
    scaleValue.textContent = manualScaleFactor;
}

const saveOptions = () => {
    const showMin = document.getElementById('show-minified').checked;
    const showEnemy = document.getElementById('show-enemies').checked;
    const showParty = document.getElementById('show-party').checked;
    const scaleFactor = (scaleSlider.value);

    browserApi.storage.sync.set({
        'showMinified': showMin,
        'scaleFactor': scaleFactor,
        'showItems': {
            'enemies': showEnemy,
            'party': showParty
        }
    }, () => {
        if (browserApi.runtime.lastError) {
            console.error('Error saving options:', browserApi.runtime.lastError);
        } else {
            console.log('Options saved successfully');
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    });
};

const restoreOptions = () => {
    browserApi.storage.sync.get(['showMinified', 'scaleFactor', 'showItems'], (data) => {
        if (browserApi.runtime.lastError) {
            console.error('Error retrieving options:', browserApi.runtime.lastError);
        } else {
            console.log('Options retrieved:', data);
            const showMinified = data.showMinified;
            const showItems = data.showItems || {};
            const showEnemies = showItems.enemies || false;
            const showParty = showItems.party || false;
            const scaleFactor = data.scaleFactor || 16;

            document.getElementById('show-minified').checked = showMinified;
            document.getElementById('show-enemies').checked = showEnemies;
            document.getElementById('show-party').checked = showParty;
            scaleSlider.value = scaleFactor;
            scaleValue.textContent = scaleFactor;

            scaleElements();
        }
    });
};

function injectImages(){
    let bodyEle = document.getElementById('mainBody');
    //bodyEle.style.background
}

document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    injectImages();
    scaleSlider.addEventListener('input', scaleElements);
    document.getElementById('save').addEventListener('click', saveOptions);
});
