import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import path from "path";
import Queue from "../../utils/Queue";

type KeyActionType = {
  UP: boolean;
  DOWN: boolean;
};
type KeyCodeType = number;

interface KeyEventType {
  Actions: KeyActionType;
  KeyCode: KeyCodeType;
}
class KeyController {
  private executableWindowKeyAPI: ChildProcessWithoutNullStreams | null = null;
  private KeysQueue = new Queue<KeyEventType>();
  private KeyCode: KeyCodeType = -1;
  private exePath: string = path.join(__dirname + "./KeysWriter.exe");

  constructor() {}

  runExecutable() {
    // executable for native window api keyevent
    this.executableWindowKeyAPI = spawn(this.exePath, [], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    // read data of exe file
    this.executableWindowKeyAPI.stdout.on("data", (data) => {
      // get exe response
      let response = data.toString();

      // handle exe outputs
      this.handleExecutableOutput(response);
    });

    // kill Ctrl+c and some error occured
    this.killAndErrorHandlers();
  }

  handleExecutableOutput(response: string) {
    // check for options
    if (
      response.includes("Enter a option (0.Exit,1.KeyUp,2.KeyDown):") ||
      response.includes("Check Queue")
    ) {
      // get keysdata from queue
      const CurrentKeyEventData: KeyEventType | null | undefined =
        this.KeysQueue.dequeue();

      if (CurrentKeyEventData && this.executableWindowKeyAPI) {
        this.KeyCode = CurrentKeyEventData.KeyCode;

        // check event
        if (CurrentKeyEventData.Actions.UP) {
          this.executableWindowKeyAPI.stdin.write("1\n");
        } else if (CurrentKeyEventData.Actions.DOWN) {
          this.executableWindowKeyAPI.stdin.write("2\n");
        }
      }
      // waiting for keys
      else {
        if (this.KeysQueue.size() > 0) {
          this.handleExecutableOutput("Check Queue");
        } else {
          let waitingInterval = setInterval(() => {
            if (this.KeysQueue.size() > 0) {
              clearInterval(waitingInterval);

              // call it's self to clear the queue remaing event
              this.handleExecutableOutput("Check Queue");
            }
          }, 300);
          // Ctrl + c exit in interval
          process.on("SIGINT", () => {
            clearInterval(waitingInterval);
          });
        }
      }
    }

    // write key  you want to press
    else if (
      response.includes("Enter Key Code: ") &&
      this.executableWindowKeyAPI
    ) {
      if (this.KeyCode > 0) {
        this.executableWindowKeyAPI.stdin.write(`${this.KeyCode}\n`);
        this.KeyCode = -1;
      }
    }
  }

  isRunning() {
    // exitCode is null while the process is running,
    return (
      this.executableWindowKeyAPI &&
      this.executableWindowKeyAPI.exitCode === null
    );
  }

  killAndErrorHandlers() {
    // Handle process exit when Ctrl+C is pressed on console
    process.on("SIGINT", () => {
      if (this.executableWindowKeyAPI) {
        this.executableWindowKeyAPI.stdin.destroy();
        this.executableWindowKeyAPI.stdin.destroy();
      }
    });

    // if any error occurs or exit
    if (this.executableWindowKeyAPI) {
      // detect exit (both normal & crashes)
      this.executableWindowKeyAPI.on("exit", (code, signal) => {
        if (signal) {
          console.error(`KeyWriter was killed by signal: ${signal}`);
          process.exit();
        } else {
          // console.log("Child exited cleanly (code 0).");
        }
      });

      this.executableWindowKeyAPI.on("error", (err: NodeJS.ErrnoException) => {
        // if exe not exist
        if (err.code == "ENOENT") {
          console.error(`Executable not found at ${err.message}`);
          process.exit();
        } else if (err.code === "EACCES") {
          console.error(` No permission to execute`);
        }

        if (!this.isRunning && this.executableWindowKeyAPI) {
          // other error
          console.log(`error ${err}`);
          this.executableWindowKeyAPI.stdout.destroy();

          // respwin if process is not running or error is occured
          this.executableWindowKeyAPI = null;
          // Try again after delay
          setTimeout(() => this.runExecutable(), 3000);
        }
      });
    }
  }

  close() {
    this.executableWindowKeyAPI?.kill();
  }

  execute(KeyCode: KeyCodeType, KeyAction: string) {
    if (typeof KeyCode != "number") return;

    let Actions: KeyActionType = { UP: false, DOWN: false };
    // check key action
    if (KeyAction == "UP") {
      Actions.UP = true;
    } else if (KeyAction == "DOWN") {
      Actions.DOWN = true;
    }

    // add key in queue
    this.KeysQueue.enqueue({ Actions, KeyCode });

    if (!this.executableWindowKeyAPI) {
      // start exe
      this.runExecutable();
    }
  }
}

// init instance
const KeyEvents = new KeyController();

// hanlde key up
const KeyUpEvent = (KeyCode: KeyCodeType) => {
  KeyEvents.execute(KeyCode, "UP");
};

// hanlde key down
const KeyDownEvent = (KeyCode: KeyCodeType) => {
  KeyEvents.execute(KeyCode, "DOWN");
};

// hanlde key press
const KeyPressEvent = (KeyCode: KeyCodeType, TIMEOUT = 80) => {
  KeyDownEvent(KeyCode);
  setTimeout(() => {
    KeyUpEvent(KeyCode);
  }, TIMEOUT);
};

const closeKeyEvent = () => {
  KeyEvents.close();
};

export { KeyUpEvent, KeyDownEvent, KeyPressEvent, closeKeyEvent };
