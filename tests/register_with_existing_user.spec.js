// const {test, expect } = require("@playwright/test");

// test('Register with existing user', async({ page }) => {

//     await page.goto('http://automationexercise.com', { timeout: 60000} );
//     await expect(page).toHaveTitle(/Automation Exercise/);
//     await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    
//     const isHomeHidden = await page.getByRole('link', { name: 'Home' }).isHidden();

//         if (isHomeHidden) {
//             console.log('Home link is hidden ✅');
//         } else {
//             console.log('Home link is visible ❌');
//         }

//     await page.getByRole('link', { name: 'Signup / Login' }).click();
//     await expect(page.getByText('New User Signup!')).toBeVisible();
//     console.log('The new user signup title is exists');

//     await page.locator('[data-qa="signup-email"]').fill('peyanox650@feralrex.com');
//     await page.getByPlaceholder('Name').fill('John Doe');
//     const button = await page.getByRole('button', {name: 'Signup'});
//     button.click();

//     await expect(page.getByText('Email Address already exist!')).toBeVisible();
//     console.log('Email Exists!');

// })


//==========================================

const { test, expect } = require('@playwright/test');

// ====================================================
// ✅ Test Data
// ====================================================
const URL = 'http://automationexercise.com';

const EXISTING_USER = {
    name: 'John Doe',
    email: 'peyanox650@feralrex.com',
};

// ====================================================
// ✅ Helper Functions
// ====================================================

async function goToHomePage(page) {
    await page.goto(URL, { timeout: 60000 });
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    console.log('✅ Home page loaded successfully');
}

async function goToSignupPage(page) {
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page.getByText('New User Signup!')).toBeVisible();
    console.log('✅ Signup page loaded successfully');
}

async function fillSignupForm(page, name, email) {
    await page.getByPlaceholder('Name').fill(name);
    await page.locator('[data-qa="signup-email"]').fill(email);

    // ✅ await যোগ করা হয়েছে — আগে ছিল না
    await page.getByRole('button', { name: 'Signup' }).click();
}

async function verifyEmailAlreadyExists(page) {
    await expect(page.getByText('Email Address already exist!')).toBeVisible({ timeout: 10000 });
    console.log('✅ Error message verified — Email already exists');
}

// ====================================================
// ✅ Main Test
// ====================================================

test('Register with existing user', async ({ page }) => {

    // ১. Home page এ যাও
    await goToHomePage(page);

    // ২. Signup page এ যাও
    await goToSignupPage(page);

    // ৩. Existing user দিয়ে form পূরণ করো
    await fillSignupForm(page, EXISTING_USER.name, EXISTING_USER.email);

    // ৪. Error message যাচাই করো
    await verifyEmailAlreadyExists(page);

});