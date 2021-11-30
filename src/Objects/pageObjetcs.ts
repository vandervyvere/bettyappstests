import { Selector, t } from "testcafe";

class PageObjects {
    public urlNewAccount: string;
    public urlRegisterSuccessLink: string;
    public urlMyAccount: string;

    public registerLink: Selector;
    public firstNameInput: Selector;
    public lastNameInput: Selector;
    public emailField: Selector;
    public passwordField: Selector;
    public createAccountButton: Selector;
    public accountCreatedSuccessMessage: Selector
    public accountCreateFailedMessage: Selector

    public loginButton: Selector;
    public wrongCredentials: Selector;
    public myAccountButton: Selector;
    public upLoadButton: Selector;
    public saveChangesButton: Selector;
    public profileUpdatedSuccessMessageBox: Selector;
    public profileUpdatedSuccessMessage: Selector;
    public profileImage: Selector;

    constructor(){
        this.urlNewAccount = 'new-account';
        this.urlRegisterSuccessLink = 'login?account_created=true'
        this.urlMyAccount = 'my-account'

        this.registerLink = Selector('a').withText('REGISTER NEW ACCOUNT');
        this.firstNameInput = Selector('input[name=first_name][type=text]');
        this.lastNameInput = Selector('input[name=last_name][type=text]');
        this.emailField = Selector('input[name=email_address][type=email]');
        this.passwordField = Selector('input[name=password][type=password]');
        this.createAccountButton = Selector('button[type=submit]');
        this.accountCreatedSuccessMessage = Selector('div').withText('Account created');
        this.accountCreateFailedMessage = Selector('div').withText('is required');

        this.loginButton = Selector('button[type=submit]');
        this.wrongCredentials = Selector('div').withText('Wrong Credentials');
        this.myAccountButton = Selector('a[role=button][href="/my-account"]');
        this.upLoadButton = Selector('span[role=button][tabindex="0"]');
        this.saveChangesButton = Selector('button[type="submit"]')
        this.profileUpdatedSuccessMessageBox = Selector('div[role="alert"]');
        this.profileUpdatedSuccessMessage = Selector('div').withText('Success');
        this.profileImage = Selector('img')
        

    }

    async validateFields(isExpected: string, emailAddress: string = ''){

        await t.expect(this.firstNameInput.withAttribute('aria-invalid', isExpected).exists).ok(`Attribute aria-invalid on First name input should be ${isExpected}`)
        .expect(this.lastNameInput.withAttribute('aria-invalid', isExpected).exists).ok(`Attribute aria-invalid on Last name input should be ${isExpected}`)
        .expect(this.passwordField.withAttribute('aria-invalid', isExpected).exists).ok(`Attribute aria-invalid on Password input should be ${isExpected}`);
        
        await this.validatePasswordField(isExpected);
        await this.validateEmailField(isExpected, emailAddress);
        await t.takeScreenshot()
    }

    async validateEmailField(isExpected: string, emailAddress: string = '') {
        await t
        .expect(this.emailField.value).eql(emailAddress)
        .expect(this.emailField.withAttribute('aria-invalid', isExpected).exists).ok(`Attribute aria-invalid on Email input should be ${isExpected}. Value is ${emailAddress}`)
    }

    async validatePasswordField(isExpected: string) {
        await t
        .expect(this.passwordField.withAttribute('aria-invalid', isExpected).exists).ok(`Attribute aria-invalid on Password input should be ${isExpected}.`)
    }
}

export default new PageObjects();