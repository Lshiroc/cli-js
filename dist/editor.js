"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GapBuffer = void 0;
class Editor {
    constructor() {
        this.mem = [];
    }
    init(str) {
        const data = str.split("\n");
        for (let i = 0; i < data.length; i++) {
            let tempLineBuf = new GapBuffer(data[i]);
            this.mem.push(tempLineBuf);
        }
    }
    get text() {
        let temp = [];
        for (let i = 0; i < this.mem.length; i++) {
            temp.push(this.mem[i].text);
        }
        return temp.join("\n");
    }
    insert(input, col, row) {
        if (this.mem.length > 0) {
            this.mem[row].insert(input, col);
        }
        else {
            let temp = new GapBuffer();
            temp.insert(input, col);
            this.mem.push(temp);
        }
    }
}
class GapBuffer {
    constructor(str) {
        this.buffer = new Array(10).fill("_");
        this.gap_size = 10;
        this.gap_left = 0;
        this.gap_right = this.gap_size - this.gap_left - 1;
        this.size = 10;
        if (str) {
            this.insert(str, 0);
        }
    }
    grow(k, position) {
        let a = this.buffer.slice(position, this.size);
        this.buffer.splice(position, this.size - position, ...("_".repeat(k)));
        this.buffer.splice(position + k, 0, ...a);
        this.size += k;
        this.gap_right += k;
    }
    left(position) {
        while (position < this.gap_left) {
            this.gap_left--;
            this.gap_right--;
            this.buffer[this.gap_right + 1] = this.buffer[this.gap_left];
            this.buffer[this.gap_left] = "_";
        }
    }
    right(position) {
        while (position > this.gap_left) {
            this.gap_left++;
            this.gap_right++;
            this.buffer[this.gap_left - 1] = this.buffer[this.gap_right];
            this.buffer[this.gap_right] = "_";
        }
    }
    move_cursor(position) {
        if (position < this.gap_left) {
            this.left(position);
        }
        else {
            this.right(position);
        }
    }
    insert(input, position) {
        let len = input.length;
        let i = 0;
        if (position != this.gap_left) {
            this.move_cursor(position);
        }
        while (i < len) {
            if (this.gap_left === this.gap_right) {
                let k = 10;
                this.grow(10, position);
            }
            this.buffer[this.gap_left] = input.charAt(i);
            this.gap_left++;
            i++;
            position++;
        }
        return this.buffer.join("");
    }
    delete(position) {
        if (position + 1 != this.gap_left) {
            this.move_cursor(position + 1);
        }
        this.gap_left--;
        this.buffer[this.gap_left] = "_";
    }
    get text() {
        let beforeGap = this.buffer.slice(0, this.gap_left);
        let afterGap = this.buffer.slice(this.gap_right + 1);
        return beforeGap.join("") + afterGap.join("");
    }
}
exports.GapBuffer = GapBuffer;
exports.default = Editor;
