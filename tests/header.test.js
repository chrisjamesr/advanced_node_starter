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

// afterAll( ()=> process.exit());

test('the header has the correct text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    
    expect(text).toEqual('Blogster');
});   

test('clicking login link kicks off OAuth flow', async () => {
    await page.click('.right a');
    const url = await page.url()
    
    expect(url).toMatch(/github\.com\/login\?/);
});    

test('When signed in, shows logout button', async() => {
    await page.login()
    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    
    expect(text).toEqual('Logout');
});