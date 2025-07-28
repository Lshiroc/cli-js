import process from "node:process";
import ansiEscapes from "ansi-escapes";
import readline from "readline";

class Screen {
	row = 1;
	col = 1;

	constructor() {
		process.stdout.write(ansiEscapes.clearTerminal);
		readline.emitKeypressEvents(process.stdin);	
		if (process.stdin.isTTY) {
			process.stdin.setRawMode(true);
		}
	}

	moveRight() {
		process.stdout.write(ansiEscapes.cursorForward(++this.col));
	}

	moveLeft() {
		if (this.col == 1) return;
		process.stdout.write(ansiEscapes.cursorBackward(--this.col));
	}

	moveUp() {
		if (this.row == 1) return;
		process.stdout.write(ansiEscapes.cursorUp(--this.row));
	}

	moveDown() {
		process.stdout.write(ansiEscapes.cursorDown(++this.row));
	}
}

export default Screen;

