import { KeyEventReader } from "./index";
import { KeyData } from "./lib/windows/keyReader/types";

// Register an event listener
const keyEvent = new KeyEventReader();

// Handle Key Down
// keyEvent.on("keyDown", (keyData: KeyData) => {
//   console.log(`KeyDown: `, keyData.key);
// });

// Handle Key Up
// keyEvent.on("keyUp", (keyData: KeyData) => {
//   console.log(`KeyUp: `, keyData.key);
// });

// Handle Key Press
// keyEvent.on("keyPress", (keyData: KeyData) => {
//   console.log(`KeyUp: `, keyData.key);
// });
