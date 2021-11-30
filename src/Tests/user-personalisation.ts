import LoginPage from '../Objects/loginpage';
import MyAccountPage from '../Objects/myaccountpage';
import  Helpers from '../Helpers/helpers';


// email_address
// password

// 

// Login

// My Account

// https://ui-test-app.betty.app/my-account

// Upload

fixture `Personalisation`
    .page `https://ui-test-app.betty.app/login`;

test.only('TC-01_Update_Avatar', async t => {
    
    await LoginPage.login(Helpers.bettieUser);

    await LoginPage.clickLoginButton();
    
    await MyAccountPage.clickMyAccount();

    await MyAccountPage.clickUploadButton();

    await MyAccountPage.clickSaveChanges();



});

