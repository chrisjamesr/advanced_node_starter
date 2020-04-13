const puppeteer = require('puppeteer'); 
const sessionFactory = require('./factories/sessionFactory');

let page, browser;

beforeEach( async ()=> {
    browser = await puppeteer.launch({
        headless: false, 
    });
    page = await browser.newPage();
    await page.goto('localhost:3000');
},15000);

afterEach( async () => {
    await browser.close() 
});

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
        
    const {session, sig} = sessionFactory();
    await page.setCookie({ name: 'session', value: session });
    await page.setCookie({ name: 'session.sig', value: sig });
    await page.goto('localhost:3000');
    
    await page.waitFor('a[href="/auth/logout"]')
    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    
    expect(text).toEqual('Logout');
});