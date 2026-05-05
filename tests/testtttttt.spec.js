const { test, expect } = require("@playwright/test");

test('Debug Subscribe', async ({ page }) => {
    await page.goto('https://www.automationexercise.com/', {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });

    await page.evaluate(() =>
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    );
    await page.waitForTimeout(2000);

    // Email field আছে কিনা দেখি
    const emailField = page.locator('#subscribe_email');
    console.log('Email field visible:', await emailField.isVisible());

    await emailField.fill('test999@gmail.com');
    await page.locator('#subscribe').click();

    await page.waitForTimeout(3000); // click এর পরে wait

    // সব possible selectors check করি
    console.log('#success-subscribe visible:', 
        await page.locator('#success-subscribe').isVisible());
    console.log('.alert-success visible:', 
        await page.locator('.alert-success').isVisible());
    console.log('success text visible:', 
        await page.getByText('successfully subscribed').isVisible());

    // Page এর HTML দেখি subscribe section এর কাছে
    const html = await page.locator('#footer-bottom').innerHTML();
    console.log('Footer HTML:', html);
});