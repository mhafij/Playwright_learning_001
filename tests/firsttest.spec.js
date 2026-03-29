// Include playwrirght module
const {test, expect} = require('@playwright/test');

/*এই লাইনটি: const { test, expect } = require('@playwright/test');
খুব সহজ ভাষায় এর অর্থ হলো: আমরা Playwright-এর মেইন লাইব্রেরি থেকে আমাদের কাজের জন্য প্রয়োজনীয় দুটি টুল (test এবং expect) ধার নিচ্ছি বা ইম্পোর্ট করছি।

আসুন লাইনটি ভেঙে ভেঙে বুঝি:

১. require('@playwright/test'): এটি আপনার প্রজেক্টের node_modules ফোল্ডার থেকে Playwright Test নামক লাইব্রেরি বা প্যাকেজটি লোড করছে। সহজ কথায়, এটি অটোমেশন করার জন্য প্রয়োজনীয় সম্পূর্ণ 'টুলবক্স'-টি নিয়ে আসছে।

২. const { test, expect }: এখানে Object Destructuring (অবজেক্ট ডিস্ট্রাকচারিং) ব্যবহার করা হয়েছে। ওই 'টুলবক্স'-এ অনেক কিছু আছে, কিন্তু আমাদের সব দরকার নেই। আমাদের আপাতত শুধু দুটি জিনিস দরকার:

test: এটি ব্যবহার করা হয় টেস্ট কেস (Test Case) তৈরি বা ডিক্লেয়ার করার জন্য।

expect: এটি ব্যবহার করা হয় ফলাফল যাচাই (Validation/Assertion) করার জন্য। (যেমন: টাইটেল ঠিক আছে কি না, বাটন দেখা যাচ্ছে কি না ইত্যাদি)।

৩. = (সমান চিহ্ন): এর মাধ্যমে বলা হচ্ছে, ডান পাশের লাইব্রেরি থেকে test এবং expect ফাংশনগুলো নিয়ে বাম পাশের ভেরিয়েবলে জমা করো, যাতে আমরা কোডের নিচে এগুলো ব্যবহার করতে পারি।

একটি উদাহরণ দিয়ে বুঝুন: ধরুন, @playwright/test হলো একটি রান্নার কিট। এই কিটের মধ্যে হাড়ি, পাতিল, চামচ, মশলা সব আছে। কিন্তু আপনার শুধু কড়াই (test) এবং লবণ (expect) দরকার। 
এই কোডটি লেখার মাধ্যমে আপনি পুরো কিট থেকে শুধু কড়াই আর লবণ বের করে আপনার টেবিলে রাখলেন, যাতে রান্না শুরু করতে পারেন। */


// Write a test case
test('Validate youtube title', async({page}) =>{
// Go to URL
    await page.goto('https://www.youtube.com/');

// Search with keywords
    await page.getByRole('combobox', { name: 'Search' }).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('cypress by tester talks');

    await expect(page.getByRole('button', {name:'Search', exact:true})).toBeEnabled();
    await page.getByRole('button', { name: 'Search', exact: true }).click();

    await page.waitForTimeout(5000);
// Click on playlist

        await page.getByRole('link', { name: 'Cypress by Testers Talk☑️' }).click();

// Validate title
        await expect(page).toHaveTitle('Cypress Tutorial Full Course | Cypress Automation | Learn Cypress in 5 Hrs - YouTube');
})
