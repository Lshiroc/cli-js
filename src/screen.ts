import process from "node:process";
import ansiEscapes from "ansi-escapes";
import readline from "readline";
const { nogClient } = require("nog");
const { nog } = nogClient;
import { GapBuffer } from "./editor";

class Screen {
	row = 1;
	col = 1;
	loc: GapBuffer[] = [];

	constructor(mem?: GapBuffer[]) {
		if (mem) {
			this.loc = mem;
		}
		process.stdout.write(ansiEscapes.clearTerminal);
		readline.emitKeypressEvents(process.stdin);	
		if (process.stdin.isTTY) {
			process.stdin.setRawMode(true);
		}
	}

	moveRight(n?: number) {
		const currColLen = this.loc[this.row - 1].text.length;
		if (currColLen <= this.col) return;
		process.stdout.write(ansiEscapes.cursorForward(n ?? 1));
		this.col++;
	}

	moveLeft(n?: number) {
		if (this.col == 1) return;
		process.stdout.write(ansiEscapes.cursorBackward(n ?? 1));
		this.col--;
	}

	moveUp(n?: number) {
		if (this.row == 1) return;
		process.stdout.write(ansiEscapes.cursorUp(n ?? 1));
		this.row--;
	}

	moveDown(n?: number) {
		if (this.loc.length - 1 <= this.row) return;
		process.stdout.write(ansiEscapes.cursorDown(n ?? 1));
		this.row++;
	}

	startPosition() {
		process.stdout.write(ansiEscapes.cursorTo(0, 0));
	}

	newLine() {
		process.stdout.write(ansiEscapes.cursorNextLine);
		this.row++;
		this.col = 0;
		this.loc.push(new GapBuffer());
	}
}

export default Screen;

