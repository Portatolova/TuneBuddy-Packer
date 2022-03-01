
const express = require('express');
const spawn = require('child_process').spawn;

const app = express();

app.get("/", (req, res) => res.redirect("https://tunebuddy.carlvoller.is").end());

app.get("/pull", (req, res) => {
    const cmd = `git pull`;
    let proc = spawn(cmd, { cwd: "/home/carlvoller/TuneBuddy-Web", shell: "/bin/bash" });

    proc.stdout.on('data', (data) => console.log(data.toString()));
    proc.stderr.on('data', (data) => console.error(data.toString()));
    proc.on('exit', () => res.status(200).end());
    proc.on('error', (err) => res.status(500).end(err.message));
});

app.get("/build", (req, res) => {
    const cmd = `./build.sh`;
    let proc = spawn(cmd, { cwd: "/home/carlvoller/TuneBuddy-Web", shell: "/bin/bash" });

    proc.stdout.on('data', (data) => console.log(data.toString()));
    proc.stderr.on('data', (data) => console.error(data.toString()));
    proc.on('exit', () => res.status(200).end());
    proc.on('error', (err) => res.status(500).end(err.message));
});

app.get("/deploy", (req, res) => {
    const cmd = `docker-compose up -d`;
    let proc = spawn(cmd, { cwd: "/home/carlvoller/TuneBuddy-Web", shell: "/bin/bash" });

    proc.stdout.on('data', (data) => console.log(data.toString()));
    proc.stderr.on('data', (data) => console.error(data.toString()));
    proc.on('exit', () => res.status(200).end());
    proc.on('error', (err) => res.status(500).end(err.message));
});

app.get("/cleanup", (req, res) => {
    const cmd = `docker rmi $(docker images --filter "dangling=true" -q --no-trunc)`
    let proc = spawn(cmd, { cwd: "/home/carlvoller/TuneBuddy-Web", shell: "/bin/bash" });

    proc.stdout.on('data', (data) => console.log(data.toString()));
    proc.stderr.on('data', (data) => console.error(data.toString()));
    proc.on('exit', () => res.status(200).end());
    proc.on('error', (err) => res.status(500).end(err.message));
});

app.listen(3000, () => console.log("Listening on PORT 3000"));