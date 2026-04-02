const { test, expect } = require('@playwright/test');
test('Login, Check and Delete Account', async({ page }) =>{

    await page.goto('http://automationexercise.com', { timeout: 60000 });

    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    
    const isHomeHidden = await page.getByRole('link', { name: 'Home' }).isHidden();

        if (isHomeHidden) {
            console.log('Home link is hidden ✅');
        } else {
            console.log('Home link is visible ❌');
        }

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

});