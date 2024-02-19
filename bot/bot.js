const puppeteer = require('puppeteer');
const express = require("express");
const path = require("path");
const APP_URL = "http://localhost:3000/login";
const PORT = 5000;
require('dotenv').config({path: path.resolve(__dirname+'/.env')})
const app = express();
app.get("/", (req, res) => {
    visit_url();
    res.send("admin will visit your url");
});

async function visit_url () {
    return new Promise(async function(resolve, reject) {
        const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser',args:['-no-sandbox']});
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(1e3*15);
        try{
            await page.goto(APP_URL);
            await page.type('#username', process.env.ADMIN_USERNAME);
            await page.type('#password', process.env.ADMIN_PASSWORD);
            await page.click('#login');
            const page2 = await browser.newPage();
            await page2.goto("http://localhost:3000/my-requests");
            setTimeout(function (){browser.close()},5000);
        }
        catch(e){
            console.log(e);
        }

    });
}

const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})


