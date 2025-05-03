"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyEventReader = void 0;
const win_1 = require("./windows/win");
const events_1 = require("events");
const os_1 = __importDefault(require("os"));
let KeyEventReader = events_1.EventEmitter;
exports.KeyEventReader = KeyEventReader;
process.setMaxListeners(1000);
const supportedOS = ["Windows_NT"];
const CurrentOS = os_1.default.type();
if (CurrentOS == "Windows_NT") {
    exports.KeyEventReader = KeyEventReader = win_1.KeyEventReader;
}
else {
    console.log("Your OS is not supported by this package.");
    console.log("This package works on: ", supportedOS.toString());
}
