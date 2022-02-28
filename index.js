

const express = require('express');
const exec = require('child_process').exec;

const app = express();

app.get("/pull", (req, res) => {
    const cmd = `
        cd /home/carlvoller/TuneBuddy-Web;
        git pull;
        npm run setup;
        npm run build;
        docker-compose up -d;
    `
    exec(cmd, () => {
        return res.status(200).end();
    });
});

app.listen(3000);