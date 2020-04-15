const puppeteer = require('puppeteer');
const Page = require('./helpers/page');

let page;


beforeEach( async ()=> {
    page = await Page.build();
    await page.goto('localhost:3000');
});

afterEach( async () => {
    await page.close() 
});

// afterAll( ()=> process.exit());

test('the header has the correct text', async () => {
    const text = await page.getContentsOf('a.brand-logo')
    
    expect(text).toEqual('Blogster');
});   

test('clicking login link kicks off OAuth flow', async () => {
    await page.click('.right a');
    const url = await page.url()
    
    expect(url).toMatch(/github\.com\/login\?/);
});    

test('When signed in, shows logout button', async() => {
    await page.login()
    const text = await page.getContentsOf('a[href="/auth/logout"]');
    
    expect(text).toEqual('Logout');
});