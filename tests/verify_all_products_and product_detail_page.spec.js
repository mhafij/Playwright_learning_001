// const { test, expect } = require("@playwright/test");

// const URL = 'https://www.automationexercise.com/products';

// const searchData = {
//      searchValue: 'Tshirt',
//  };


// async function VisitAllProductspageandverify(page) {
//     await page.goto(URL);
//     await expect(page.locator('h2').filter({ hasText: 'All Products' })).toBeVisible();
//     console.log('The all products page is visible');
// }

// async function SearchField(page) {
//     await page.locator('#search_product').fill(searchData.searchValue);
//     await page.locator('#submit_search').click();
//     await expect(
//         page.locator('h2').filter({hasText: 'Searched Products'})
//     ).toBeVisible();
//     console.log('The searched results are successfully displayed');

// }


// test('visit All Products and Verify', async({ page }) => {
//    await VisitAllProductspageandverify(page);

//    await SearchField(page);
// });





//===========================================================

const { test, expect } = require("@playwright/test");

// ====================================================
// ✅ Test Data
// ====================================================
const URL = 'https://www.automationexercise.com/products';

const EXPECTED = {
    productIndex : 1,
    reviewLink   : 'Write Your Review',
    category     : 'Category: Men',
    price        : 'Rs. 400',
    availability : 'In Stock',
    condition    : 'New',
    brand        : 'H&M',
};

const SEARCH = {
    value : 'Tshirt',
};

// ====================================================
// ✅ Helper Functions
// ====================================================

async function goToProductsPage(page) {
    await page.goto(URL, {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });
    await expect(
        page.locator('h2').filter({ hasText: 'All Products' })
    ).toBeVisible();
    console.log('✅ All products page loaded successfully');
}

async function printProductList(page) {
    const productCount = await page.locator('.product-image-wrapper').count();
    console.log(`✅ Total Products: ${productCount}`);

    const names  = page.locator('.productinfo p');
    const prices = page.locator('.productinfo h2');
    const count  = await names.count();

    console.log('--- Product List ---');
    for (let i = 0; i < count; i++) {
        const name  = await names.nth(i).innerText();
        const price = await prices.nth(i).innerText();
        console.log(`${i + 1}. ${name} — ${price}`);
    }
}

async function searchProduct(page) {
    await page.locator('#search_product').fill(SEARCH.value);
    await page.locator('#submit_search').click();
    await expect(
        page.locator('h2').filter({ hasText: 'Searched Products' })
    ).toBeVisible();
    console.log(`✅ Search results displayed for: ${SEARCH.value}`);
}

async function goToProductDetail(page, index) {
    await page.getByRole('link', { name: 'View Product' }).nth(index).click();

    const isLoaded = await page
        .getByRole('link', { name: EXPECTED.reviewLink })
        .isVisible();

    if (isLoaded) {
        console.log('✅ Product detail page loaded successfully');
    } else {
        console.log('❌ Product detail page not loaded');
    }
}

async function verifyProductDetails(page) {

    // ✅ Category
    const isCategoryVisible = await page
        .getByText(EXPECTED.category)
        .isVisible();

    if (isCategoryVisible) {
        console.log(`✅ Category visible: ${EXPECTED.category}`);
    } else {
        console.log(`❌ Category not found: ${EXPECTED.category}`);
    }

    // ✅ Price
    await expect(
        page.getByText(EXPECTED.price)
    ).toBeVisible({ timeout: 10000 });
    console.log(`✅ Price displayed: ${EXPECTED.price}`);

    // ✅ Availability
    const availability = await page
        .locator('p:has-text("Availability")')
        .textContent();

    if (availability.includes(EXPECTED.availability)) {
        console.log('✅ Product is in stock');
    } else {
        console.log('❌ Product is not in stock');
    }

    // ✅ Condition
    const condition = await page
        .locator('p:has-text("Condition")')
        .textContent();

    if (condition.includes(EXPECTED.condition)) {
        console.log(`✅ Product condition is: ${EXPECTED.condition}`);
    } else {
        console.log(`❌ Product condition is not: ${EXPECTED.condition}`);
    }

    // ✅ Brand
    const brand = await page
        .locator('p:has-text("Brand")')
        .innerText();

    if (brand.includes(EXPECTED.brand)) {
        console.log(`✅ Product brand is: ${EXPECTED.brand}`);
    } else {
        console.log(`❌ Product brand is not: ${EXPECTED.brand}`);
    }
}

// ====================================================
// ✅ Test 1 — Products list দেখাও
// ====================================================

test('Count and list all products', async ({ page }) => {

    // ১. Products page এ যাও
    await goToProductsPage(page);

    // ২. Products list ও price দেখাও
    await printProductList(page);

     // ১. Product search করো
    await searchProduct(page);

       // ১. Products page এ যাও
    await goToProductsPage(page);

    // ২. Product detail page এ যাও
    await goToProductDetail(page, EXPECTED.productIndex);

    // ৩. Product details verify করো
    await verifyProductDetails(page);

});

// ====================================================
// ✅ Test 2 — Product search করো
// ====================================================

// test('Search product and verify results', async ({ page }) => {

//     // ১. Product search করো
//     await searchProduct(page);

// });

// ====================================================
// ✅ Test 3 — Product detail verify করো
// ====================================================

// test('View and verify product details', async ({ page }) => {

//     // ১. Products page এ যাও
//     await goToProductsPage(page);

//     // ২. Product detail page এ যাও
//     await goToProductDetail(page, EXPECTED.productIndex);

//     // ৩. Product details verify করো
//     await verifyProductDetails(page);

// });