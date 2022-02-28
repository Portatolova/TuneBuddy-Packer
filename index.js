

const express = require('express');
const spawn = require('child_process').spawn;

const app = express();

app.get("/pull", (req, res) => {
    const cmd = `git pull && ./build.sh && docker-compose up -d;`
    let proc = spawn(cmd, { cwd: "/home/carlvoller/TuneBuddy-Web", shell: true });

    proc.stdout.on('data', (data) => console.log(data.toString()));
    proc.stderr.on('data', (data) => console.log(data.toString()));
    proc.on('exit', () => res.status(200).end());
});

app.listen(3000, () => console.log("Listening on PORT 3000"));