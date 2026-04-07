const { test, expect } = require("@playwright/test");

const URL = 'https://www.automationexercise.com/products';

const searchData = {
     searchValue: 'Tshirt',
 };


async function VisitAllProductspageandverify(page) {
    await page.goto(URL);
    await expect(page.locator('h2').filter({ hasText: 'All Products' })).toBeVisible();
    console.log('The all products page is visible');
}

async function SearchField(page) {
    await page.locator('#search_product').fill(searchData.searchValue);
    await page.locator('#submit_search').click();
    await expect(
        page.locator('h2').filter({hasText: 'Searched Products'})
    ).toBeVisible();
    console.log('The searched results are successfully displayed');

}

test('visit All Products and Verify', async({ page }) => {
   await VisitAllProductspageandverify(page);

   await SearchField(page);
});

