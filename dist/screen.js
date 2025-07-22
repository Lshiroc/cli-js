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
        node_process_1.default.stdout.write(ansi_escapes_1.default.clearTerminal);
        readline_1.default.emitKeypressEvents(node_process_1.default.stdin);
        if (node_process_1.default.stdin.isTTY) {
            node_process_1.default.stdin.setRawMode(true);
        }
    }
    moveRight() {
        node_process_1.default.stdout.write(ansi_escapes_1.default.cursorMove(1, 0));
    }
}
exports.default = Screen;
