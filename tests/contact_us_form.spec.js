const { test, expect } = require("@playwright/test")

test('contact Us Form', async ({ page }) => {
    await page.goto('http://automationexercise.com', {timeout: 60000} );

    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

    const isHomeHidden = await page.getByRole('link', { name: 'Home' }).isHidden();
    if (isHomeHidden) {
            console.log('Home link is hidden ✅');
        } else {
            console.log('Home link is visible ❌');
        }

    await page.getByRole('link', { name: ' Contact us' }).click();
    await expect(page.getByText('Get In Touch')).toBeVisible();
    console.log('The get in touch is visible');

    await page.getByPlaceholder('Name').fill('Hafijur Rahman');
    await page.locator('input[name="email"]').fill('test@gmail.com');
    await page.getByPlaceholder('Subject').fill('Test subject');
    await page.getByPlaceholder('Your Message Here').fill('This text is used for testing purposes');
    await page.locator('input[name="upload_file"]').setInputFiles('tests/files/testssssssssss.txt');
    await page.locator('input[name="email"]').fill('test@gmail.com');

    // ✅ সঠিক — listener আগে, click পরে
    page.on('dialog', async (dialog) => {
        console.log('Alert message:', dialog.message());
        await dialog.accept();
        //await dialog.dismiss();
    });

    await page.locator('input[name="submit"]').click(); // তারপর click
    console.log('Good Job!');

    await page.waitForTimeout(2000); // wait 10 seconds 

    await page.waitForSelector('.alert-success', { timeout: 10000 });

    await expect(page.locator('.alert-success')).toBeVisible();



//     // ✅ alert-success class দিয়ে
// await expect(
//     page.locator('.alert-success')
// ).toBeVisible({ timeout: 10000 });
//     console.log('✅ Success message verified');


   

})



//  // =============================

// const { test, expect } = require("@playwright/test");

// // ====================================================
// // ✅ Test Data
// // ====================================================
// const URL = 'http://automationexercise.com';

// const CONTACT_FORM = {
//     name: 'Hafijur Rahman',
//     email: 'test@gmail.com',
//     subject: 'Test subject',
//     message: 'This text is used for testing purposes',
//     file: 'tests/files/testssssssssss.txt',
// };

// // ====================================================
// // ✅ Helper Functions
// // ====================================================

// async function goToHomePage(page) {
//     await page.goto(URL, { timeout: 60000 });
//     await expect(page).toHaveTitle(/Automation Exercise/);
//     await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
//     console.log('✅ Home page loaded successfully');
// }

// async function goToContactPage(page) {
//     await page.getByRole('link', { name: ' Contact us' }).click();
//     await expect(page.getByText('Get In Touch')).toBeVisible();
//     console.log('✅ Contact page loaded successfully');
// }

// async function fillContactForm(page) {
//     await page.getByPlaceholder('Name').fill(CONTACT_FORM.name);
//     await page.locator('input[name="email"]').fill(CONTACT_FORM.email);
//     await page.getByPlaceholder('Subject').fill(CONTACT_FORM.subject);
//     await page.getByPlaceholder('Your Message Here').fill(CONTACT_FORM.message);
//     await page.locator('input[name="upload_file"]').setInputFiles(CONTACT_FORM.file);
//     console.log('✅ Contact form filled successfully');
// }

// async function submitContactForm(page) {

//     // ✅ সবচেয়ে গুরুত্বপূর্ণ — submit এর আগে listener বসাও
//     page.on('dialog', async (dialog) => {
//         console.log('✅ Alert message:', dialog.message());
//         await dialog.accept(); // OK click করো
//     });

//     // ✅ তারপর submit করো
//     await page.locator('input[name="submit"]').click();
//     console.log('✅ Form submitted successfully');
// }

// async function verifySuccessMessage(page) {
//     await page.waitForLoadState('domcontentloaded');
//     await expect(
//         page.getByText('Success! Your details have been submitted successfully.')
//     ).toBeVisible({ timeout: 50000 });
//     console.log('✅ Success message verified');
// }

// // ====================================================
// // ✅ Main Test
// // ====================================================

// test('Contact Us Form', async ({ page }) => {

//     // ১. Home page এ যাও
//     await goToHomePage(page);

//     // ২. Contact page এ যাও
//     await goToContactPage(page);

//     // ৩. Form পূরণ করো
//     await fillContactForm(page);

//     // ৪. Form submit করো (Alert handle সহ)
//     await submitContactForm(page);

//     // ৫. Success message যাচাই করো
//     await verifySuccessMessage(page);

// });