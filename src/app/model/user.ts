export class User {
    constructor(value?: any) {
        Object.assign(this, value);
    }

    token: string;
    userId: string;
}