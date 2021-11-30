import { ClientFunction } from "testcafe";
import { UserDetails } from "../Objects/userdetails";
import { UserData } from '../Resources/userdata'

class Helpers {

    public getLocation = ClientFunction(() => document.location.href);
    public bettieUser = new UserDetails( 'Alfred', 
    'Newman', 
    'alfrede.newman@gmail.com',
    'Pietpogenlpoel123' );

    private userDetail = new UserDetails();
    private userData = new UserData();

    generateUserDetail(shouldBeBlankUserDetails: boolean = false){
        var rndUserIndex = Math.floor(Math.random() * this.userData.userdata.length) + 1
        this.userDetail.firstName = !shouldBeBlankUserDetails ? this.userData.userdata[rndUserIndex].firstName : ' '
        this.userDetail.lastName = !shouldBeBlankUserDetails ? this.userData.userdata[rndUserIndex].lastName: ' '
        this.userDetail.emailAddress = this.userData.userdata[rndUserIndex].email.toLowerCase()
        
        return this.userDetail;
    }

}

export default new Helpers();