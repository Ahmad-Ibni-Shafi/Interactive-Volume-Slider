# Syntax Reference: Interactive Volume Slider

This document provides a reference for Node.js terminal I/O, keyboard byte codes, and ANSI escape sequences.

---

## 1. Terminal Raw Mode

```js
// Enable raw mode (keys available immediately without Enter or terminal echo)
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}
process.stdin.resume();

// Restore terminal mode on exit
if (process.stdin.isTTY) {
    process.stdin.setRawMode(false);
}
process.stdin.pause();
process.exit(0);
```

---

## 2. Keyboard & Control Byte Values

| Key / Action | Buffer Bytes | Decimal Code | String / Escape |
|---|---|---|---|
| **Up Arrow** | `[27, 91, 65]` | `27, 91, 65` | `\u001b[A` / `\x1b[A` |
| **Down Arrow** | `[27, 91, 66]` | `27, 91, 66` | `\u001b[B` / `\x1b[B` |
| **Right Arrow** | `[27, 91, 67]` | `27, 91, 67` | `\u001b[C` / `\x1b[C` |
| **Left Arrow** | `[27, 91, 68]` | `27, 91, 68` | `\u001b[D` / `\x1b[D` |
| **Spacebar** | `[32]` | `32` | `' '` |
| **Enter (CR)** | `[13]` | `13` | `\r` |
| **Enter (LF)** | `[10]` | `10` | `\n` |
| **Backspace (DEL)** | `[127]` | `127` | `\x7f` |
| **Backspace (BS)** | `[8]` | `8` | `\b` |
| **Ctrl+C** | `[3]` | `3` | `\u0003` / `\x03` |

---

## 3. Terminal Control & Escape Sequences

| Sequence | What It Does |
|---|---|
| `\r` | Moves cursor to the start of the current line (carriage return) |
| `\x1b[2J\x1b[H` | Clears screen and resets cursor to top-left corner |
| `\x1b[2J` | Clears entire screen viewport |
| `\x1b[H` | Moves cursor to row 1, column 1 (home) |
| `\x1b[K` | Clears from cursor position to end of line |
| `\x1b[2K` | Clears entire line containing cursor |
| `\b \b` | Erases previous character visually (backspace, space, backspace) |
| `\x1b[?25l` | Hides cursor |
| `\x1b[?25h` | Shows cursor |

---

## 4. Buffer & Output Operations

```js
// Receiving raw Buffer data
process.stdin.on('data', (data) => {
    // data[0], data[1], data[2] ...
});

// Writing to stdout without automatic newline
process.stdout.write(content);

// Printable ASCII characters range: 32 (Space) to 126 (~)
const isPrintable = byte >= 32 && byte <= 126;

// Convert ASCII byte to character string
const char = String.fromCharCode(byte);
```
