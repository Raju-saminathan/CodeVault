import { test, expect } from '@playwright/test'
import * as functions from '../steps/signUpSteps'

test.describe('signUp Tests', () => {
    test('Create an account with valid details', async ({ page }) => {
        await functions.fillAllDetails(page, 'rams', 'kumars', 'ramks@gmail.com', 'Ramkumar@23!123.');
        const passStrength = await functions.passStrength(page)
        const userValidation = await functions.validateUser(page)
        await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/create/');
        expect(passStrength.strength).toBe('Very Strong')
        expect(userValidation.successMessageText).toBe('Thank you for registering with Main Website Store.')
        expect(userValidation.userNameText).toBe('Welcome, ram kumar!')
    });

    test('Create an account with invalid first and last name', async ({ page }) => {
        await functions.fillAllDetails(page, '@*sami', ':"nathan', 'gonaths@gmail.com', 'Gonath@123');
        const errorMsg = await functions.validateFields(page)
        expect(errorMsg.errorText.nameErrText).toBe('First Name is not valid! Last Name is not valid!')
    });

    test('Create an account with invalid first name', async ({ page }) => {
        await functions.fillAllDetails(page, '@*sami', 'nathan', 'gonaths@gmail.com', 'Gonath@123');
        const errorMsg = await functions.validateFields(page)
        expect(errorMsg.errorText.nameErrText).toBe('First Name is not valid!')
    });

    test('Create an account with invalid last name', async ({ page }) => {
        await functions.fillAllDetails(page, 'sami', ':"nathan', 'gonaths@gmail.com', 'Gonath@123');
        const errorMsg = await functions.validateFields(page)
        expect(errorMsg.errorText.nameErrText).toBe('Last Name is not valid!')
    });

    test('Create an account with invalid email ID', async ({ page }) => {
        await functions.fillAllDetails(page, 'sami', 'nathan', 'sami123.com', 'Gonath@123');
        const errorMsg = await functions.validateFields(page)
        expect(errorMsg.errorText.mailErrorText).toBe('Please enter a valid email address (Ex: johndoe@domain.com).')
    });

    test('Create an account with Weak password', async ({ page }) => {
        await functions.fillAllDetails(page, 'sami', 'nathan', 'gonathsf@gmail.com', 'sami111');
        const passStrength = await functions.passStrength(page)
        const errorMsg = await functions.validateFields(page)
        expect(passStrength.strength).toBe('Weak')
        expect(errorMsg.errorText.passwordErrorText).toBe('Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.')
    });

    test('Create an account with Weak password with more characters', async ({ page }) => {
        await functions.fillAllDetails(page, 'sami', 'nathan', 'gonathsss@gmail.com', 'ramukumarravichangar');
        const passStrength = await functions.passStrength(page)
        const errorMsg = await functions.validateFields(page)
        expect(passStrength.strength).toBe('Weak')
        expect(errorMsg.errorText.passwordErrorText).toBe('Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.')
    });

    test('Create an account with Medium password with different value in confirm password', async ({ page }) => {
        await functions.fillSameDetails(page, 'sami', 'nathan', 'gonathss@gmail.com', 'sami@2000', 'sami2000');
        const passStrength = await functions.passStrength(page)
        const errorMsg = await functions.validateFields(page)
        expect(passStrength.strength).toBe('Medium')
        expect(errorMsg.errorText.passwordConfirmErrorText).toBe('Please enter the same value again.')
    });

    test('Create an account with Storng password', async ({ page }) => {
        await functions.fillAllDetails(page, 'sami', 'nathan', 'gonathsss@gmail.com', 'sami@2000!');
        const passStrength = await functions.passStrength(page)
        expect(passStrength.strength).toBe('Strong')
        await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/create/');
    });

    test('Create an account with Very Storng password', async ({ page }) => {
        await functions.fillAllDetails(page, 'sami', 'nathan', 'gonathssees@gmail.com', 'sami@2000nath!');
        const passStrength = await functions.passStrength(page)
        expect(passStrength.strength).toBe('Very Strong')
        await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/create/');
    });

    test('Create an account with same mail ID', async ({ page }) => {
        await functions.fillAllDetails(page, 'sami', 'nathan', 'gonathssees@gmail.com', 'sami@2000!');
        const passStrength = await functions.passStrength(page)
        const errorMsg = await functions.validateFields(page)
        expect(passStrength.strength).toBe('Strong')
        expect(errorMsg.errorText.nameErrText).toBe('There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.')
    });

    test('Login the created user', async ({ page }) => {
        await functions.login(page, 'firstname@gmail.com', 'Sami@1998')
        const validationText = await functions.validateUser(page)
        expect(validationText.userNameText).toBe('Welcome, first name!')
    })

});
