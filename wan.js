const express = require("express");
const puppeteer = require('puppeteer');
const app = express();

app.listen(process.env.port || 5000, () => {
  console.log('server running');
    })
app.get('/id', async(req,res) => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
      });
      const page = await browser.newPage();
      await page.goto('https://www.midasbuy.com/midasbuy/id/buy/pubgm');
      await page.type('.input', req.query.id);
      await page.click('#app > div.content > div.x-main > div.tab-nav-box > div > div > div > div.btn');
      await page.waitForTimeout(2000);
      await page.$eval('#app > div.content > div.x-main > div.tab-nav-box > div > div > div > div:nth-child(2) > div.val', element => element.textContent)
        .then((rest) => {
        res.write(rest);
	res.end();
        })
      .catch((err) => {
        console.log('Hai');
        })
      await browser.close();
})