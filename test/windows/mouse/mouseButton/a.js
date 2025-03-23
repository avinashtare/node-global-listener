const { spawn } = require('child_process');

const child = spawn('mouseKeyListen.exe', [], { stdio: ['pipe', 'pipe', 'pipe'] });

child.stdout.on('data', (data) => {
    console.log("Received:", data.toString().trim());
});

child.stderr.on('data', (data) => {
    console.error("Error Output:", data.toString());
});

child.on('spawn', () => console.log("Process spawned successfully."));
child.on('error', (err) => console.error("Error spawning process:", err));
child.on('close', (code) => console.log(`Process exited with code ${code}`));

// Handle process exit when Ctrl+C is pressed
process.on('SIGINT', () => {
    console.log("Terminating process...");
    child.kill();
    process.exit(0);
});
