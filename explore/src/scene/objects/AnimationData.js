export default class AnimationData {
    constructor(game, animation, apply) {
        this._animation = animation;
        this._apply = apply;
    }
    
    set animation(animation) {
        this._animation = animation;
    }
    
    
    get animation() {
        return this._animation;
    }
    
    
    set apply(apply) {
        this._apply = apply;
    }
    
    get apply() {
        return this._apply;
    }
    

    toJSON() {
        let json = {
            _class: "AnimationData",
            soundFileName: this._animation,
            apply: this._apply
        }
        return json;
    }

    static fromJSON(game, j) {
        let animationData = new AnimationData(game, j.animation, j.apply);
        return animationData;
    }
}