import { KeyEventReader } from "./index";
import { KeyData } from "./lib/windows/keyReader/types";

// Register an event listener
const keyEvent = new KeyEventReader();

// read key down event
keyEvent.on("keyDown", (keyData: KeyData) => {
  console.log(keyData);
});

// read key downUp event
// keyEvent.on("keyUp", (keyData: KeyData) => {
//   console.log(keyData);
// });
