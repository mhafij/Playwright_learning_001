const { test, expect } = require("@playwright/test");

test('Count and List Products', async ({ page }) => {

    await page.goto('https://www.automationexercise.com/products', {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });

    // ✅ Product count
    const products = page.locator('.product-image-wrapper');
    const productCount = await products.count();
    console.log(`✅ Total Products: ${productCount}`);

    // ✅ প্রতিটা product এর নাম দেখাও
    const productNames = page.locator('.productinfo p');
    const nameCount = await productNames.count();

    console.log('--- Product List ---');
    for (let i = 0; i < nameCount; i++) {
        const name = await productNames.nth(i).innerText();
        console.log(`${i + 1}. ${name}`);
    }

    // ✅ প্রতিটা product এর দাম দেখাও
    const productPrices = page.locator('.productinfo h2');
    console.log('--- Product Prices ---');
    for (let i = 0; i < nameCount; i++) {
        const price = await productPrices.nth(i).innerText();
        console.log(`${i + 1}. ${price}`);
    }

     // ✅ Option 3 — Link text দিয়ে
    await page.getByRole('link', { name: 'View Product' }).nth(1).click();

});