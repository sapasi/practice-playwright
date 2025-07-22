import {expect, test} from '@playwright/test'

test.describe("Validate Contact Us Functionality", () =>{
    test("Perform Reset Operation", async ({page})=>{
        await page.goto("/")
        let contactUsSection = page.getByRole("link",{name: 'CONTACT US'});
        await contactUsSection.scrollIntoViewIfNeeded();
        await contactUsSection.click();

        let page1 = await page.waitForEvent('popup');

        let firstName = page1.getByPlaceholder("First Name");
        let lastName = page1.getByPlaceholder("Last Name");
        let email = page1.getByPlaceholder("Email Address");
        let comment = page1.getByPlaceholder("Comments");

        await firstName.fill("Ammy");
        await lastName.fill("Josef");
        await email.fill("Aj123@gmail.com");
        await comment.fill("Going to perform Reset operation");

        await expect(page1.getByRole('button',{name:'RESET'})).toBeVisible()
        await expect(page1.getByRole('button',{name:'SUBMIT'})).toBeVisible()

        await page1.getByRole('button',{name:'RESET'}).click()

        expect((await firstName.inputValue()).includes("")).toBeTruthy()
        expect((await lastName.inputValue()).includes("")).toBeTruthy()
        expect((await email.inputValue()).includes("")).toBeTruthy()
        expect((await comment.inputValue()).includes("")).toBeTruthy()

        await page1.close();
        await page.close();
    })

    test.only("Perform Submit Operation", async ({page})=>{
        await page.goto("/")

        let contactUs = page.getByRole('link',{name:'CONTACT US'});
        await contactUs.scrollIntoViewIfNeeded()
        await contactUs.click({clickCount:1, delay:5000})

        let page1 = await page.waitForEvent('popup');

        let firstName = page1.locator(".feedback-input")
        let lastName = page1.locator("[placeholder='Last Name']")
        let email = page1.locator("input[name='email']")
        let comment = page1.getByPlaceholder('Comments')

        await firstName.first().fill("Ammy");
        await lastName.fill("Josef");
        await email.fill("Aj123@gmail.com");
        await comment.fill("Going to perform Reset operation");

        await expect(page1.getByRole('button',{name:'RESET'})).toBeVisible()
        await expect(page1.getByRole('button',{name:'SUBMIT'})).toBeVisible()

        await page1.getByRole('button',{name:'SUBMIT'}).click();

        await expect(page1.getByRole('heading')).toHaveText("Thank You for your Message!")
        
        await page1.close();
        await page.close();
    })
})