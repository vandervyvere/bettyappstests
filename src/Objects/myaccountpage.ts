import { Selector, t } from 'testcafe';
import Helpers from '../Helpers/helpers';
import pageObjetcs from './pageObjetcs';

class MyAccountPage {

    async clickMyAccount() {
        await t
        .expect(pageObjetcs.myAccountButton.visible).ok()
        .click(pageObjetcs.myAccountButton)
        .expect(Helpers.getLocation()).contains(pageObjetcs.urlMyAccount, 'Failed to navigate to my account url');
        
    }

    async clickUploadButton() {
        await t
        .expect(pageObjetcs.upLoadButton.exists).ok('Upload button did not load or missing')
        .setFilesToUpload(Selector('input').withAttribute('type','file'), ['../../artifacts/testartifacts/images/alfredenewman.jpeg'])
        .click(pageObjetcs.upLoadButton);
    }

    async clickSaveChanges() {
        await t
        .expect(pageObjetcs.saveChangesButton.exists).ok('Save changes button did not load or missing')
        .click(pageObjetcs.saveChangesButton)
        .expect(pageObjetcs.profileUpdatedSuccessMessageBox.exists).ok('Success message box missing or did not load.')
        .expect(pageObjetcs.profileUpdatedSuccessMessage.exists).ok('Success message missing or did not load.')
        .expect(pageObjetcs.profileImage.getAttribute("src")).contains('alfredenewman', 'Profileimage not loaded, we expect Alfred.');
    }
}

export default new MyAccountPage();