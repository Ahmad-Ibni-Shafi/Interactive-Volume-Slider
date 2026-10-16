let volume = 50; // Starting volume is 50%
const TOTAL_SLOTS = 20; // The bar contains 20 slots

// Byte sequences for keyboard keys
const LEFT = [27, 91, 68];  // Left Arrow
const RIGHT = [27, 91, 67]; // Right Arrow
const ENTER = [13];         // Enter
const CTRL_C = [3];         // Ctrl+C

function exitProgram() {
    process.exit(0); // Stop the program
}

// DO-NOT EDIT THIS CHECK
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true); // Receive keys immediately
}
process.stdin.resume(); // Activate keyboard input

function draw() {
        const filledSlots = volume / 5; // Convert volume into filled slots

        const bar =
            "=".repeat(filledSlots) + // Add '=' for filled slots
            "-".repeat(TOTAL_SLOTS - filledSlots); // Add '-' for empty slots

        process.stdout.write(`\rVolume: [${bar}] ${volume}%`); // Update the same terminal line
}

process.stdin.on('data', (data) => {
        const key = Array.from(data); // Convert input Buffer into an array of bytes

        // Ctrl+C: exit immediately
        if (key.length === 1 && key[0] === CTRL_C[0]) {
            exitProgram();
        }

        // Left Arrow: decrease volume by 5, minimum 0
        if (
            key.length === LEFT.length &&
            key.every((byte, i) => byte === LEFT[i])
        ) {
            volume = Math.max(0, volume - 5); // Prevent volume going below 0
            draw(); // Redraw the bar
        }

        // Right Arrow: increase volume by 5, maximum 100
        else if (
            key.length === RIGHT.length &&
            key.every((byte, i) => byte === RIGHT[i])
        ) {
            volume = Math.min(100, volume + 5); // Prevent volume exceeding 100
            draw(); // Redraw the bar
        }

        // Enter: confirm the volume
        else if (
            key.length === 1 &&
            (key[0] === ENTER[0] || key[0] === 10)
        ) {
            process.stdout.write(`\nVolume confirmed: ${volume}%\n`); // Print result on a new line
            exitProgram(); // End the program
        }
});

draw(); // Display the initial volume bar