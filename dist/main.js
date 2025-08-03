#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
const node_fs_1 = __importDefault(require("node:fs"));
const editor_1 = __importDefault(require("./editor"));
const screen_1 = __importDefault(require("./screen"));
const readline_1 = __importDefault(require("readline"));
const { nogClient } = require("nog");
const { nog } = nogClient;
const ansi_escapes_1 = __importDefault(require("ansi-escapes"));
class Liet extends editor_1.default {
    constructor() {
        super(...arguments);
        this.mode = "normal";
        this.screen = new screen_1.default(this.mem);
        this.filename = "";
        this.actions = {
            moveCursorTop: () => {
                this.screen.moveUp();
            },
            moveCursorBottom: () => {
                this.screen.moveDown();
            },
            moveCursorLeft: () => {
                this.screen.moveLeft();
            },
            moveCursorRight: () => {
                this.screen.moveRight();
            },
            quit: () => {
                node_process_1.default.exit();
            },
            insert: () => {
                this.mode = "insert";
            },
            esc: () => {
                this.mode = "normal";
            },
            text: (input) => {
                return this.insert(input, this.screen.col - 1, this.screen.row - 1);
            },
            newLine: () => {
                this.screen.newLine();
            }
        };
        this.keymaps = [
            {
                key: "k",
                action: this.actions.moveCursorTop
            },
            {
                key: "j",
                action: this.actions.moveCursorBottom
            },
            {
                key: "h",
                action: this.actions.moveCursorLeft
            },
            {
                key: "l",
                action: this.actions.moveCursorRight
            },
            {
                key: "q",
                action: this.actions.quit
            },
            {
                key: "i",
                action: this.actions.insert
            },
            {
                key: "escape",
                action: this.actions.esc
            },
            {
                key: "w",
                action: () => {
                    node_fs_1.default.writeFile(this.filename, this.text, err => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            nog("written!");
                        }
                    });
                }
            }
        ];
    }
    start(filename) {
        if (filename) {
            this.filename = filename;
            node_fs_1.default.readFile(filename, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                this.init(data);
                node_process_1.default.stdout.write(data);
                this.screen.startPosition();
            });
        }
        const handleKeypress = (c, k) => {
            let keymap = this.keymaps.find(km => km.key === k.name);
            if (keymap && k.name === "escape") {
                keymap.action();
            }
            else if (k.name === "backspace") {
                console.clear();
                //let text = this.delete(this.screen.col - 1);
                //--this.screen.col;
                //process.stdin.write(text);
            }
            else if (this.mode === "insert") {
                if (k.name === "return") {
                    this.actions.newLine();
                }
                else {
                    console.clear();
                    let text = this.actions.text(c);
                    nog(text);
                    node_process_1.default.stdin.write(this.text);
                    nog(this.screen.row, this.screen.col);
                    node_process_1.default.stdin.write(ansi_escapes_1.default.cursorTo(++this.screen.col - 1, this.screen.row - 1));
                }
            }
            else {
                keymap === null || keymap === void 0 ? void 0 : keymap.action();
            }
        };
        readline_1.default.emitKeypressEvents(node_process_1.default.stdin);
        if (node_process_1.default.stdin.isTTY) {
            node_process_1.default.stdin.setRawMode(true);
        }
        node_process_1.default.stdin.on("keypress", handleKeypress);
    }
}
const liet = new Liet();
liet.start(node_process_1.default.argv[2]);
