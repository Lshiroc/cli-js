#!/usr/bin/env node

import process from "node:process";
import fs from "node:fs"
import Editor from "./editor";
import Screen from "./screen";
import readline from "readline";
const { nogClient } = require("nog");
const { nog } = nogClient;
import ansiEscapes from "ansi-escapes";

class Liet extends Editor {
	mode: "normal" | "insert" = "normal";
	screen = new Screen(this.mem);
	filename: string = "";

	start(filename?: string) {	
		if (filename) {
			this.filename = filename;
			fs.readFile(filename, 'utf8', (err, data) => {
				if (err) {
					console.error(err);
					return;
				}

				this.init(data);
				process.stdout.write(data);
				this.screen.startPosition();
			});
		}

		const handleKeypress = (c: string, k: any) => {
			let keymap = this.keymaps.find(km => km.key === k.name);

			if (keymap && k.name === "escape") {
				keymap.action();
			} else if (k.name === "backspace") {
				console.clear();
				//let text = this.delete(this.screen.col - 1);
				//--this.screen.col;
				//process.stdin.write(text);
			} else if (this.mode === "insert") {
				if (k.name === "return") {
					this.actions.newLine();
				} else {
					console.clear();
					let text = this.actions.text(c);
					nog(text);
					process.stdin.write(this.text);
					nog(this.screen.row, this.screen.col);
					process.stdin.write(ansiEscapes.cursorTo(++this.screen.col - 1, this.screen.row - 1))
				}
			} else {
				keymap?.action();
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
		insert: () => {
			this.mode = "insert";
		},
		esc: () => {
			this.mode = "normal";
		},
		text: (input: string) => {
			return this.insert(input, this.screen.col - 1, this.screen.row - 1);
		},
		newLine: () => {
			this.screen.newLine();
		}
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
				fs.writeFile(this.filename, this.text, err => {
					if (err) {
						console.log(err);
					} else {
						nog("written!");
					}
				});
			}
		}
	]
}

const liet = new Liet();
liet.start(process.argv[2]);

