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

   const T = await page.getByRole('link', { name: 'Write Your Review'}).isVisible();
    console.log('The product detail page is successfully loaded', T);


//    // await expect(page.getByTitle('T-shirts')).toHaveText('T-Shirts');
    const productName = await page.getByTitle('T-Shirts').isVisible();
    console.log('This product name is:', productName);

    const CategoryName = await page.getByText('Category: Men').isVisible();
    console.log('This category name is:', CategoryName);

    await expect(page.getByText('Rs. 400')).toBeVisible();
    console.log('The price name is displayed successfully');

    const text = await page.locator('p:has-text("Availability")').textContent();

        if (text.includes('In Stock')) {
        console.log('✅ Product is in stock');
        } else {
        console.log('❌ Product is not in stock');
        }

        // //Ternary Operator 
        // const condition = await page.locator('p:has-text("Condition")').textContent();

        //     const message = condition.includes('New')
        //     ? 'The product condition is new ✅'
        //     : 'The product condition is not new ❌';

    const condition = await page.locator('p:has-text("Condition")').textContent();
        if(condition.includes('New')){
            console.log('✅ The product condition is new');
        }else{
            console.log('❌ The product condition is not new');
        }

    const Brand = await page.locator('p:has-text("Brand")').innerText();

        if (Brand.includes('H&M')) {
            console.log('✅ The product Brand is H&M');
        } else {
            console.log('❌ The product brand is not H&M');
        }


});