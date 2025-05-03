"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardWriter = exports.KeyEventReader = void 0;
const lib_1 = require("./lib/lib");
Object.defineProperty(exports, "KeyEventReader", { enumerable: true, get: function () { return lib_1.KeyEventReader; } });
const KeyWriter_1 = __importDefault(require("./lib/windows/KeyWriter/KeyWriter"));
exports.KeyboardWriter = KeyWriter_1.default;
