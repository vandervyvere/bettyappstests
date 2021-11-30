export class UserDetails {

    firstName?: string
    lastName?: string
    emailAddress?: string
    password?: string  

    constructor(
        firstName?: string,
        lastName?: string,
        emailAddress?: string,
        password?: string
    ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password
    }

}
        