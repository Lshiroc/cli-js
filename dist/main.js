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
class Liet extends editor_1.default {
    constructor() {
        super(...arguments);
        this.mode = "";
        this.screen = new screen_1.default();
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
            /*insert: () => {
                this.mode = "insert";
            },
            text: (input) => {
                return this.insertText(input, this.col - 1);
            }*/
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
            /*{
                key: "i",
                action: this.actions.insert
            }*/
        ];
    }
    start(filename) {
        nog("hello world", [1, 2, 3, 4, 5]);
        if (filename) {
            node_fs_1.default.readFile(filename, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const arr = data.split("\n");
                this.setMem(arr);
                node_process_1.default.stdout.write(data);
            });
        }
        const handleKeypress = (c, k) => {
            //console.log(c, k);
            let keymap = this.keymaps.find(km => km.key === k.name);
            if (keymap) {
                keymap.action();
            }
            else {
                console.clear();
                // console.log(this.actions.text(k.name));
                /* this.cursor.goto(this.col, 0); */
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
