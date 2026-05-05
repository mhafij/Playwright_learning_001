// const {test, expect} = require("@playwright/test");

// const URL = 'https://www.automationexercise.com/';

// async function goToProductsPage(page) {
//     await page.goto(URL, {
//         timeout: 60000,
//         waitUntil: 'domcontentloaded'
//     });
//     console.log('✅ Home page loaded successfully');

//     // Page Scrolling
//     await page.evaluate(() => {
//         window.scrollTo({
//         top: document.body.scrollHeight,
//         behavior: 'smooth'
//         });
//     });

//     const subscribeEmail = page.locator('#susbscribe_email');
//     await subscribeEmail.scrollIntoViewIfNeeded();
//     await subscribeEmail.fill('test1@gmail.com');
//     await page.locator('#subscribe').click();
//     await page.locator('#success-subscribe').isVisible();
//     console.log('The successfull message is displayed');   
// }

// test('Home Page', async ({ page }) => {

//     // 1. Go To Home Page
//     await goToProductsPage(page);
// })


const { test, expect } = require("@playwright/test");

const BASE_URL = 'https://www.automationexercise.com/';
const TEST_EMAIL = 'test1@gmail.com';

async function subscribeFromHomePage(page) {

    // Step 1: Home page load
    await page.goto(BASE_URL, {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });

    // Step 2: Scroll to subscribe section
    await page.evaluate(() =>
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        
    );
    await page.waitForTimeout(1000);
    // Step 3: Fill subscribe email
    const subscribeEmail = page.locator('#susbscribe_email');
    await subscribeEmail.scrollIntoViewIfNeeded();
    await subscribeEmail.fill(TEST_EMAIL);



    const successPromise = page.waitForSelector('#success-subscribe', {
    state: 'visible',
    timeout: 10000
    });

    // Step 4: Click subscribe button
    await page.locator('#subscribe').click();

    await successPromise;
    console.log('✅ Subscribe successful!');

    // Step 5: Assert success message ✅
    // await expect(page.locator('#success-subscribe')).toBeVisible({timeout:5000});
    //console.log('The successfull message is displayed');

    // await expect(page.getByText('You have been successfully subscribed!'))
    // .toBeVisible({ timeout: 10000 });

    // await expect(page.locator('.alert-success'))
    // .toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: 'subscribe-success.png' });
    console.log('✅ Subscribe successful!');


    //   console.log('#success-subscribe visible:', 
    //     await page.locator('#success-subscribe').isVisible());
    // console.log('.alert-success visible:', 
    //     await page.locator('.alert-success').isVisible());
    // console.log('You have been successfully subscribed!', 
    //     await page.getByText('You have been successfully subscribed!').isVisible());

    // // Page এর HTML দেখি subscribe section এর কাছে
    // const html = await page.locator('#footer-bottom').innerHTML();
    // console.log('Footer HTML:', html);

}

test('Subscribe from Home Page', async ({ page }) => {
    await subscribeFromHomePage(page);
});