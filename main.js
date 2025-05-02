import process from "node:process";
import readline from "readline";

readline.emitKeypressEvents(process.stdin);
console.clear();
if (process.stdin.setRawMode !== null) {
    process.stdin.setRawMode(true);
}

process.stdout.write("text\r");
console.log("this is a test text");
console.log("and this is another one ");
const handleKeypress = (c, k) => {
    switch(k.name) {
        case "k":
            readline.moveCursor(process.stdin, 0, -1);
            break;
        case "j":
            readline.moveCursor(process.stdin, 0, 1);
            break;
        case "h":
            readline.moveCursor(process.stdin, -1, 0);
            break;
        case "l":
            readline.moveCursor(process.stdin, 1, 0);
            break;
        case "q":
            console.clear();
            process.exit();
            break;
    }
}

process.stdin.on("keypress", handleKeypress);

/* setTimeout(() => {
    process.stdout.write("text changed!!!\n");
    if (process.stdin.setRawMode !== null) {
        process.stdin.setRawMode(false);
        // process.stdin.off("keypress", handleKeypress);
    }
}, 2000); */

