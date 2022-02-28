

const express = require('express');
const exec = require('child_process').exec;

const app = express();

app.get("/pull", (req, res) => {
    const cmd = `
        /bin/bash "
        git pull;
        ./build.sh;
        docker-compose up -d;"
    `
    exec(cmd, { cwd: "/home/carlvoller/TuneBuddy-Web" }, (err, stdout, stderr) => {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
        return res.status(200).end();
    });
});

app.listen(3000, () => console.log("Listening on PORT 3000"));