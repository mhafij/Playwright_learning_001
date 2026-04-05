const { test, expect } = require('@playwright/test');
test('Login and Logout', async({page})=>{
    await page.goto( 'http://automationexercise.com', { timeout: 60000});
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

    const isHomeHidden = await page.getByRole('link', { name: 'Home' }).isHidden();
    if (isHomeHidden) {
            console.log('Home link is hidden ✅');
        } else {
            console.log('Home link is visible ❌');
        }

    //Login and verify
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await page.locator('[data-qa="login-email"]').fill('peyanox650@feralrex.com');
    await page.getByPlaceholder('Password').fill('SecurePass123');
    await page.getByRole('button', {name:'Login' }).click();
    const isLoggedIn = await page.getByText('Logged in as').isVisible();
    if(isLoggedIn){
        console.log('✅ Login Successful');
    }else{
        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
        console.log('❌ Login Failed - Email or Password is incorrect');
    }

    //Logout and verify
    await page.getByRole('link', {name: ' Logout'}).click();
    await expect(page.getByText('Login to your account')).toBeVisible();
    console.log('Success');

})



// const { test, expect } = require('@playwright/test');

// // ✅ Test Data আলাদা রাখো
// const USER = {
//     email: 'peyanox650@feralrex.com',
//     password: 'SecurePass123',
// };

// const URL = 'http://automationexercise.com';

// // ====================================================
// // ✅ Helper Functions — বারবার ব্যবহার করা যাবে
// // ====================================================

// async function goToHomePage(page) {
//     await page.goto(URL, { timeout: 60000 });
//     await expect(page).toHaveTitle(/Automation Exercise/);
//     await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
//     console.log('✅ Home page loaded successfully');
// }

// async function login(page, email, password) {
//     await page.getByRole('link', { name: 'Signup / Login' }).click();
//     await page.locator('[data-qa="login-email"]').fill(email);
//     await page.getByPlaceholder('Password').fill(password);
//     await page.getByRole('button', { name: 'Login' }).click();

//     const isLoggedIn = await page.getByText('Logged in as').isVisible();

//     if (isLoggedIn) {
//         console.log('✅ Login Successful');
//     } else {
//         await expect(
//             page.getByText('Your email or password is incorrect!')
//         ).toBeVisible();
//         console.log('❌ Login Failed — Email or Password is incorrect');
//     }
// }

// async function logout(page) {
//     await page.getByRole('link', { name: ' Logout' }).click();
//     await expect(page.getByText('Login to your account')).toBeVisible();
//     console.log('✅ Logout Successful');
// }

// // ====================================================
// // ✅ Main Test
// // ====================================================

// test('Login and Logout', async ({ page }) => {

//     // ১. Home page এ যাও
//     await goToHomePage(page);

//     // ২. Login করো
//     await login(page, USER.email, USER.password);

//     // ৩. Logout করো
//     await logout(page);

// });