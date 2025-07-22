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

    test("Perform Submit Operation", async ({page})=>{
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


test.describe("Validate Login Functionality",async ()=>{
    test("Perform Login with Correct Credentials", async ({page})=>{
        await page.goto("/");
        let loginPortal = page.getByRole("link",{name: 'LOGIN PORTAL'})
        await loginPortal.scrollIntoViewIfNeeded()
        await loginPortal.click();

        const page1 =  await page.waitForEvent('popup');

        let username = page1.getByPlaceholder("Username")
        let password = page1.getByPlaceholder("Password")
        let loginButton = page1.getByRole("button",{name:'Login'})

        await username.fill('webdriver',{force:true});
        await password.pressSequentially('webdriver123');
          
        page1.on('dialog', dialog =>{
            expect(dialog.message()).toEqual("validation succeeded")
            dialog.accept()
        })

        await loginButton.click({delay:2000})
       
        await page1.close();
        await page.close();
    })

    test("Perform Login with Invalid Credentials", async ({page})=>{
        await page.goto("/")
        let loginPortal = page.getByRole('link',{name:'Login Portal'});
        await loginPortal.scrollIntoViewIfNeeded();
        await loginPortal.click();

        const page1 = await page.waitForEvent('popup');

        await page1.getByPlaceholder("Username").fill("webdriver");
        await page1.getByPlaceholder("Password").fill("webdriver");

        page1.on('dialog', dialog=>{
            expect(dialog.message()).toEqual("validation failed")
            dialog.accept();
        })

        await page1.getByRole("button",{name:'Login'}).click();

        await page1.close();
        await page.close();

    })
})

test.describe("Validating Button Click Actions", async ()=>{
    test("Webelement Click",async ({page})=>{

        await page.goto("/")
        let buttonClicks = page.getByRole('link',{name:'BUTTON CLICKS'})

        await buttonClicks.scrollIntoViewIfNeeded()
        await buttonClicks.click()

        const page1 = await page.waitForEvent('popup')

        let webElementClick = page1.getByText("CLICK ME!",{exact:true})
        await webElementClick.click({delay:2000})
        await page1.getByRole('button', { name: 'Close' }).click();
    })

    test("Mouse Move and Click", async ({page})=>{
        await page.goto("/")
        let buttonClicks = page.getByRole('link',{name:'BUTTON CLICKS'})

        await buttonClicks.scrollIntoViewIfNeeded()
        await buttonClicks.click()

        const page1 = await page.waitForEvent('popup')
        let webElementClick = page1.getByText("CLICK ME!!!",{exact:true})

        await webElementClick.highlight();
        await webElementClick.hover();
        await page1.mouse.down()
        await page1.mouse.up()

        await page1.getByRole('button', { name: 'Close' }).click();
    })
})

test.describe("Validate To-Do List", ()=>{
    
    test("Verify Default To-Do List", async ({page})=>{
        await page.goto("/")
        const toDoLink = page.getByRole('link',{name:'TO DO LIST'})
        await toDoLink.scrollIntoViewIfNeeded()
        await toDoLink.click()

        const page1 = await page.waitForEvent('popup')

        await expect(page1.getByRole('heading',{name:'TO-DO LIST '})).toBeVisible()
        await expect(page1.getByPlaceholder('Add new todo')).toBeVisible()

        const items = await page1.getByRole('listitem').allTextContents();
        expect(items).toEqual([" Go to potion class", " Buy new robes", " Practice magic"])
        
    })

    test("Add new To-Do List", async ({page})=>{
        await page.goto("/")
        const toDoLink = page.locator("#to-do-list")
        await toDoLink.scrollIntoViewIfNeeded()
        await toDoLink.click()

        const page1 = await page.waitForEvent('popup')
               
        await expect(page1.getByRole('heading',{name:'TO-DO LIST '})).toBeVisible()
        await expect(page1.getByPlaceholder('Add new todo')).toBeVisible()

        await page1.getByPlaceholder('Add new todo').fill("My Own List Item")
        const items = await page1.getByRole('listitem').allTextContents();
        expect(items).toEqual([" Go to potion class", " Buy new robes", " Practice magic"])

    })

    test("Remove recently added To-Do List", async ({page})=>{
        await page.goto("/")
        const toDoLink = page.getByText('TO DO LIST',{exact:true})
        await toDoLink.scrollIntoViewIfNeeded()
        await toDoLink.click();

        const page1 = await page.waitForEvent('popup')

        await expect(page1.getByRole('heading',{name:'TO-DO LIST '})).toBeVisible()
        await expect(page1.getByPlaceholder('Add new todo')).toBeVisible()

        let item = page1.getByRole('listitem').filter({has: page1.getByText(' Go to potion class')})
        await item.click()
        await page1.waitForTimeout(1000);
        await item.locator("span").click()
        await page1.waitForTimeout(2000);
        const items = await page1.getByRole('listitem').allTextContents();
        expect(items).toEqual([" Buy new robes", " Practice magic"])
        expect(await item.isVisible()).toBeFalsy()

    })
})