#!/usr/bin/env node

import process from "node:process";
import fs from "node:fs"
import Editor from "./editor";
import Screen from "./screen";

class Liet extends Editor {
	mode: string = "";
	screen = new Screen();

	start(filename?: string) {	
		/*if (filename) {
			let buf;
			fs.readFile(filename, 'utf8', (err, data) => {
				if (err) {
					console.error(err);
					return;
				}

				buf = this.insertText(data, this.col - 1);
				this.currentLineLength = data.length;
				
				console.log(buf);
			})

			this.cursor.red().bg.grey();
		}*/

		/*const handleKeypress = (c, k) => {
			let keymap = this.keymaps.find(km => km.key === k.name);
			if (keymap) {
				keymap.action();
			} else {
				console.clear();
				console.log(this.actions.text(k.name));

				this.cursor.goto(this.col, 0);
			}
		}*/

		//process.stdin.on("keypress", handleKeypress);
	}

	/*actions = {
		moveCursorTop: () => {
			readline.moveCursor(process.stdin, 0, -1);
			if (this.row != 1) this.row--;
		},
		moveCursorBottom: () => {
			if (this.lines == this.row) return;
			this.row++;
			readline.moveCursor(process.stdin, 0, 1);
		},
		moveCursorLeft: () => {
			readline.moveCursor(process.stdin, -1, 0);
			if (this.col != 1) this.col--;
		},
		moveCursorRight: () => {
			if (this.currentLineLength < this.col) return		
			readline.moveCursor(process.stdin, 1, 0);
			this.col++;
		},
		quit: () => {
			readline.moveCursor(process.stdin, -this.col, -this.row);
			this.cursor.reset();
			process.exit();
			console.clear();
		},
		insert: () => {
			this.mode = "insert";
		},
		text: (input) => {
			return this.insertText(input, this.col - 1);
		}
	}*/

	/*keymaps = [
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
		}
	]*/
}

const liet = new Liet();
liet.start(process.argv[2]);

