

const express = require('express');
const exec = require('child_process').exec;

const app = express();

app.get("/pull", (req, res) => {
    const cmd = `
        /bin/bash "
        cd /home/carlvoller/TuneBuddy-Web;
        git pull;
        ./build.sh;
        docker-compose up -d;"
    `
    exec(cmd, (err, stdout, stderr) => {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
        return res.status(200).end();
    });
});

app.listen(3000, () => console.log("Listening on PORT 3000"));