import { spawn } from "child_process";
import path from "path";

const KeyEvents = (KeyCode: number, action: string) => {
  // keycode // actions('UP','DOWN')
  let Actions = { UP: false, DOWN: false };

  // check actions
  if (action == "UP") {
    Actions.UP = true;
  } else if (action == "DOWN") {
    Actions.DOWN = true;
  } else {
    return 0;
  }

  // run windows keypress file to press up down keys
  const child = spawn(path.join(__dirname + "./KeyWriter.exe"), [], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  // read data of iexe file
  child.stdout.on("data", (data) => {
    // get exe response
    let reposne = data.toString();

    // check for options
    if (reposne.includes("Enter a option (0.Exit,1.KeyUp,2.KeyDown):")) {
      if (Actions.UP) {
        child.stdin.write("1\n");
      } else if (Actions.DOWN) {
        child.stdin.write("2\n");
      } else {
        child.stdin.write("0\n");
      }
    } else if (reposne.includes("Enter Key Code: ")) {
      setTimeout(() => {
        child.stdin.write(`${KeyCode}\n`);
        Actions = { UP: false, DOWN: false };
      }, 1000);
    } else {
      child.stdin.write("0\n");
    }
  });

  // Handle process exit when Ctrl+C is pressed on console
  process.on("SIGINT", () => {
    // console.log("kill");
    child.stdout.destroy();
    child.stdin.destroy();
  });

  // if any error occurs
  child.on("error", (message) => {
    // console.log(`error ${message}`);
    child.stdout.destroy();
    child.stdin.destroy();
  });
};

// hanlde key up
const KeyUpEvent = (KeyCode: number) => {
  KeyEvents(KeyCode, "UP");
};

// hanlde key down
const KeyDownEvent = (KeyCode: number) => {
  KeyEvents(KeyCode, "DOWN");
};

// hanlde key press
const KeyPressEvent = (KeyCode: number, TIMEOUT = 80) => {
  KeyDownEvent(KeyCode);
  setTimeout(() => {
    KeyUpEvent(KeyCode);
  }, TIMEOUT);
};

export { KeyUpEvent, KeyDownEvent, KeyPressEvent };
