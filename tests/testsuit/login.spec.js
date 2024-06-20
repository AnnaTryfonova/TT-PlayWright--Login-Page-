import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Login';

//Check with valid data
test('Login with valid data', async ({ page }) => {

    const Login = new LoginPage(page)

    await Login.gotoLoginPage()
    await Login.login('tomsmith', 'SuperSecretPassword!')
    expect(await page.locator('div#flash.flash.success').innerText()).toContain(' You logged into a secure area!')

})

//Check for empty input fields
test('Login form validation', async ({page}) => {
    
    const Login = new LoginPage(page)

    await Login.gotoLoginPage()
    await Login.login('', '')
    expect(await page.locator('div#flash.flash.error').innerText()).toContain(' Your username is invalid!')
})

//Check for incorrect Data Input
test('Login with incorrect data', async ({ page }) => {

    const Login = new LoginPage(page)

    await Login.gotoLoginPage()
    await Login.login('tomsmithtttyy', 'SuperSecret')
    expect(await page.locator('div#flash.flash.error').innerText()).toContain(' Your username is invalid!')

})

//Check handling of Spaces in Input fields
test('Login with handling of Spaces in Input fields', async ({ page }) => {

    const Login = new LoginPage(page)

    await Login.gotoLoginPage()
    await Login.login('tomsmith  ', 'SuperSecretPassword !')
    expect(await page.locator('div#flash.flash.error').innerText()).toContain(' Your username is invalid!')

})

//Check 
test('Login form with numeric values', async ({ page }) => {

    const Login = new LoginPage(page)

    await Login.gotoLoginPage()
    await Login.login('11111', '77878788')
    expect(await page.locator('div#flash.flash.error').innerText()).toContain(' Your username is invalid!')

})

