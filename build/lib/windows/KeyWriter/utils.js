"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyCode = void 0;
const windowsKeyMaps_1 = require("../constant/windowsKeyMaps");
const getKeyCode = (findKey) => {
    if (findKey == " ")
        findKey = "Space";
    let FindCodes = {
        KeyCode: null,
        Shift: false,
    };
    for (const [key, value] of Object.entries(windowsKeyMaps_1.keyMap)) {
        if (typeof value == "object") {
            for (const [k1, value_2] of Object.entries(Object(value))) {
                if (value_2 == findKey) {
                    FindCodes.KeyCode = parseInt(key);
                    if (k1 == "shift")
                        FindCodes.Shift = true;
                    break;
                }
            }
        }
        else if (value == findKey) {
            FindCodes.KeyCode = parseInt(key);
            break;
        }
    }
    return FindCodes;
};
exports.getKeyCode = getKeyCode;
