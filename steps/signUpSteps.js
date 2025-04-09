import SignUpPage from "../pages/siginUpPage";

export async function fillAllDetails(page, firstName, lastName, email, password) {
    const signUpPage = new SignUpPage(page);
    await signUpPage.navigate();
    await signUpPage.fillForm(firstName, lastName, email, password);
}

export async function login(page, email, password) {
    const signUpPage = new SignUpPage(page)
    await signUpPage.navigate();
    await signUpPage.signIn(page, email, password)
}

export async function validateUser(page){
    const signUpPage = new SignUpPage(page)
    const userValidation = await signUpPage.validateUser()
    return userValidation
}

export async function validateFields(page) {
    const signUpPage = new SignUpPage(page);
    const errorText = await signUpPage.extractErrors()
    return { errorText: errorText }
}

export async function fillSameDetails(page, firstName, lastName, email, password, confirmPass) {
    const signUpPage = new SignUpPage(page);
    await signUpPage.navigate();
    await signUpPage.fillFormDuplicate(firstName, lastName, email, password, confirmPass);
}

export async function passStrength(page) {
    const signUpPage = new SignUpPage(page)
    const strength = await signUpPage.passwordStrengthCalc()
    return { strength: strength }
}
