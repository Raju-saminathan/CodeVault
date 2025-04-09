class SignUpPage {
    constructor(page) {
        this.page = page;
        this.signUplink = '(//a[text()="Create an Account"])[1]'
        this.firstName = '#firstname';
        this.lastName = '#lastname'
        this.email = '#email_address'
        this.passwordField = '#password';
        this.confrimPassword = '#password-confirmation'
        this.passwordStrength = '#password-strength-meter-label'
        this.passwordError = '#password-error'
        this.passwordConfirmError = '#password-confirmation-error'
        this.emailError = '//div[@for="email_address"]'
        this.nameError = '//div[@role="alert"]'
        this.createAccountButton = '//button[@class="action submit primary"]'
        this.successMessage = '//div[@data-bind="scope: \'messages\'"]'
        this.signInlink = "(//a[contains(text(), 'Sign')])[1]"
        this.loginInput = '#email'
        this.passInput = '#pass'
        this.signInButton = '(//span[text()="Sign In"])[1]'
        this.user = '(//span[@class="logged-in"])[1]'
    }

    async navigate() {
        await this.page.goto('https://magento.softwaretestingboard.com/');
        await this.page.waitForLoadState('load');
    }

    async signIn(page, email, password) {
        await this.page.locator(this.signInlink).click()
        await this.page.fill(this.loginInput, email)
        await this.page.fill(this.passInput, password)
        await this.page.click(this.signInButton)
    }

    async validateUser() {
        await this.page.waitForSelector(this.user);
        const userNameText = await this.page.locator(this.user).innerText()
        let successMessageText = ''
        const sucessMessage = await this.page.locator(this.successMessage).isVisible()
        if (sucessMessage) {
            const successText = await this.page.locator(this.successMessage).textContent()
            successMessageText = successText.replace(/\s+/g, ' ').trim()
        }

        return { userNameText, successMessageText }
    }

    async fillForm(username, lastname, email, password) {
        await this.page.locator(this.signUplink).click()
        await this.page.fill(this.firstName, username);
        await this.page.fill(this.lastName, lastname);
        await this.page.fill(this.email, email);
        await this.page.type(this.passwordField, password);
        await this.page.type(this.confrimPassword, password);
    }

    async fillFormDuplicate(username, lastname, email, password, confirmPass) {
        await this.page.locator(this.signUplink).click()
        await this.page.fill(this.firstName, username);
        await this.page.fill(this.lastName, lastname);
        await this.page.fill(this.email, email);
        await this.page.type(this.passwordField, password);
        await this.page.type(this.confrimPassword, confirmPass);
    }


    async extractErrors() {
        await this.submitForm()
        const nameErrTextIsVisible = await this.page.locator(this.nameError).isVisible();
        const mailErrTextIsVisible = await this.page.locator(this.emailError).isVisible();
        const passwordErrorIsVisible = await this.page.locator(this.passwordError).isVisible()
        const passwordConfirmErrorIsVisible = await this.page.locator(this.passwordConfirmError).isVisible()
        let nameErrText = '', mailErrorText = '', passwordErrorText = '', passwordConfirmErrorText = ''
        if (nameErrTextIsVisible) {
            const ele = await this.page.locator(this.nameError)
            const nameText = await ele.textContent()
            nameErrText = nameText.replace(/\s+/g, ' ').trim()
        }
        else if (mailErrTextIsVisible) {
            const mailError = await this.page.locator(this.emailError)
            const mailText = await mailError.textContent()
            mailErrorText = mailText.replace(/\s+/g, ' ').trim()
        }
        else if (passwordErrorIsVisible) {
            const passwordError = await this.page.locator(this.passwordError)
            const passError = await passwordError.textContent()
            passwordErrorText = passError.replace(/\s+/g, ' ').trim()
        }
        else if (passwordConfirmErrorIsVisible) {
            const passwordConfirmError = await this.page.locator(this.passwordConfirmError)
            const passConfirmError = await passwordConfirmError.textContent()
            passwordConfirmErrorText = passConfirmError.replace(/\s+/g, ' ').trim()
        }

        return { nameErrText, mailErrorText, passwordErrorText, passwordConfirmErrorText }
    }

    async passwordStrengthCalc() {
        const passwordStrength = await this.page.locator(this.passwordStrength)
        const strength = await passwordStrength.textContent()
        return strength.replace(/\s+/g, ' ').trim()
    }

    async submitForm() {
        await this.page.locator(this.createAccountButton).click();
        await this.page.waitForLoadState('load');
    }
}

export default SignUpPage;
