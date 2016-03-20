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
        this.body.addAccessory(new Accessory(this.game, true, true, true, new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), false, key, frame, 'shirt'), true);
    }
    
    setSleeve(key, frame) {
        
        this.leftHand.addAccessory(new Accessory(this.game, false, true, true, new Phaser.Point(1, 0), new Phaser.Point(1, 0), new Phaser.Point(0, 0), false, key, frame, 'leftSleeve'), true);
        this.rightHand.addAccessory(new Accessory(this.game, false, true, true, new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), true, key, frame, 'rightSleeve'), true);
    }
    
    setPants(key, frame) {
        this.leftLeg.addAccessory(new Accessory(this.game, false, true, true, new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), false, key, frame, 'leftPant'), true);
        this.rightLeg.addAccessory(new Accessory(this.game, false, true, true, new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), false, key, frame, 'rightSleeve'), true);
    }
    
   setShoes(key, frame,anchorX, anchorY, offsetX, offsetY,offsetInPixelX,offsetInPixelY) {
        this.leftLeg.addAccessory(new Accessory(this.game, true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(0,0), false, key, frame, 'leftShoe'), true);
        //console.log(" offsetInPixelX  "+ offsetInPixelX+ "offsetInPixelY " +offsetInPixelY);
        this.rightLeg.addAccessory(new Accessory(this.game, true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), true, key, frame, 'rightShoe'), true);
    }
    
    setChain(key, frame, x, y) {
        this.body.addAccessory(new Accessory(this.game, true, true, true, new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), false, key, frame, 'chain'), true);
    }
     setBelt(key,frame,x,y){
       this.beltSize = this.body.addAccessory(new Accessory(this.game, true, true, true, new Phaser.Point(0, 0), new Phaser.Point(0, 0.5), new Phaser.Point(0, 0), false, key, frame, 'Belt'), true);
       this.beltSize.scale.setTo(1.2,1);
  } 
  setGlass(key,frame,x,y){
        
       this.item = this.head.addAccessory(new Accessory(this.game, true, true, true, new Phaser.Point(0, 0), new Phaser.Point(0.1, 0.1), new Phaser.Point(0, 0), false, key, frame, 'Glass'), true);
       this.item.scale.setTo(0.5);
  }
  setSkin(key,frame,x,y){
    this.body.addAccessory(new Accessory(this.game, true, true, true, new Phaser.Point(0, 0), new Phaser.Point(0, 0.5), new Phaser.Point(0, 0), false, key, frame, 'Skin'), true);
      
  }

    
    setArmAccessory(key, frame, anchorX, anchorY, offsetX, offsetY) {
        this.leftHand.addAccessory(new Accessory(this.game, true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(0, 0), false, key, frame, 'armAccessory'), true);        
    }
    
     setHeadStructure(key, frame, x, y,radius) {
        
        // this.children[0].children[2].children.splice(0,1);
         this.head.children.splice(0,1);
         this.head.shape = new Shape(game, new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10),new Phaser.Circle(x, y, radius) );
        // this.body.children.splice(0,1);
        // this.body.shape = new Shape(game, new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10),new Phaser.Circle(100, 100, 200) );
        
   }
    
    sethead(key,frame,anchorX, anchorY, offsetX, offsetY){
       // console.log("in haed");
        this.head.addAccessory(new Accessory(this.game, true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(0, 0), false, key, frame, 'hats'), true);
        // console.log(" anchorX  "+ anchorX+ "  anchorY " +anchorY);
        // console.log(" offsetX  "+ offsetX+ "  offsetY " +offsetY);
     
    }
    
     setbeard(key, frame, anchorX, anchorY, offsetX, offsetY)
    {
        //this.beard = 
         this.head.addAccessory(new Accessory(this.game, true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(0, 0), false, key, frame, 'beard'), true);
       // this.beard.tint=0xfff000;
    }
    
    sethairs(key,frame,anchorX, anchorY, offsetX, offsetY){
        this.head.addAccessory(new Accessory(this.game, true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(0, 0), false, key, frame, 'hairs', new Phaer.Point(color)), true);
        //this.hairs.scale.setTo(0.3);
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

    static buildDefault(game, handler) {
        let human = new Human(game);
        human.enableInputs(handler, false);
        human.name = 'human';
        
        human.body = new Limb(game, new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), true);
        human.body.enableInputs(handler, false);
        human.body.shape = new Shape(game, new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.RoundedRectangle(0, 0, 320, 320, 10));
        //human.setShirt('1', 'shirt/001redplaid_body.png');

        human.head = new Limb(game, new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10), false);
        human.head.enableInputs(handler, false);
        human.head.shape = new Shape(game, new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10), new Phaser.RoundedRectangle(0, 0, 200, 200, 10));
        
        human.leftHand = new Limb(game, new Phaser.Point(1, 0), new Phaser.Point(0, 0), new Phaser.Point(-10,0), false);
        human.leftHand.enableInputs(handler, false);
        human.leftHand.shape = new Shape(game, new Phaser.Point(1, 0), new Phaser.Point(0, 0), new Phaser.Point(-10, 0), new Phaser.Rectangle(0, 0, 50, 300));
        
        human.rightHand = new Limb(game, new Phaser.Point(0, 0), new Phaser.Point(1, 0), new Phaser.Point(10,0), false);
        human.rightHand.enableInputs(handler, false);
        human.rightHand.shape = new Shape(game, new Phaser.Point(0, 0), new Phaser.Point(1, 0), new Phaser.Point(10, 0), new Phaser.Rectangle(0, 0, 50, 300));

        //human.setSleeve('2', 'shirt/001redplaid_arm.png');
        
        human.leftLeg = new Limb(game, new Phaser.Point(1, 0), new Phaser.Point(0.5, 1), new Phaser.Point(-10,-20), false);
        human.leftLeg.enableInputs(handler, false);
        human.leftLeg.shape = new Shape(game, new Phaser.Point(1, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Rectangle(0, 0, 50, 300));

        human.rightLeg = new Limb(game, new Phaser.Point(0, 0), new Phaser.Point(0.5, 1), new Phaser.Point(10,-20), false, human.bodyColor);
        human.rightLeg.enableInputs(handler, false);
        human.rightLeg.shape = new Shape(game, new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Rectangle(0, 0, 50, 300));
        
        human.setPants('puppet/2', 'pants/005khakisuit_leg.png');
        
        human.setShoes('puppet/1', 'shoes/001blacksneakers.png');
        
        human.defineBehavior();
        return human;
        
        //rightLeg.angle = 90;

        // let b = JSON.stringify(human, Puppet.replacer);
        // let a=JSON.parse(JSON.stringify(human, Puppet.replacer), human.revive);    
        // a.scale.setTo(0.5,0.5);        
    }        
}