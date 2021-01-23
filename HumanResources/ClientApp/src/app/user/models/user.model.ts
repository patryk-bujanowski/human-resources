export class User {
    id: string;
    email: string;
    accessToken: string;
    firstName: string;
    lastName: string;
    sex: string;
    birthdate: Date;
    avatar: string;
    city: string;
    phoneNumber: string;

    get fullName(): string {
        return this.firstName + ' ' + this.lastName;
    }
}
