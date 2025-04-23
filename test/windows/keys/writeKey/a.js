const { spawn } = require("child_process");
const path = require("path")
var events = require('events');


class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }

    size() {
        return this.items.length;
    }
}

class KeyController {
    constructor() {
        this.executableWindowKeyAPI = null;
        this.KeysQueue = new Queue();
        this.keyEventEmitter = new events.EventEmitter();

        this.KeyCode = -1;
    }

    runExecutable() {
        // executable for native window api keyevent
        this.executableWindowKeyAPI = spawn(path.join(__dirname + "./a.exe"), [], {
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

    handleExecutableOutput(response) {

        // check for options
        if (response.includes("Enter a option (0.Exit,1.KeyUp,2.KeyDown):") || response.includes("Check Queue")) {
            // get keysdata from queue
            const CurrentKeyEventData = this.KeysQueue.dequeue();

            if (CurrentKeyEventData) {
                this.KeyCode = CurrentKeyEventData.KeyCode;

                // check event
                if (CurrentKeyEventData.Actions.UP) {
                    this.executableWindowKeyAPI.stdin.write("1\n")
                }
                else if (CurrentKeyEventData.Actions.DOWN) {
                    this.executableWindowKeyAPI.stdin.write("2\n")
                }
            }
            // waiting for keys 
            else {
                let waitingInterval = setInterval(() => {
                    if (this.KeysQueue.size() > 0) {
                        clearInterval(waitingInterval);

                        // call it's self to clear the queue remaing event
                        this.handleExecutableOutput("Check Queue");
                    }
                }, 500)
                // Ctrl + c exit in interval
                process.on('SIGINT', () => {
                    clearInterval(waitingInterval);
                });
            }
        }

        // write key  you want to press
        else if (response.includes("Enter Key Code: ")) {
            if (this.KeyCode) {
                this.executableWindowKeyAPI.stdin.write(`${this.KeyCode}\n`);
                this.KeyCode = null;
            }
        }
    }


    isRunning() {
        // exitCode is null while the process is running,
        return this.executableWindowKeyAPI.exitCode === null;
    }

    killAndErrorHandlers() {
        // Handle process exit when Ctrl+C is pressed on console
        process.on("SIGINT", () => {
            this.executableWindowKeyAPI.stdin.destroy();
            this.executableWindowKeyAPI.stdin.destroy();
        });

        // if any error occurs
        this.executableWindowKeyAPI.on("error", (message) => {
            if (!this.isRunning) {
                // console.log(`error ${message}`);
                this.executableWindowKeyAPI.stdout.destroy();

                // respwin if process is not running or error is occured
                this.executableWindowKeyAPI = null;
                // Try again after delay
                setTimeout(() => this.runExecutable(), 3000);
            }
        });
    }
    execute(KeyCode, KeyAction) {
        if (typeof (KeyCode) != "number") return;

        let Actions = { UP: false, DOWN: false };
        // check key action
        if (KeyAction == "UP") { Actions.UP = true }
        else if (KeyAction == "DOWN") { Actions.DOWN = true }

        // add key in queue
        this.KeysQueue.enqueue({ Actions, KeyCode })

        if (!this.executableWindowKeyAPI) {
            // start exe
            this.runExecutable();
        }
    }
}

// init instance 
const KeyEvents = new KeyController();

// API for outter programs

const KeyUpEvent = (KeyCode) => {
    KeyEvents.execute(KeyCode, "UP")
}

const KeyDownEvent = (KeyCode) => {
    KeyEvents.execute(KeyCode, "DOWN")
}

const KeyPressEvent = (KeyCode, TIMEOUT = 80) => {
    KeyDown(KeyCode);
    setTimeout(() => {
        KeyUp(KeyCode);
    }, TIMEOUT)
}

export { KeyUpEvent, KeyDownEvent, KeyPressEvent };
