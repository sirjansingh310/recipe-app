export class User{
    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date){}

    get token(){ // we can do user.token to get the token using get keyword. but we can't do user.token = 'something' as it is only a getter
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}