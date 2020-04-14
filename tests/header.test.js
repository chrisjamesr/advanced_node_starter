const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
const Page = require('./helpers/page');

let page;


beforeEach( async ()=> {
    page = await Page.build();
    await page.goto('localhost:3000');
},15000);

afterEach( async () => {
    await page.close() 
});

afterAll( ()=> process.exit());

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
    const user = await userFactory();        
    const {session, sig} = sessionFactory(user);
    await page.setCookie({ name: 'session', value: session });
    await page.setCookie({ name: 'session.sig', value: sig });
    await page.goto('localhost:3000');
    
    await page.waitFor('a[href="/auth/logout"]')
    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    
    expect(text).toEqual('Logout');
});