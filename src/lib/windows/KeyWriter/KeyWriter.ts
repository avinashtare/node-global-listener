import { KeyDownEvent, KeyUpEvent, KeyPressEvent } from "./KeyWriterActions";
import { getKeyCode } from "./utils";

class KeyboardHandler {
  // Handle key up
  KeyUp(KeyName: string): void {
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
  KeyDown(KeyName: string): void {
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
  KeyPress(KeyName: string, TIMEOUT = 80): void {
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
}

export default KeyboardHandler;
