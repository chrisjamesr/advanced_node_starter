const puppeteer = require('puppeteer'); 
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
    const id = '5e94cf62996ae4049a7e7c53';

    const Buffer = require('safe-buffer').Buffer;

    const sessionObject = {
        passport: {
            user: id
        }
    };
    const sessionString = Buffer.from(
        JSON.stringify(sessionObject))
        .toString('base64');
    const Keygrip = require('keygrip');
    const keys = require('../config/keys.js')
    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign('session=' + sessionString);

    await page.setCookie({ name: 'session', value: sessionString });
    await page.setCookie({ name: 'session.sig', value: sig });
    await page.goto('localhost:3000');

    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    
    expect(text).toEqual('Logout');

});