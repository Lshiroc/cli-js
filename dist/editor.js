"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Editor_instances, _Editor_buf, _Editor_gap_size, _Editor_gap_left, _Editor_gap_right, _Editor_size, _Editor_grow, _Editor_left, _Editor_right, _Editor_moveCursor, _Editor_insert;
Object.defineProperty(exports, "__esModule", { value: true });
const node_buffer_1 = require("node:buffer");
class Editor {
    constructor() {
        _Editor_instances.add(this);
        _Editor_buf.set(this, node_buffer_1.Buffer.alloc(1024));
        _Editor_gap_size.set(this, 10);
        _Editor_gap_left.set(this, 0);
        _Editor_gap_right.set(this, __classPrivateFieldGet(this, _Editor_gap_size, "f") - __classPrivateFieldGet(this, _Editor_gap_left, "f") - 1);
        _Editor_size.set(this, 10);
    }
    insertText(input, position) {
        let bufferedText = node_buffer_1.Buffer.from(input, "utf8");
        __classPrivateFieldGet(this, _Editor_instances, "m", _Editor_insert).call(this, bufferedText, position);
        return __classPrivateFieldGet(this, _Editor_buf, "f").toString("utf8");
    }
}
_Editor_buf = new WeakMap(), _Editor_gap_size = new WeakMap(), _Editor_gap_left = new WeakMap(), _Editor_gap_right = new WeakMap(), _Editor_size = new WeakMap(), _Editor_instances = new WeakSet(), _Editor_grow = function _Editor_grow(k, position) {
    let temp = node_buffer_1.Buffer.alloc(__classPrivateFieldGet(this, _Editor_size, "f"));
    for (let i = position; i < __classPrivateFieldGet(this, _Editor_size, "f"); i++) {
        temp[i - position] = __classPrivateFieldGet(this, _Editor_buf, "f")[i];
    }
    for (let i = position; i < k; i++) {
        __classPrivateFieldGet(this, _Editor_buf, "f")[i] = +"_".charCodeAt(0).toString(16);
    }
    for (let i = 0; i < position + k; i++) {
        __classPrivateFieldGet(this, _Editor_buf, "f")[position + k + i] = temp[i];
    }
    __classPrivateFieldSet(this, _Editor_size, __classPrivateFieldGet(this, _Editor_size, "f") + k, "f");
    __classPrivateFieldSet(this, _Editor_gap_right, __classPrivateFieldGet(this, _Editor_gap_right, "f") + k, "f");
}, _Editor_left = function _Editor_left(position) {
    var _a, _b;
    while (position < __classPrivateFieldGet(this, _Editor_gap_left, "f")) {
        __classPrivateFieldSet(this, _Editor_gap_left, (_a = __classPrivateFieldGet(this, _Editor_gap_left, "f"), _a--, _a), "f");
        __classPrivateFieldSet(this, _Editor_gap_right, (_b = __classPrivateFieldGet(this, _Editor_gap_right, "f"), _b--, _b), "f");
        __classPrivateFieldGet(this, _Editor_buf, "f")[__classPrivateFieldGet(this, _Editor_gap_right, "f") + 1] = __classPrivateFieldGet(this, _Editor_buf, "f")[__classPrivateFieldGet(this, _Editor_gap_left, "f")];
        __classPrivateFieldGet(this, _Editor_buf, "f")[__classPrivateFieldGet(this, _Editor_gap_left, "f")] = +"_".charCodeAt(0).toString(16);
    }
}, _Editor_right = function _Editor_right(position) {
    var _a, _b;
    while (position > __classPrivateFieldGet(this, _Editor_gap_left, "f")) {
        __classPrivateFieldSet(this, _Editor_gap_left, (_a = __classPrivateFieldGet(this, _Editor_gap_left, "f"), _a++, _a), "f");
        __classPrivateFieldSet(this, _Editor_gap_right, (_b = __classPrivateFieldGet(this, _Editor_gap_right, "f"), _b++, _b), "f");
        __classPrivateFieldGet(this, _Editor_buf, "f")[__classPrivateFieldGet(this, _Editor_gap_left, "f") - 1] = __classPrivateFieldGet(this, _Editor_buf, "f")[__classPrivateFieldGet(this, _Editor_gap_right, "f")];
        __classPrivateFieldGet(this, _Editor_buf, "f")[__classPrivateFieldGet(this, _Editor_gap_right, "f")] = +"_".charCodeAt(0).toString(16);
    }
}, _Editor_moveCursor = function _Editor_moveCursor(position) {
    if (position < __classPrivateFieldGet(this, _Editor_gap_left, "f")) {
        __classPrivateFieldGet(this, _Editor_instances, "m", _Editor_left).call(this, position);
    }
    else {
        __classPrivateFieldGet(this, _Editor_instances, "m", _Editor_right).call(this, position);
    }
}, _Editor_insert = function _Editor_insert(input, position) {
    var _a;
    let len = input.length;
    let i = 0;
    if (position != __classPrivateFieldGet(this, _Editor_gap_left, "f")) {
        __classPrivateFieldGet(this, _Editor_instances, "m", _Editor_moveCursor).call(this, position);
    }
    while (i < len) {
        if (__classPrivateFieldGet(this, _Editor_gap_right, "f") == __classPrivateFieldGet(this, _Editor_gap_left, "f")) {
            let k = 10;
            __classPrivateFieldGet(this, _Editor_instances, "m", _Editor_grow).call(this, k, position);
        }
        __classPrivateFieldGet(this, _Editor_buf, "f")[__classPrivateFieldGet(this, _Editor_gap_left, "f")] = input[i];
        __classPrivateFieldSet(this, _Editor_gap_left, (_a = __classPrivateFieldGet(this, _Editor_gap_left, "f"), _a++, _a), "f");
        i++;
        position++;
    }
};
exports.default = Editor;
