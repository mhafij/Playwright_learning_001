// Include Playwright Module
const{test, expect} = require('@playwright/test');

// Write a Test
test('Locators Test', async({page}) =>{
    // By Role
//     //Go To URL
//     await page.goto('https://www.google.com/');
    
//    // await page.getByLabel('Search', {exact:true}).fill('Test');
//     await page.getByTitle('Search', {exact:true}).fill('Test');
//     await page.waitForTimeout(7000);

//    // await page.getByPlaceholder('Search Google or type a URL',{exact:true}).fill('Test');



// By alt text
await page.goto('https://www.github.com/BakkappaN');
await page.getByAltText("View BakkappaN's full-sized avatar").click();

await page.waitForTimeOut(7000);




// // By test id
// await page.goto('https://www.github.com/login');
// await page.getByTestId('username').fill('tester talk');

// await page.waitForTimeOut(7000);



// // By text
// await page.goto('https://www.youtube.com/@testerstalk');
// await page.getByText('Cypress by Testers Talk').click();
// await page.waitForTimeout(7000);



// // By title
// await page.goto('https://www.youtube.com/@testerstalk');
// await page.getByTitle('Cypress by Testers Talk').click();
// await page.waitForTimeout(7000);



// // By xpath
// await page.goto('https://www.youtube.com');
// await page.locator("//*[@name='search_query']").click();
// await page.locator("xpath=//*[@name='search_query']").fill('javascript by testers talk');
// await page.locator("//*[@name='search_query']").press('Enter');

// await page.waitForTimeout(7000);



// By CSS Selector
// await page.goto('https://www.youtube.com');
// await page.locator("css=[name='search_query']").click();
// await page.locator("css=[name='search_query']").fill('javascript by testers talk');
// await page.locator("css=[name='search_query']").press('Enter');

// await page.waitForTimeout(7000);

}) 