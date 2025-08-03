"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
const ansi_escapes_1 = __importDefault(require("ansi-escapes"));
const readline_1 = __importDefault(require("readline"));
const { nogClient } = require("nog");
const { nog } = nogClient;
const editor_1 = require("./editor");
class Screen {
    constructor(mem) {
        this.row = 1;
        this.col = 1;
        this.loc = [];
        if (mem) {
            this.loc = mem;
        }
        node_process_1.default.stdout.write(ansi_escapes_1.default.clearTerminal);
        readline_1.default.emitKeypressEvents(node_process_1.default.stdin);
        if (node_process_1.default.stdin.isTTY) {
            node_process_1.default.stdin.setRawMode(true);
        }
    }
    moveRight(n) {
        const currColLen = this.loc[this.row - 1].text.length;
        if (currColLen <= this.col)
            return;
        node_process_1.default.stdout.write(ansi_escapes_1.default.cursorForward(n !== null && n !== void 0 ? n : 1));
        this.col++;
    }
    moveLeft(n) {
        if (this.col == 1)
            return;
        node_process_1.default.stdout.write(ansi_escapes_1.default.cursorBackward(n !== null && n !== void 0 ? n : 1));
        this.col--;
    }
    moveUp(n) {
        if (this.row == 1)
            return;
        node_process_1.default.stdout.write(ansi_escapes_1.default.cursorUp(n !== null && n !== void 0 ? n : 1));
        this.row--;
    }
    moveDown(n) {
        if (this.loc.length - 1 <= this.row)
            return;
        node_process_1.default.stdout.write(ansi_escapes_1.default.cursorDown(n !== null && n !== void 0 ? n : 1));
        this.row++;
    }
    startPosition() {
        node_process_1.default.stdout.write(ansi_escapes_1.default.cursorTo(0, 0));
    }
    newLine() {
        node_process_1.default.stdout.write(ansi_escapes_1.default.cursorNextLine);
        this.row++;
        this.col = 0;
        this.loc.push(new editor_1.GapBuffer());
    }
}
exports.default = Screen;
