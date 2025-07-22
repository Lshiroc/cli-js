import process from "node:process";
import ansiEscapes from "ansi-escapes";
import readline from "readline";

class Screen {
	constructor() {
		process.stdout.write(ansiEscapes.clearTerminal);
		readline.emitKeypressEvents(process.stdin);	
		if (process.stdin.isTTY) {
			process.stdin.setRawMode(true);
		}
	}

	moveRight() {
		process.stdout.write(ansiEscapes.cursorMove(1, 0));
	}
}

export default Screen;

