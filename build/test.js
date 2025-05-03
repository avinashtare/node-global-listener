"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
console.log("** Program Started **");
const keyEvent = new index_1.KeyEventReader();
keyEvent.on("keyUp", (keyData) => {
    console.log(`KeyUp: `, keyData.key);
});
const Keys = new index_1.KeyboardWriter();
Keys.press("A");
Keys.down("b");
