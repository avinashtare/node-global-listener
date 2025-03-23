const { spawn } = require('child_process');

const child = spawn('getpos.exe', [], { stdio: ['pipe', 'pipe', 'pipe'] });

child.stdout.on('data', (data) => {
    const output = data.toString().trim().replace("Mouse Position: ", "");
    const position = output.split(" ").reduce((acc, item) => {
        if (item.startsWith("X=")) acc.x = item.replace("X=", "");
        if (item.startsWith("Y=")) acc.y = item.replace("Y=", "");
        return acc;
    }, { x: "0", y: "0" });

    console.clear();
    console.log([position.x, position.y]);
});

child.on("spawn", () => console.log("Process spawned successfully."));
child.on('error', (err) => console.error("Error spawning process:", err));
child.on('close', (code) => console.log(`Process exited with code ${code}`));

// Handle process exit when Ctrl+C is pressed
process.on('SIGINT', () => {
    console.log("Terminating process...");
    child.kill();
    process.exit(0);
});