import { t } from 'testcafe';
import pageObjetcs from './pageObjetcs';
import { UserDetails } from './userdetails';

class RegistrationPage {

    async navigateToRegistrationPage(){
        await t
        .click(pageObjetcs.registerLink)

    }

    async registerUser(user: UserDetails, provideEmail: boolean = true){
        await this.navigateToRegistrationPage();
        await t
        .typeText(pageObjetcs.firstNameInput, user.firstName!)
        .typeText(pageObjetcs.lastNameInput, user.lastName!)

        this.fillPsswordField('Pietpogenlpoel123')

        if (provideEmail) {
            await this.fillEmailField(user.emailAddress!)
            await pageObjetcs.validateFields('false', user.emailAddress!)
        }  
    }

    async fillEmailField(emailAddress: string){
        await t
        .selectText(pageObjetcs.emailField).pressKey("delete")
        .typeText(pageObjetcs.emailField, emailAddress)  
        .pressKey('tab')     
    }

    async fillPsswordField(password: string){
        await t
        .selectText(pageObjetcs.passwordField).pressKey("delete")
        .typeText(pageObjetcs.passwordField, password)  
        .pressKey('tab')     
    }

    async registerEmptyUser(){
        await this.navigateToRegistrationPage();
        await this.clickCreateAccountButton();
    }

    async clickCreateAccountButton(){
        await t.click(pageObjetcs.createAccountButton);
    }
}

export default new RegistrationPage();