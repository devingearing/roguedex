const browserApi = typeof browser !== "undefined" ? browser : chrome;
import CryptoJS from '../libs/crypto-js.min';

export default class LocalStorageClass {
    constructor() {
        LocalStorageClass.#init(this);
    }

    static #init($this) {
        // LocalStorageClass.#extensionSettingsListener($this);
        LocalStorageClass.#getExtensionSettings($this);
    }

    static async #getExtensionSettings($this) {
        return new Promise((resolve) => {
            browserApi.storage.sync.get(['showMinified', 'scaleFactor', 'showItems'], (data) => {
                if (data.showMinified === undefined) {
                    browserApi.storage.sync.set({ 'showMinified': false });
                    data.showMinified = false;
                }
                if (data.scaleFactor === undefined) {
                    browserApi.storage.sync.set({ 'scaleFactor': 1 });
                    data.scaleFactor = 1;
                }
                if (data.showItems === undefined) {
                    browserApi.storage.sync.set({ 'showItems': {'enemies': true, 'party': true} });
                    data.showItems = {'enemies': true, 'party': true};
                }
                resolve(data);
            });
        });
    }

    // static #extensionSettingsListener($this) {
    //     browserApi.storage.onChanged.addListener(function (changes, namespace) {
    //         for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
    //             if (key === 'showMinified') {
    //                 console.log('showMinified changed from' + oldValue + 'to' + newValue);
    //                 //$this.showMinified = newValue;
    //             }
    //             if (key === 'scaleFactor') {
    //                 console.log('scaleFactor changed from' + oldValue + 'to' + newValue);
    //                 //$this.scaleFactor = newValue;
    //             }
    //             if (key === 'showItems') {
    //                 console.log('showItems changed from' + oldValue + 'to' + newValue);
    //                 //$this.showItems = newValue;
    //             }
    //         }
    //     });
    // }

    async getExtensionSettings(){
        return await LocalStorageClass.#getExtensionSettings(this);
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

    getPlayerData(){
        const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
        let localStorageData = localStorage.getItem("data");
        const decryptedString = CryptoJS.AES.decrypt(localStorageData, saveKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString);
    }

    setPlayerData(playerData) {
        console.log("Hit playerData");
        const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
        const jsonString = JSON.stringify(playerData);
        const encryptedString = CryptoJS.AES.encrypt(jsonString, saveKey).toString();
        localStorage.setItem("data", encryptedString);
    }
}


