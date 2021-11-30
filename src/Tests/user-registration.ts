import pageObjetcs from '../Objects/pageObjetcs';
import RegistrationPage from '../Objects/registerpage'
import Helpers from '../Helpers/helpers'

fixture `Registration`
    .page `https://ui-test-app.betty.app`;

test('TC-01_Registration_Verify-Registration-Page', async t => {
    await RegistrationPage.navigateToRegistrationPage();
    
    await t.expect(Helpers.getLocation()).contains(pageObjetcs.urlNewAccount)
    .expect(pageObjetcs.firstNameInput.exists).ok()
    .expect(pageObjetcs.lastNameInput.exists).ok()
    .expect(pageObjetcs.emailField.exists).ok()
    .expect(pageObjetcs.passwordField.exists).ok()
    .expect(pageObjetcs.createAccountButton.exists).ok()
    .takeScreenshot()

});

test('TC-02_Registration_Validate-RequiredFields', async t =>{

    await RegistrationPage.registerEmptyUser()
    await pageObjetcs.validateFields('true')

})

test('TC-03_Registration_Register-New-Blank-Fields', async t =>{

    await RegistrationPage.registerUser(Helpers.generateUserDetail(true), true);
    await RegistrationPage.clickCreateAccountButton();

    await t.expect(Helpers.getLocation()).contains(pageObjetcs.urlNewAccount, 'Registration succeeded: should not have redirectoed to account_created!')
        .expect(pageObjetcs.accountCreateFailedMessage.exists).ok('Create failed message not found')
        .takeScreenshot();


})

test('TC-04_Registration_Register-New-User', async t =>{

    await RegistrationPage.registerUser(Helpers.generateUserDetail(), true)
    await RegistrationPage.clickCreateAccountButton();
    
    await t.expect(Helpers.getLocation()).contains(pageObjetcs.urlRegisterSuccessLink, 'Registration failed: not redirectoed to account_created!')
        .expect(pageObjetcs.accountCreatedSuccessMessage.exists).ok('Account create success message not found')
        .takeScreenshot()


})

var invalidMails: string[] = ['bettiesmail.com', 'betty@bettiesmailcom', '@bettiesmail.com'] 
invalidMails.forEach(async email => {
    test(`TC-05_Email-validation_Invald-Email-Validation: ${email}`, async t =>{
        
        await RegistrationPage.registerUser(Helpers.generateUserDetail(), false)
        
        await RegistrationPage.fillEmailField(email);
        await pageObjetcs.validateEmailField('true', email)

    
    })
})

var validMails: string[] = ['b.etty@bettiesmail.com', 'betty@bettieslmail.co.nl', 'betty123@bettiesmail.nl', 'Betty.Blocks@Bettiesmail.ndl'] 
validMails.forEach(async email => {
    test(`TC-06_Email-validation_Vald-Email-Validation: ${email}`, async t =>{
        
        await RegistrationPage.registerUser(Helpers.generateUserDetail(), false)
        
        await RegistrationPage.fillEmailField(email);
        await pageObjetcs.validateEmailField('false', email)

    
    })
})

test('TC-07_Password-Validation_Password-less-than-8', async t =>{

    await RegistrationPage.registerUser(Helpers.generateUserDetail(), true)
    await RegistrationPage.fillPsswordField('P@5word');
    await pageObjetcs.validatePasswordField('true');
    
})

test('TC-08_Password-Validation_Password-greater-than-64', async t =>{

    await RegistrationPage.registerUser(Helpers.generateUserDetail(), true)
    await RegistrationPage.fillPsswordField('P@55w0rdqwertyuiop!@#asdfghjklxP@55w0rdqwertyuiop!@#asdfghjklxxxx');
    await pageObjetcs.validatePasswordField('true');
    
})

test('TC-09_Password-Validation_Valid-Password', async t =>{

    await RegistrationPage.registerUser(Helpers.generateUserDetail(), true)
    await RegistrationPage.fillPsswordField('password12345WW');
    await pageObjetcs.validatePasswordField('true');
    
})

test('TC-10_Password-Validation_Valid-Password-Strong', async t =>{

    await RegistrationPage.registerUser(Helpers.generateUserDetail(), true)
    await RegistrationPage.fillPsswordField('P@$$w0rd12345WW');
    await pageObjetcs.validatePasswordField('false');
    
})

