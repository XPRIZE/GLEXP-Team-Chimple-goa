export default class Profile {
    constructor() {
        
    }   
    
    get avatar() {
        return this._avatar;
    }
    
    set avatar(val) {
        this._avatar = val;
    }
    
    get coins() {
        return this._coins;
    }
    
    set coins(val) {
        this._coins = val;
    }
    
    deductCoins(val) {
        this.coins = this.coins - val;
    }
    
    addCoins(val) {
        this.coins = this.coins + val;
    }
}
