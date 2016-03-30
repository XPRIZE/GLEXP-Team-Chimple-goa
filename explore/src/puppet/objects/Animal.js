import Puppet from './Puppet.js';
import Limb from './Limb.js';
import Shape from './Shape.js';
import Sprite from './Sprite.js';
import Accessory from './Accessory.js';
import Human from './Human.js';

export default class Animal extends Human {
    constructor(game, x, y, color) {
        super(game, x, y, color);
    }
        
     
        setEar(key, frame, anchorX = 1, anchorY = 1, offsetX = 1, offsetY = 1, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'leftear'), true);
        this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, false, new Phaser.Point(1 - anchorX, anchorY), new Phaser.Point(1 - offsetX, offsetY), new Phaser.Point(-offsetInPixelX, offsetInPixelY), true, key, frame, 'rightear'), true);
    }
    
        setEye(key,frame,anchorX=0.5, anchorY=0, offsetX=0.5, offsetY=0.7, offsetInPixelX=0, offsetInPixelY=0)
        {
        this.eyekey=key;
        this.eyeframe=frame;
        this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'eyeopen'), true);
    }
    
     setMouth( key,frame, anchorX=0.5, anchorY=0.5, offsetX=0.48, offsetY=0.75, offsetInPixelX=0, offsetInPixelY=0   ) {
       this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'Mouth'), true);
        
    }

setInside_body(key,frame, anchorX=0.5, anchorY=0.5, offsetX=0.48, offsetY=0.75, offsetInPixelX=0, offsetInPixelY=0 )
 {
       this.body.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'inside_body'), true);
 }  
 
 setTexture(key,frame, anchorX=0.5, anchorY=0.5, offsetX=0.48, offsetY=0.75, offsetInPixelX=0, offsetInPixelY=0 )
 {
       this.body.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'Texture'), true);
 }
 
//     setBodyShape(key, frame, x, y,radius)
//    {
//        console.log("inside body"+ this.body);
//          this.body.children.splice(0,1);
//          this.body.shape = new Sprite(game, x, y, key, frame, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), "bodyShape" );
//    }
   
//     setHeadShape(key, frame, x, y,radius)
//    {
//          this.head.children.splice(0,1);
//          this.head.shape = new Sprite(game, x, y, key, frame, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), "headShape" );
//     }
    
        setHair(key, frame, anchorX = 0.5, anchorY = 0, offsetX = 0.5, offsetY = 0, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'hair'), true);
    }
    
   
   
    toJSON() {
        let json = super.toJSON();
        json._class = 'Animal';
        return json;
    }

    static fromJSON(game, j) {
        let puppet = new Animal(game, j.x, j.y, j.bodyColor);
        if(j.shape) {
            puppet.shape = j.shape;        
        }
        puppet.accessories = j.accessories;
        puppet.limbs = j.limbs;
        puppet.defineBehavior();
        return puppet;
    }
    
    static buildDefault(game, handler) {
        let animal = new Animal(game);
        animal.enableInputs(handler, false);
        animal.name = 'animal';
        animal.childOrder = ['leftLeg', 'rightLeg', 'body'];
       
       animal.body = new Limb(game, new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), true);
       animal.body.childOrder = [ 'bodyShape', 'mask', 'Texture' ,'Inside_body','head', 'leftHand', 'rightHand'];
       animal.body.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Ellipse(95,135, 94, 150), "bodyShape");
       animal.body.enableInputs(handler, false);

       animal.head = new Limb(game, new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10), false);
       animal.head.childOrder = ['headShape', 'mask', 'Hair'];
       animal.head.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Ellipse(93,110,95,115), "headShape");
       animal.head.enableInputs(handler, false);
        
       animal.leftHand = new Limb(game, new Phaser.Point(1, 0), new Phaser.Point(0, 0), new Phaser.Point(-10,0), false);
       animal.leftHand.childOrder = ['leftHandShape', 'mask'];
       animal.leftHand.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(-10, 0), new Phaser.RoundedRectangle(0, 30, 50, 200), new Phaser.Circle(25, 30, 50), "leftHandShape");
        animal.leftHand.enableInputs(handler, false);

        animal.rightHand = new Limb(game, new Phaser.Point(0, 0), new Phaser.Point(1, 0), new Phaser.Point(10,0), false);
        animal.rightHand.childOrder = ['rightHandShape', 'mask'];
        animal.rightHand = new Limb(game, new Phaser.Point(0, 0), new Phaser.Point(1, 0), new Phaser.Point(10, 0), false);
        animal.rightHand.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(1, 0), new Phaser.Point(10, 0), new Phaser.RoundedRectangle(0, 30, 50, 200), new Phaser.Circle(25, 30, 50), "rightHandShape");
        animal.rightHand.enableInputs(handler, false);

       animal.leftLeg = new Limb(game, new Phaser.Point(1, 0), new Phaser.Point(0.5, 0), new Phaser.Point(-10,-45), false);
       animal.leftLeg.childOrder = ['leftLegShape', 'mask'];
       animal.leftLeg.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.RoundedRectangle(0, 0,50 , 300), "leftLegShape");
       animal.leftLeg.enableInputs(handler, false);

       animal.rightLeg = new Limb(game, new Phaser.Point(0, 0), new Phaser.Point(0.5, 0), new Phaser.Point(10,-45), false,animal.bodyColor);
       animal.rightLeg.childOrder = ['rightLegShape', 'mask'];
       animal.rightLeg.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.RoundedRectangle(0, 0, 50, 300), "rightLegShape");
       animal.rightLeg.enableInputs(handler, false);
        
        animal.defineBehavior();
        return animal;
        
        // let b = JSON.stringify(human, Puppet.replacer);
        // let a=JSON.parse(JSON.stringify(human, Puppet.replacer), human.revive);    
        // a.scale.setTo(0.5,0.5);        
    }
    
}