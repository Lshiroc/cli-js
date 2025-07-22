import { Buffer } from "node:buffer";

class Editor {
	#buf = Buffer.alloc(1024);
	#gap_size = 10;
	#gap_left = 0;
	#gap_right = this.#gap_size - this.#gap_left - 1;
	#size = 10;

	#grow(k: number, position: number) {
		let temp = Buffer.alloc(this.#size);

		for (let i = position; i < this.#size; i++) {
			temp[i - position] = this.#buf[i];	
		}

		for (let i = position; i < k; i++) {
			this.#buf[i] = +"_".charCodeAt(0).toString(16);
		}

		for (let i = 0; i < position + k; i++) {
			this.#buf[position + k + i] = temp[i];
		}

		this.#size += k;
		this.#gap_right += k;
	}

	#left(position: number) {
		while (position < this.#gap_left) {
			this.#gap_left--;	
			this.#gap_right--;
			this.#buf[this.#gap_right + 1] = this.#buf[this.#gap_left];
			this.#buf[this.#gap_left] = +"_".charCodeAt(0).toString(16);
		}
	}

	#right(position: number) {
		while (position > this.#gap_left) {
			this.#gap_left++;
			this.#gap_right++;
			this.#buf[this.#gap_left - 1] = this.#buf[this.#gap_right];
			this.#buf[this.#gap_right] = +"_".charCodeAt(0).toString(16);
		}
	}

	#moveCursor(position: number) {
		if (position < this.#gap_left) {
			this.#left(position);
		} else {
			this.#right(position);
		}
	}

	#insert(input: Buffer<ArrayBuffer>, position: number) {
		let len = input.length;
		let i = 0;

		if (position != this.#gap_left) {
			this.#moveCursor(position);
		}

		while (i < len) {
			if (this.#gap_right == this.#gap_left) {
				let k = 10;
				this.#grow(k, position);
			}

			this.#buf[this.#gap_left] = input[i];
			this.#gap_left++;
			i++;
			position++;
		}
	}

	insertText(input: string, position: number) {
		let bufferedText = Buffer.from(input, "utf8");
		this.#insert(bufferedText, position);
		return this.#buf.toString("utf8");
	}
}

export default Editor;

