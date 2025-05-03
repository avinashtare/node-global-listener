"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardHandler = exports.KeyEventReader = void 0;
const keyReaderOs_1 = __importDefault(require("./keyReader/keyReaderOs"));
exports.KeyEventReader = keyReaderOs_1.default;
const KeyWriter_1 = __importDefault(require("./KeyWriter/KeyWriter"));
exports.KeyboardHandler = KeyWriter_1.default;
