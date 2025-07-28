#!/usr/bin/env node

import process from "node:process";
import fs from "node:fs"
import Editor from "./editor";
import Screen from "./screen";
import readline from "readline";
const { nogClient } = require("nog");
const { nog } = nogClient;

class Liet extends Editor {
	mode: string = "";
	screen = new Screen();

	start(filename?: string) {	
		nog("hello world", [1, 2, 3, 4, 5]);
		if (filename) {
			fs.readFile(filename, 'utf8', (err, data) => {
				if (err) {
					console.error(err);
					return;
				}

				const arr = data.split("\n");
				this.setMem(arr);
				process.stdout.write(data);
			})
		}

		const handleKeypress = (c: any, k: any) => {
			//console.log(c, k);
			let keymap = this.keymaps.find(km => km.key === k.name);
			if (keymap) {
				keymap.action();
			} else {
				console.clear();
				// console.log(this.actions.text(k.name));

				/* this.cursor.goto(this.col, 0); */
			}
		}

		readline.emitKeypressEvents(process.stdin);	
		if (process.stdin.isTTY) {
			process.stdin.setRawMode(true);
		}

		process.stdin.on("keypress", handleKeypress);
	}

	actions = {
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
			process.exit();
		},
		/*insert: () => {
			this.mode = "insert";
		},
		text: (input) => {
			return this.insertText(input, this.col - 1);
		}*/
	}

	keymaps = [
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
	]
}

const liet = new Liet();
liet.start(process.argv[2]);

