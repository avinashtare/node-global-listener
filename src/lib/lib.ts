import { KeyEventReader as WinKeyEvent } from "./windows/win";
import { EventEmitter } from "events";
import os from "os";

let KeyEventReader: any = EventEmitter;

// Supported OS (use the correct value for Windows, which is 'Windows_NT')
const supportedOS = ["Windows_NT"];

// Get current OS
const CurrentOS = os.type();

if (CurrentOS == "Windows_NT") {
  // If the current OS is supported, assign KeyEventReader to WinKeyEvent
  KeyEventReader = WinKeyEvent;
} else {
  // If the current OS is not supported, log the appropriate message
  console.log("Your OS is not supported by this package.");
  console.log("This package works on: ", supportedOS.toString());
}
export { KeyEventReader };
