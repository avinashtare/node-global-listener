"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeKeyEvent = exports.KeyPressEvent = exports.KeyDownEvent = exports.KeyUpEvent = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const Queue_1 = __importDefault(require("../../utils/Queue"));
class KeyController {
    constructor() {
        this.executableWindowKeyAPI = null;
        this.KeysQueue = new Queue_1.default();
        this.KeyCode = -1;
        this.exePath = path_1.default.join(__dirname + "./KeysWriter.exe");
    }
    runExecutable() {
        this.executableWindowKeyAPI = (0, child_process_1.spawn)(this.exePath, [], {
            stdio: ["pipe", "pipe", "pipe"],
        });
        this.executableWindowKeyAPI.stdout.on("data", (data) => {
            let response = data.toString();
            this.handleExecutableOutput(response);
        });
        this.killAndErrorHandlers();
    }
    handleExecutableOutput(response) {
        if (response.includes("Enter a option (0.Exit,1.KeyUp,2.KeyDown):") ||
            response.includes("Check Queue")) {
            const CurrentKeyEventData = this.KeysQueue.dequeue();
            if (CurrentKeyEventData && this.executableWindowKeyAPI) {
                this.KeyCode = CurrentKeyEventData.KeyCode;
                if (CurrentKeyEventData.Actions.UP) {
                    this.executableWindowKeyAPI.stdin.write("1\n");
                }
                else if (CurrentKeyEventData.Actions.DOWN) {
                    this.executableWindowKeyAPI.stdin.write("2\n");
                }
            }
            else {
                if (this.KeysQueue.size() > 0) {
                    this.handleExecutableOutput("Check Queue");
                }
                else {
                    let waitingInterval = setInterval(() => {
                        if (this.KeysQueue.size() > 0) {
                            clearInterval(waitingInterval);
                            this.handleExecutableOutput("Check Queue");
                        }
                    }, 500);
                    process.on("SIGINT", () => {
                        clearInterval(waitingInterval);
                    });
                }
            }
        }
        else if (response.includes("Enter Key Code: ") &&
            this.executableWindowKeyAPI) {
            if (this.KeyCode > 0) {
                this.executableWindowKeyAPI.stdin.write(`${this.KeyCode}\n`);
                this.KeyCode = -1;
            }
        }
    }
    isRunning() {
        return (this.executableWindowKeyAPI &&
            this.executableWindowKeyAPI.exitCode === null);
    }
    killAndErrorHandlers() {
        process.on("SIGINT", () => {
            if (this.executableWindowKeyAPI) {
                this.executableWindowKeyAPI.stdin.destroy();
                this.executableWindowKeyAPI.stdin.destroy();
            }
        });
        if (this.executableWindowKeyAPI) {
            this.executableWindowKeyAPI.on("exit", (code, signal) => {
                if (signal) {
                    console.error(`KeyWriter was killed by signal: ${signal}`);
                    process.exit();
                }
                else {
                }
            });
            this.executableWindowKeyAPI.on("error", (err) => {
                if (err.code == "ENOENT") {
                    console.error(`Executable not found at ${err.message}`);
                    process.exit();
                }
                else if (err.code === "EACCES") {
                    console.error(` No permission to execute`);
                }
                if (!this.isRunning && this.executableWindowKeyAPI) {
                    console.log(`error ${err}`);
                    this.executableWindowKeyAPI.stdout.destroy();
                    this.executableWindowKeyAPI = null;
                    setTimeout(() => this.runExecutable(), 3000);
                }
            });
        }
    }
    close() {
        var _a;
        (_a = this.executableWindowKeyAPI) === null || _a === void 0 ? void 0 : _a.kill();
    }
    execute(KeyCode, KeyAction) {
        if (typeof KeyCode != "number")
            return;
        let Actions = { UP: false, DOWN: false };
        if (KeyAction == "UP") {
            Actions.UP = true;
        }
        else if (KeyAction == "DOWN") {
            Actions.DOWN = true;
        }
        this.KeysQueue.enqueue({ Actions, KeyCode });
        if (!this.executableWindowKeyAPI) {
            this.runExecutable();
        }
    }
}
const KeyEvents = new KeyController();
const KeyUpEvent = (KeyCode) => {
    KeyEvents.execute(KeyCode, "UP");
};
exports.KeyUpEvent = KeyUpEvent;
const KeyDownEvent = (KeyCode) => {
    KeyEvents.execute(KeyCode, "DOWN");
};
exports.KeyDownEvent = KeyDownEvent;
const KeyPressEvent = (KeyCode, TIMEOUT = 80) => {
    KeyDownEvent(KeyCode);
    setTimeout(() => {
        KeyUpEvent(KeyCode);
    }, TIMEOUT);
};
exports.KeyPressEvent = KeyPressEvent;
const closeKeyEvent = () => {
    KeyEvents.close();
};
exports.closeKeyEvent = closeKeyEvent;
