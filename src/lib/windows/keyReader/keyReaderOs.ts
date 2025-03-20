import { spawn } from "child_process";
import { EventEmitter } from "events";
import path from "path";
import WinkeyMap from "../constant/windowsKeyMaps";
import { KeyData } from "./types";

// creating custom event
class KeyEventReader extends EventEmitter {
  constructor() {
    super();

    // run windows ihook file to get keys
    const child = spawn(path.join(__dirname + "/../bin/keyReader.exe"), [], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    // read data of ihook file
    child.stdout.on("data", (data: Buffer) => {
      const keyData: string[] = data.toString().trim().split(",");

      // fillter key
      const fillterKeyData = this.fillterKeyData(keyData);

      // handle key emmits
      this.emmitEvents(fillterKeyData);
    });

    // Handle process exit when Ctrl+C is pressed on console
    process.on("SIGINT", () => {
      //   console.log("kill");

      child.stdout.destroy();
      process.exit(0);
    });

    // if any error occurs
    child.on("error", (message: any) => {
      console.log(`error ${message}`);
    });
  }

  private fillterKeyData(keysData: string[]) {
    // object of data
    let keyFillterData: KeyData = {
      KeyCode: 0,
      KeyUp: false,
      KeyDown: false,
      Shift: false,
      CapsLock: false,
      Control: false,
      key: "",
    };

    // filter the string into obj
    keysData.forEach((e) => {
      let [key, value]: any = e.split(": ");
      value = parseInt(value);
      key = key.trim();

      if (key != "KeyCode") {
        value == 1 ? (value = true) : (value = false);
      }

      switch (key) {
        case "KeyCode":
          keyFillterData.KeyCode = value;
          break;
        case "KeyUp":
          keyFillterData.KeyUp = value;
          break;
        case "KeyDown":
          keyFillterData.KeyDown = value;
          break;
        case "Control":
          keyFillterData.Control = value;
          break;
        case "Shift":
          keyFillterData.Shift = value;

          break;
        case "CapsLock":
          keyFillterData.CapsLock = value;
          break;
      }
    });

    // get key values
    let key = null;
    // fist find deafult value if available
    try {
      key = WinkeyMap[keyFillterData.KeyCode];
    } catch (error) {}

    // mapping for caps lock
    if (
      // number mapping
      (keyFillterData.KeyCode >= 48 &&
        keyFillterData.KeyCode <= 57 &&
        keyFillterData.Shift) ||
      // Punctuation & special mapping
      (keyFillterData.KeyCode >= 186 &&
        keyFillterData.KeyCode <= 222 &&
        keyFillterData.Shift) ||
      // Alphabet mapping
      (keyFillterData.KeyCode >= 65 &&
        keyFillterData.KeyCode <= 90 &&
        keyFillterData.Shift)
    ) {
      key = WinkeyMap[keyFillterData.KeyCode].shift;
    } else if (
      // number mapping
      (keyFillterData.KeyCode >= 48 &&
        keyFillterData.KeyCode <= 57 &&
        !keyFillterData.Shift) ||
      // Punctuation & special mapping
      (keyFillterData.KeyCode >= 186 &&
        keyFillterData.KeyCode <= 222 &&
        !keyFillterData.Shift) ||
      // Alphabet mapping
      (keyFillterData.KeyCode >= 65 &&
        keyFillterData.KeyCode <= 90 &&
        !keyFillterData.Shift)
    ) {
      key = WinkeyMap[keyFillterData.KeyCode].normal;
    }

    // key set only for CapsLock
    if (
      // Alphabet mapping
      keyFillterData.KeyCode >= 65 &&
      keyFillterData.KeyCode <= 90 &&
      keyFillterData.CapsLock
    ) {
      key = WinkeyMap[keyFillterData.KeyCode].shift;
    }
    // set value in object
    keyFillterData.key = key;
    return keyFillterData;
  }

  // emmit events
  private emmitEvents(KeyData: KeyData) {
    // handle keydown up
    if (KeyData.KeyUp) {
      this.emit("keyUp", KeyData);
    }
    // handle keydown emmit
    else if (KeyData.KeyDown) {
      this.emit("keyDown", KeyData);
    }

    // handle key press
    if (KeyData.KeyDown) {
      // filter number alphabet & punctuations & spacial key
      if (
        // number mapping
        (KeyData.KeyCode >= 48 && KeyData.KeyCode <= 57) ||
        // Punctuation & special mapping
        (KeyData.KeyCode >= 186 && KeyData.KeyCode <= 222) ||
        // Alphabet mapping
        (KeyData.KeyCode >= 65 && KeyData.KeyCode <= 90)
      ) {
        // console.log("Key 1: " + KeyData.key);
        this.emit("keyPress", KeyData);
      }
    }
  }
}

export default KeyEventReader;
