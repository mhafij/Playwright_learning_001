const { test, expect } = require("@playwright/test");
test.setTimeout(80000);
const URL = 'https://www.automationexercise.com/test_cases';

async function visitTestCasesPage(page) {
    await page.goto(URL);
    await expect(page.locator('h2').filter({ hasText: 'Test Cases' })).toBeVisible({ timeout: 50000 });
    console.log('The test cases page is successfully loaded');
}

test('Visit the test case and verify the page', async({ page }) => {
    await visitTestCasesPage(page);
});






// test('Visit the test case page and verify the page', async({ page }) =>{
//     await page.goto('https://www.automationexercise.com/test_cases');
//     await expect(
//     page.locator('h2').filter({ hasText: 'Test Cases' })
// ).toBeVisible({ timeout: 50000 });
//     console.log('The test cases page is successfully loaded')

// });
