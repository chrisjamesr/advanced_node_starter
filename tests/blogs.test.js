const puppeteer = require('puppeteer');
const Page = require('./helpers/page');

let page;


beforeEach( async ()=> {
    page = await Page.build();
    await page.goto('localhost:3000');
},15000);

afterEach( async () => {
    await page.close() 
});