"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
const ansi_escapes_1 = __importDefault(require("ansi-escapes"));
const readline_1 = __importDefault(require("readline"));
class Screen {
    constructor() {
        this.row = 1;
        this.col = 1;
        node_process_1.default.stdout.write(ansi_escapes_1.default.clearTerminal);
        readline_1.default.emitKeypressEvents(node_process_1.default.stdin);
        if (node_process_1.default.stdin.isTTY) {
            node_process_1.default.stdin.setRawMode(true);
        }
    }
    moveRight() {
        node_process_1.default.stdout.write(ansi_escapes_1.default.cursorForward(++this.col));
    }
    moveLeft() {
        if (this.col == 1)
            return;
        node_process_1.default.stdout.write(ansi_escapes_1.default.cursorBackward(--this.col));
    }
    moveUp() {
        if (this.row == 1)
            return;
        node_process_1.default.stdout.write(ansi_escapes_1.default.cursorUp(--this.row));
    }
    moveDown() {
        node_process_1.default.stdout.write(ansi_escapes_1.default.cursorDown(++this.row));
    }
}
exports.default = Screen;
