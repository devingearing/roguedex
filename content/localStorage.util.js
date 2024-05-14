const browserApi = typeof browser !== "undefined" ? browser : chrome;
import CryptoJS from '../libs/crypto-js.min';

export default class LocalStorageClass {
    constructor() {
        this.ext_settings = LocalStorageClass.#getExtensionSettings();

        LocalStorageClass.#init(this);
    }

    static #init($this) {
        LocalStorageClass.#extensionSettingsListener($this);
    }

    static #getExtensionSettings($this) {
        browserApi.storage.sync.get(['showMinified', 'scaleFactor', 'showItems'], (data) => {
            if (data.showMinified === undefined) {
                browserApi.storage.sync.set({
                    'showMinified': false
                });
            }
            if (data.scaleFactor === undefined) {
                browserApi.storage.sync.set({
                    'scaleFactor': 1
                });
            }
            if (data.showItems === undefined) {
                browserApi.storage.sync.set({
                    'showItems': {'enemies': true, 'party': true}
                });
            }
        });
    }

    static #extensionSettingsListener($this) {
        browserApi.storage.onChanged.addListener(function (changes, namespace) {
            for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
                if (key === 'showMinified') {
                    console.log('showMinified changed from' + oldValue + 'to' + newValue);
                    //$this.showMinified = newValue;
                }
                if (key === 'scaleFactor') {
                    console.log('scaleFactor changed from' + oldValue + 'to' + newValue);
                    //$this.scaleFactor = newValue;
                }
                if (key === 'showItems') {
                    console.log('showItems changed from' + oldValue + 'to' + newValue);
                    //$this.showItems = newValue;
                }
            }
        });
    }

    getSessionData(){
        const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
        let localStorageData = localStorage.getItem("sessionData");
        const decryptedString = CryptoJS.AES.decrypt(localStorageData, saveKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString);
    }

    setSessionData(sessionData) {
        const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
        const jsonString = JSON.stringify(sessionData);
        const encryptedString = CryptoJS.AES.encrypt(jsonString, saveKey).toString();
        localStorage.setItem("sessionData", encryptedString);
    }
}


