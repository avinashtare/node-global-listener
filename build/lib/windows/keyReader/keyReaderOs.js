"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const events_1 = require("events");
const path_1 = __importDefault(require("path"));
const windowsKeyMaps_1 = require("../constant/windowsKeyMaps");
class KeyEventReader extends events_1.EventEmitter {
    constructor() {
        super();
        const child = (0, child_process_1.spawn)(path_1.default.join(__dirname + "/../bin/keyReader.exe"), [], {
            stdio: ["pipe", "pipe", "pipe"],
        });
        child.stdout.on("data", (data) => {
            const keyData = data.toString().trim().split(",");
            const fillterKeyData = this.fillterKeyData(keyData);
            this.emmitEvents(fillterKeyData);
        });
        process.on("SIGINT", () => {
            child.stdout.destroy();
            process.exit(0);
        });
        child.on("error", (message) => {
            console.log(`error ${message}`);
        });
    }
    fillterKeyData(keysData) {
        let keyFillterData = {
            KeyCode: 0,
            KeyUp: false,
            KeyDown: false,
            Shift: false,
            CapsLock: false,
            Control: false,
            key: "",
        };
        keysData.forEach((e) => {
            let [key, value] = e.split(": ");
            value = parseInt(value);
            key = key.trim();
            if (key != "KeyCode") {
                value == 1 ? (value = true) : (value = false);
            }
            switch (key) {
                case "KeyCode":
                    keyFillterData.KeyCode = value;
                    break;
                case "KeyUp":
                    keyFillterData.KeyUp = value;
                    break;
                case "KeyDown":
                    keyFillterData.KeyDown = value;
                    break;
                case "Control":
                    keyFillterData.Control = value;
                    break;
                case "Shift":
                    keyFillterData.Shift = value;
                    break;
                case "CapsLock":
                    keyFillterData.CapsLock = value;
                    break;
            }
        });
        let key = null;
        try {
            key = windowsKeyMaps_1.keyMap[keyFillterData.KeyCode];
        }
        catch (error) { }
        if ((keyFillterData.KeyCode >= 48 &&
            keyFillterData.KeyCode <= 57 &&
            keyFillterData.Shift) ||
            (keyFillterData.KeyCode >= 186 &&
                keyFillterData.KeyCode <= 222 &&
                keyFillterData.Shift) ||
            (keyFillterData.KeyCode >= 65 &&
                keyFillterData.KeyCode <= 90 &&
                keyFillterData.Shift)) {
            key = windowsKeyMaps_1.keyMap[keyFillterData.KeyCode].shift;
        }
        else if ((keyFillterData.KeyCode >= 48 &&
            keyFillterData.KeyCode <= 57 &&
            !keyFillterData.Shift) ||
            (keyFillterData.KeyCode >= 186 &&
                keyFillterData.KeyCode <= 222 &&
                !keyFillterData.Shift) ||
            (keyFillterData.KeyCode >= 65 &&
                keyFillterData.KeyCode <= 90 &&
                !keyFillterData.Shift)) {
            key = windowsKeyMaps_1.keyMap[keyFillterData.KeyCode].normal;
        }
        if (keyFillterData.KeyCode >= 65 &&
            keyFillterData.KeyCode <= 90 &&
            keyFillterData.CapsLock) {
            key = windowsKeyMaps_1.keyMap[keyFillterData.KeyCode].shift;
        }
        keyFillterData.key = key;
        return keyFillterData;
    }
    emmitEvents(KeyData) {
        if (KeyData.KeyUp) {
            this.emit("keyUp", KeyData);
        }
        else if (KeyData.KeyDown) {
            this.emit("keyDown", KeyData);
        }
        if (KeyData.KeyDown) {
            if ((KeyData.KeyCode >= 48 && KeyData.KeyCode <= 57) ||
                (KeyData.KeyCode >= 186 && KeyData.KeyCode <= 222) ||
                (KeyData.KeyCode >= 65 && KeyData.KeyCode <= 90)) {
                this.emit("keyPress", KeyData);
            }
        }
    }
}
exports.default = KeyEventReader;
