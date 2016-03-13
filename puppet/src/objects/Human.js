import Puppet from './Puppet.js';
import Limb from './Limb.js';
import Shape from './Shape.js';
import Accessory from './Accessory.js';

export default class Human extends Puppet {
    constructor(game, x, y, color) {
        super(game, x, y, color);
    }
        
    defineBehavior() {
        this.leftHand.setTwin(this.rightHand);
        this.rightHand.setTwin(this.leftHand);
        
        this.leftLeg.setTwin(this.rightLeg);
        this.rightLeg.setTwin(this.leftLeg);
        
        this.body.onHeightChange.add(this.head.changeLimbHeightOnOtherChange, this.head, 0, this.body.onHeightChange);
        this.body.onHeightChange.add(this.leftLeg.changeLimbHeightOnOtherChange, this.leftLeg, 0, this.body.onHeightChange);
        this.head.onHeightChange.add(this.body.changeLimbHeightOnOtherChange, this.body, 0, this.head.onHeightChange);
        this.head.onHeightChange.add(this.leftLeg.changeLimbHeightOnOtherChange, this.leftLeg, 0, this.head.onHeightChange);
        this.leftLeg.onHeightChange.add(this.body.changeLimbHeightOnOtherChange, this.body, 0, this.leftLeg.onHeightChange);
        this.leftLeg.onHeightChange.add(this.head.changeLimbHeightOnOtherChange, this.head, 0, this.leftLeg.onHeightChange);
    }
    
    get body() {
        if(!this._body) {
            this._body = this.getLimb('body');
        }
        return this._body;
    }
    
    set body(body) {
        this._body = body;
        body.name = 'body';
        this.addLimb(body);
    }

    get head() {
        if(!this._head) {
            if(this.body) {
                this._head = this.body.getLimb('head');                
            }
        }
        return this._head;
    }
    
    set head(head) {
        this._head = head;
        head.name = 'head';
        if(this.body) {
            this.body.addLimb(head);            
        }
    }

    get leftHand() {
        if(!this._leftHand) {
            if(this.body) {
                this._leftHand = this.body.getLimb('leftHand');                
            }
        }
        return this._leftHand;
    }
    
    set leftHand(leftHand) {
        this._leftHand = leftHand;
        leftHand.name = 'leftHand';
        if(this.body) {
            this.body.addLimb(leftHand);            
        }
    }

    get rightHand() {
        if(!this._rightHand) {
            if(this.body) {
                this._rightHand = this.body.getLimb('rightHand');                
            }
        }
        return this._rightHand;
    }
    
    set rightHand(rightHand) {
        this._rightHand = rightHand;
        rightHand.name = 'rightHand';
        if(this.body) {
            this.body.addLimb(rightHand);            
        }
    }

    get leftLeg() {
        if(!this._leftLeg) {
            if(this.body) {
                this._leftLeg = this.body.getLimb('leftLeg');                
            }
        }
        return this._leftLeg;
    }
    
    set leftLeg(leftLeg) {
        this._leftLeg = leftLeg;
        leftLeg.name = 'leftLeg';
        if(this.body) {
            this.body.addLimb(leftLeg);            
        }
    }

    get rightLeg() {
        if(!this._rightLeg) {
            if(this.body) {
                this._rightLeg = this.body.getLimb('rightLeg');                
            }
        }
        return this._rightLeg;
    }
    
    set rightLeg(rightLeg) {
        this._rightLeg = rightLeg;
        rightLeg.name = 'rightLeg';
        if(this.body) {
            this.body.addLimb(rightLeg);            
        }
    }
    
    setShirt(key, frame) {
        this.body.addAccessory(new Accessory(this.game, true, true, false, new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), false, key, frame, 'shirt'), true);
    }
    
    setSleeve(key, frame) {
        
        this.leftHand.addAccessory(new Accessory(this.game, false, true, true, new Phaser.Point(1, 0), new Phaser.Point(1, 0), new Phaser.Point(0, 0), false, key, frame, 'leftSleeve'), true);
        this.rightHand.addAccessory(new Accessory(this.game, false, true, true, new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), true, key, frame, 'rightSleeve'), true);
    }
    
    setPants(key, frame) {
        this.leftLeg.addAccessory(new Accessory(this.game, false, true, true, new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), false, key, frame, 'leftPant'), true);
        this.rightLeg.addAccessory(new Accessory(this.game, false, true, true, new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), false, key, frame, 'rightSleeve'), true);
    }
    
    setShoes(key, frame) {
        this.leftLeg.addAccessory(new Accessory(this.game, true, true, false, new Phaser.Point(1, 0), new Phaser.Point(1, 1), new Phaser.Point(0, 0), false, key, frame, 'leftShoe'), true);
        this.rightLeg.addAccessory(new Accessory(this.game, true, true, false, new Phaser.Point(0, 0), new Phaser.Point(0, 1), new Phaser.Point(0, 0), true, key, frame, 'rightShoe'), true);
    }

    toJSON() {
        let json = super.toJSON();
        json._class = 'Human';
        return json;
    }

    static fromJSON(game, j) {
        let puppet = new Human(game, j.x, j.y, j.bodyColor);
        if(j.shape) {
            puppet.shape = j.shape;        
        }
        puppet.accessories = j.accessories;
        puppet.limbs = j.limbs;
        puppet.defineBehavior();
        return puppet;
    }

    static buildDefault(game) {
        let human = new Human(game);
        human.name = 'human';
        
        human.body = new Limb(game, new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), true);
        human.body.shape = new Shape(game, new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.RoundedRectangle(0, 0, 320, 320, 10));
        //human.setShirt('1', 'shirt/001redplaid_body.png');

        human.head = new Limb(game, new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10), false);
        human.head.shape = new Shape(game, new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10), new Phaser.RoundedRectangle(0, 0, 200, 200, 10));
        
        human.leftHand = new Limb(game, new Phaser.Point(1, 0), new Phaser.Point(0, 0), new Phaser.Point(-10,0), false);
        human.leftHand.shape = new Shape(game, new Phaser.Point(1, 0), new Phaser.Point(0, 0), new Phaser.Point(-10, 0), new Phaser.Rectangle(0, 0, 50, 300));
        
        human.rightHand = new Limb(game, new Phaser.Point(0, 0), new Phaser.Point(1, 0), new Phaser.Point(10,0), false);
        human.rightHand.shape = new Shape(game, new Phaser.Point(0, 0), new Phaser.Point(1, 0), new Phaser.Point(10, 0), new Phaser.Rectangle(0, 0, 50, 300));

        //human.setSleeve('2', 'shirt/001redplaid_arm.png');
        
        human.leftLeg = new Limb(game, new Phaser.Point(1, 0), new Phaser.Point(0.5, 1), new Phaser.Point(-10,-20), false);
        human.leftLeg.shape = new Shape(game, new Phaser.Point(1, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Rectangle(0, 0, 50, 300));

        human.rightLeg = new Limb(game, new Phaser.Point(0, 0), new Phaser.Point(0.5, 1), new Phaser.Point(10,-20), false, human.bodyColor);
        human.rightLeg.shape = new Shape(game, new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Rectangle(0, 0, 50, 300));
        
        human.setPants('2', 'pants/005khakisuit_leg.png');
        human.setShoes('1', 'shoes/001blacksneakers.png');
        
        human.defineBehavior();
        return human;
        
        //rightLeg.angle = 90;

        // let b = JSON.stringify(human, Puppet.replacer);
        // let a=JSON.parse(JSON.stringify(human, Puppet.replacer), human.revive);    
        // a.scale.setTo(0.5,0.5);        
    }        
}