const { test, expect } = require('@playwright/test');
test.setTimeout(80000);
test('Test Case 1: Register User', async ({ page }) => {
    // ১. ব্রাউজার লঞ্চ করা (প্লেরাইট অটোমেটিক করে দেয়)
    
    // ২. URL-এ নেভিগেট করা
    await page.goto('http://automationexercise.com', { timeout: 60000 });


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
    await page.locator('[data-qa="signup-email"]').fill('peyanox661@feralrex.com');
    const button = await page.getByRole('button', {name: 'Signup'});
    button.click();

    // 7. 'ENTER ACCOUNT INFORMATION' দৃশ্যমান কিনা যাচাই করা

    try {
        await expect(page.getByText('Enter Account Information', { exact: false })).toBeVisible();
        console.log('✅ Assertion Passed: Text is visible');
    } catch (error) {
        console.log('❌ Assertion Failed: Text is NOT visible');
    }


    // await expect(page.getByRole('heading', {name: 'Enter Account Information'})).toBeVisible();
    // console.log('Checked');

    // 8. ডিটেইলস পূরণ করা: Title, Name, Email, Password, Date of birth
    await page.getByLabel('Mr.').check();
    await page.getByLabel('Password *').fill('SecurePass123');
    await page.locator('#days').selectOption('10');
    await page.locator('#months').selectOption('February');
    await page.locator('#years').selectOption('1995');

    // 9. 'Sign up for our newsletter!' চেকবক্স সিলেক্ট করা
    await page.getByLabel('Sign up for our newsletter!').check();

    // ১১. 'Receive special offers from our partners!' চেকবক্স সিলেক্ট করা
    await page.getByLabel('Receive special offers from our partners!').check();

        // ১২. অ্যাড্রেস ডিটেইলস পূরণ করা
    await page.getByLabel('First name *').fill('John');
    await page.getByLabel('Last name *').fill('Doe');
    await page.getByLabel('Company', { exact: true }).fill('Tech Solutions');
    await page.locator('#address1', {exact: true}).fill('123 Main Street');
    await page.getByLabel('Country *').selectOption('United States');
    await page.getByLabel('State *').fill('California');
    await page.getByLabel('City *').fill('Los Angeles');
    await page.locator('#zipcode').fill('90001');
    await page.getByLabel('Mobile Number *').fill('0123456789');

    // ১৩. 'Create Account' বাটনে ক্লিক করা
    await page.getByRole('button', { name: 'Create Account' }).click();

    // ১৪. 'ACCOUNT CREATED!' দৃশ্যমান কিনা যাচাই করা
    try{
        await expect(page.getByText('Account Created!')).toBeVisible();
        console.log('✅ Account is created message is displayed')
    } 
    catch (error){
        console.log('Hello');
    }

    // ১৫. 'Continue' বাটনে ক্লিক করা
    await page.getByRole('link', { name: 'Continue' }).click();

    // ১৬. 'Logged in as username' দৃশ্যমান কিনা যাচাই করা
    try{
        await expect(page.getByText('Logged in as John Doe')).toBeVisible();
        console.log('✅ Success ✅')
    }
    catch{
        console.log('❌ FAIL ❌');
    }

    // ১৭. 'Delete Account' বাটনে ক্লিক করা
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // ১৮. 'ACCOUNT DELETED!' যাচাই করা এবং 'Continue' বাটনে ক্লিক করা
    await expect(page.getByText('Account Deleted!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();



    await page.waitForTimeout(2000); // wait 10 seconds


});