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
    await page.getByRole('textbox', { name: 'Email Address' }).fill('test@gmail.com');

});