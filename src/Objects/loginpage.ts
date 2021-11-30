import { t } from 'testcafe';
import Helpers from '../Helpers/helpers';
import pageObjetcs from './pageObjetcs';
import RegistrationPage from './registerpage'
import { UserDetails } from './userdetails';

class LoginPage {

    async login(user: UserDetails){
        await t
        .expect(pageObjetcs.emailField.exists).ok('eMail field missing or did not load', { timeout: 10000 })
        .expect(pageObjetcs.passwordField.exists).ok('Password field missing or did not load', { timeout: 10000 })
        .typeText(pageObjetcs.emailField, user.emailAddress!)
        .typeText(pageObjetcs.passwordField, user.password!)

    }

    async clickLoginButton(){
        await t.click(pageObjetcs.createAccountButton);
        if(t.expect(pageObjetcs.wrongCredentials.exists)){
            await RegistrationPage.registerUser(Helpers.bettieUser)
            await RegistrationPage.clickCreateAccountButton();
            await this.login(Helpers.bettieUser)
            await t.click(pageObjetcs.createAccountButton);
        }
    }
}

export default new LoginPage();