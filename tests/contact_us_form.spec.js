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
    await page.locator('input[name="submit"]').click();
    console.log('Good Job!');
    

      // 👇 Alert handle করার জন্য listener
  page.on('dialog', async (dialog) => {
    console.log('Alert message:', dialog.message());
    await dialog.accept(); // OK button click
  });


//    const dialog = await dialogPromise;
//    console.log('Alert message:', dialog.message());
//    await dialog.accept();



})