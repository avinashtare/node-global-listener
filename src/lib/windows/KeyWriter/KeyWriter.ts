import os from "os";
import { KeyName } from "../constant/windowsKeyMaps";
import {
  KeyDownEvent,
  KeyUpEvent,
  KeyPressEvent,
  closeKeyEvent,
} from "./KeyWriterActions";
import { getKeyCode } from "./utils";

class KeyboardHandler {
  constructor() {
    const supportedOS = ["Windows_NT"];

    // Get current OS
    const CurrentOS = os.type();
    if (CurrentOS != "Windows_NT") {
      // If the current OS is not supported, log the appropriate message
      console.log("Your OS is not supported by this package.");
      console.log("This package works on: ", supportedOS.toString());
    }
  }
  // Handle key up
  up(KeyName: KeyName): void {
    let KeyDetails = getKeyCode(KeyName);
    if (KeyDetails.KeyCode == null) return;
    if (KeyDetails.Shift) {
      KeyUpEvent(KeyDetails.KeyCode);
      KeyUpEvent(160);
    } else {
      KeyUpEvent(KeyDetails.KeyCode);
    }
  }

  // Handle key down
  down(KeyName: KeyName): void {
    let KeyDetails = getKeyCode(KeyName);
    if (KeyDetails.KeyCode == null) return;
    if (KeyDetails.Shift) {
      KeyDownEvent(160);
      KeyDownEvent(KeyDetails.KeyCode);
      KeyUpEvent(160);
    } else {
      KeyDownEvent(KeyDetails.KeyCode);
    }
  }

  // Handle key press
  press(KeyName: KeyName, TIMEOUT = 10): void {
    let KeyDetails = getKeyCode(KeyName);
    if (KeyDetails.KeyCode == null) return;
    if (KeyDetails.Shift) {
      KeyDownEvent(160);
      KeyPressEvent(KeyDetails.KeyCode, TIMEOUT);
      KeyUpEvent(160);
    } else {
      KeyPressEvent(KeyDetails.KeyCode, TIMEOUT);
    }
  }

  close() {
    closeKeyEvent();
  }
}

export default KeyboardHandler;
