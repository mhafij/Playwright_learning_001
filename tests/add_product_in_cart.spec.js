const { test, expect } = require("@playwright/test");

const URL = 'https://www.automationexercise.com/products';



test('Add Products to Cart and Verify', async ({ page }) => {

    // Step 1 & 2: Launch browser and Navigate to URL
    await page.goto(URL, {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });

    const secondProduct = page.locator('.productinfo').second();
    await secondProduct.hover();
    await secondProduct.locator('a.add-to-cart').second().click();
    console.log('The Second Product added to cart');

});



