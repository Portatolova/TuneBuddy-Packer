
const https = require('https');
const express = require('express');
const spawn = require('child_process').spawn;

const app = express();

app.get("/pull", (req, res) => {
    const cmd = `git pull && ./build.sh && docker-compose up -d && docker rmi $(docker images --filter "dangling=true" -q --no-trunc)`
    let proc = spawn(cmd, { cwd: "/home/carlvoller/TuneBuddy-Web", shell: "/bin/bash" });

    proc.stdout.on('data', (data) => console.log(data.toString()));
    proc.stderr.on('data', (data) => console.error(data.toString()));
    proc.on('exit', () => res.status(200).end());
});

const httpsServer = https.createServer({
    key: fs.readFileSync(__dirname + "/ssl/key.pem"),
    cert: fs.readFileSync(__dirname + "/ssl/cert.pem")
}, app);

httpsServer.listen(3000, () => console.log("Listening on PORT 3000"));