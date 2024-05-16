const browserApi = typeof browser !== "undefined" ? browser : chrome;
import CryptoJS from '../libs/crypto-js.min';

export default class LocalStorageClass {
    constructor() {
        LocalStorageClass.#init(this);
        this.dataKey;
        this.sessionKey;
        this.sessionId;

        this.potentialSessions = [];
        this.tempSaveSlot;
        this.clientSessionId;
    }

    static #init($this) {
        // LocalStorageClass.#extensionSettingsListener($this);
        $this.dataKey = $this.getDataKey("data_");
        //$this.sessionKey = $this.getKey("sessionData");
        LocalStorageClass.#getExtensionSettings($this);
    }

    getDataKey(matchString) {
        const keys = Object.keys(localStorage);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key.includes(matchString)) {
                return key;
            }
        }
    }

    clearLocalSessionData() {
        const keys = Object.keys(localStorage);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key.includes("sessionData")) {
                localStorage.removeItem(key);
            }
        }
        console.log("LocalStorage Primed");
    }

    determineSession(){
        let $this = this;
        let slot = $this.tempSaveSlot.slot;
        let dataToMatch = $this.tempSaveSlot.slot;
        console.log($this.potentialSessions);
        for(let sI in $this.potentialSessions) {
            let curSessionKey = $this.potentialSessions[sI];
            console.log(curSessionKey);
            let curSessionData = curSessionKey.data;
            if (curSessionData == dataToMatch) {
                //return curSessionKey.key;
                $this.sessionKey = curSessionKey.key;
            }
            else{
                console.log("NO MATCH WITH SLOT: ", slot)
            }
        }
    }

    getPotentialSessionKeys(){
        const keys = Object.keys(localStorage);
        let potentialSessions = [];
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            console.log(key);
            if (key.includes("sessionData")) {
                let data = this.readLocalDataByKey(key);
                console.log(data);
                let potentialSettingsObject = {key: key, data: data}
                potentialSessions.push(potentialSettingsObject);
            }
        }

        this.potentialSessions = potentialSessions
        return potentialSessions;
    }

    // findSessionKeyFromSessionId(sessionId){
    //     let $this = this;
    //         for(let sI in $this.potentialSessions){
    //             let curSessionKey = $this.potentialSessions[sI];
    //             let curSession = $this.readLocalDataByKey(curSessionKey);
    //             console.log(curSession);
    //         }
    // }

    // getCookie(cName, callback) {
    //     const name = `${cName}=`;
    //
    //     browserApi.cookies.getAll({ name: "pokerogue_sessionId" }, function (cookies) {
    //         if (cookies.length > 0) {
    //             const cookie = cookies[0];
    //             const value = cookie.value;
    //
    //             if (value.charAt(0) === ' ') {
    //                 callback(value.substring(1));
    //             } else {
    //                 callback(value);
    //             }
    //         } else {
    //             callback('');
    //         }
    //     });
    // }

    printAllCookies() {
        browserApi.runtime.sendMessage({ action: 'printAllCookies' }, function (response) {
            console.log('All Cookies:', response);
        });
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
//         const keys = Object.keys(localStorage);
//
// // Print the keys
//         console.log("localStorage Keys:");
//         keys.forEach((key) => {
//             console.log(key);
//         });
//         let sessionInfo = this.getCookie("pokerogue_sessionId", (data) => {
//             return JSON.parse(data);
//         });
//
//         console.log(sessionInfo);
        //this.printAllCookies();

        let data = this.getPotentialSessionKeys();
        this.sessionKey = (data[0]).key;
        //console.log(this.sessionKey);
        //this.sessionKey = "sessionData2_ProSnow"
        const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
        let localStorageData = localStorage.getItem(this.sessionKey);
        const decryptedString = CryptoJS.AES.decrypt(localStorageData, saveKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString);
    }

    setSessionData(sessionData) {
        //hard set
        const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
        const jsonString = JSON.stringify(sessionData);
        const encryptedString = CryptoJS.AES.encrypt(jsonString, saveKey).toString();
        localStorage.setItem(this.sessionKey, encryptedString);
    }

    getPlayerData(){
        const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
        let localStorageData = localStorage.getItem(this.dataKey);
        const decryptedString = CryptoJS.AES.decrypt(localStorageData, saveKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString);
    }

    readLocalDataByKey(key){
        const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
        let localStorageData = localStorage.getItem(key);
        const decryptedString = CryptoJS.AES.decrypt(localStorageData, saveKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString);
    }

    setPlayerData(playerData) {
        const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
        const jsonString = JSON.stringify(playerData);
        const encryptedString = CryptoJS.AES.encrypt(jsonString, saveKey).toString();
        localStorage.setItem(this.dataKey, encryptedString);
    }
}


