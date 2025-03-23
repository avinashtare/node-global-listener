const { spawn } = require('child_process');

const child = spawn('a.exe', [], {
    stdio: ['pipe', 'pipe', 'pipe'],
});

child.stdout.on('data', (data) => {
    let key = data.toString().trim();
    console.log(key)
});

// Handle process exit when Ctrl+C is pressed on console 
process.on('SIGINT', () => {
    console.log("kill")

    child.stdout.destroy();
    process.exit(0);
});

child.on('close', (code) => {
    console.log(`Process exited with code ${code}`);
});
