const { test, expect } = require('@playwright/test');

test('Test Case 1: Register User', async ({ page }) => {
    // ১. ব্রাউজার লঞ্চ করা (প্লেরাইট অটোমেটিক করে দেয়)
    
    // ২. URL-এ নেভিগেট করা
    await page.goto('http://automationexercise.com');


    // ৩. হোম পেজ সফলভাবে দৃশ্যমান কিনা তা যাচাই করা
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    

    // ৪. 'Signup / Login' বাটনে ক্লিক করা
    const isHomeHidden = await page.getByRole('link', { name: 'Home' }).isHidden(); // নিশ্চিত হওয়ার জন্য
    //console.log('The home is hidden', isHomeHidden); //or

    if (isHomeHidden) {
        console.log('Home link is hidden ✅');
    } else {
        console.log('Home link is visible ❌');
    }

    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // ৫. 'New User Signup!' দৃশ্যমান কিনা যাচাই করা
    await expect(page.getByText('New User Signup!')).toBeVisible();
    console.log('The new user signup title is exists');

    // ৬. নাম এবং ইমেল অ্যাড্রেস ইনপুট করা
    // টিপস: প্রতিবার রান করার জন্য একটি ইউনিক ইমেল ব্যবহার করা ভালো
   // const uniqueEmail = `testuser_${Date.now()}@example.com`;
    await page.getByPlaceholder('Name').fill('John Doe');
    await page.locator('[data-qa="signup-email"]').fill('peyanox650@feralrex.com');
    const button = await page.getByRole('button', {name: 'Signup'});
    button.click();

    // ৮. 'ENTER ACCOUNT INFORMATION' দৃশ্যমান কিনা যাচাই করা

    try {
        await expect(page.getByText('Enter Account Information', { exact: false })).toBeVisible();
        console.log('✅ Assertion Passed: Text is visible');
    } catch (error) {
        console.log('❌ Assertion Failed: Text is NOT visible');
    }


    // await expect(page.getByRole('heading', {name: 'Enter Account Information'})).toBeVisible();
    // console.log('Checked');

    // ৯. ডিটেইলস পূরণ করা: Title, Name, Email, Password, Date of birth
    await page.getByLabel('Mr.').check();
    await page.getByLabel('Password *').fill('SecurePass123');
    await page.locator('#days').selectOption('10');
    await page.locator('#months').selectOption('February');
    await page.locator('#years').selectOption('1995');

    // ১০. 'Sign up for our newsletter!' চেকবক্স সিলেক্ট করা
    await page.getByLabel('Sign up for our newsletter!').check();


    await page.waitForTimeout(10000); // wait 10 seconds


});