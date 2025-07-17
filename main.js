#!/usr/bin/env node

import process from "node:process";
import readline from "readline";
import fs from "node:fs"

class CLIJS {
	row = 1;
	col = 1;
	mode = "";

	start(filename) {
		readline.emitKeypressEvents(process.stdin);
		console.clear();
		if (process.stdin.setRawMode !== null) {
			process.stdin.setRawMode(true);
		}
	
		if (filename) {
			let buf;
			fs.readFile(filename, 'utf8', (err, data) => {
				if (err) {
					console.error(err);
					return;
				}
				buf = Buffer.from(data, "utf8");

				console.log(data);
			})

			console.log(buf);
		}

		const handleKeypress = (c, k) => {
			let keymap = this.keymaps.find(km => km.key === k.name);
			if (keymap) {
				keymap.action();
			}
		}

		process.stdin.on("keypress", handleKeypress);
	}

	actions = {
		moveCursorTop: () => {
			readline.moveCursor(process.stdin, 0, -1);
			if (this.row != 1) this.row--;
		},
		moveCursorBottom: () => {
			readline.moveCursor(process.stdin, 0, 1);
			this.row++;
		},
		moveCursorLeft: () => {
			readline.moveCursor(process.stdin, -1, 0);
			if (this.col != 1) this.col--;
		},
		moveCursorRight: () => {
			readline.moveCursor(process.stdin, 1, 0);
			this.col++;
		},
		quit: () => {
			readline.moveCursor(process.stdin, -this.col, -this.row);
			process.exit();
			console.clear();
		},
		insert: () => {
			this.mode = "insert";
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
		}
	]
}

const clijs = new CLIJS();

clijs.start(process.argv[2]);

