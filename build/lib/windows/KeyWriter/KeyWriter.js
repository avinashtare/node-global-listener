"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const KeyWriterActions_1 = require("./KeyWriterActions");
const utils_1 = require("./utils");
class KeyboardHandler {
    constructor() {
        const supportedOS = ["Windows_NT"];
        const CurrentOS = os_1.default.type();
        if (CurrentOS != "Windows_NT") {
            console.log("Your OS is not supported by this package.");
            console.log("This package works on: ", supportedOS.toString());
        }
    }
    up(KeyName) {
        let KeyDetails = (0, utils_1.getKeyCode)(KeyName);
        if (KeyDetails.KeyCode == null)
            return;
        if (KeyDetails.Shift) {
            (0, KeyWriterActions_1.KeyUpEvent)(KeyDetails.KeyCode);
            (0, KeyWriterActions_1.KeyUpEvent)(160);
        }
        else {
            (0, KeyWriterActions_1.KeyUpEvent)(KeyDetails.KeyCode);
        }
    }
    down(KeyName) {
        let KeyDetails = (0, utils_1.getKeyCode)(KeyName);
        if (KeyDetails.KeyCode == null)
            return;
        if (KeyDetails.Shift) {
            (0, KeyWriterActions_1.KeyDownEvent)(160);
            (0, KeyWriterActions_1.KeyDownEvent)(KeyDetails.KeyCode);
            (0, KeyWriterActions_1.KeyUpEvent)(160);
        }
        else {
            (0, KeyWriterActions_1.KeyDownEvent)(KeyDetails.KeyCode);
        }
    }
    press(KeyName, TIMEOUT = 10) {
        let KeyDetails = (0, utils_1.getKeyCode)(KeyName);
        if (KeyDetails.KeyCode == null)
            return;
        if (KeyDetails.Shift) {
            (0, KeyWriterActions_1.KeyDownEvent)(160);
            (0, KeyWriterActions_1.KeyPressEvent)(KeyDetails.KeyCode, TIMEOUT);
            (0, KeyWriterActions_1.KeyUpEvent)(160);
        }
        else {
            (0, KeyWriterActions_1.KeyPressEvent)(KeyDetails.KeyCode, TIMEOUT);
        }
    }
    close() {
        (0, KeyWriterActions_1.closeKeyEvent)();
    }
}
exports.default = KeyboardHandler;
