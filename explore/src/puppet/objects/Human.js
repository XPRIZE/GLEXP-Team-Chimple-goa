import Puppet from './Puppet.js';
import Limb from './Limb.js';
import Shape from './Shape.js';
import Sprite from './Sprite.js';
import ComboShape from './ComboShape.js';
import Accessory from './Accessory.js';

export default class Human extends Puppet {
    constructor(game, x, y, color) {
        super(game, x, y, color);
    }

    defineBehavior() {
        this.pivot.y = this.leftLeg.height;
        this.leftHand.setTwin(this.rightHand);
        this.rightHand.setTwin(this.leftHand);

        this.leftLeg.setTwin(this.rightLeg);
        this.rightLeg.setTwin(this.leftLeg);

        this.body.onHeightChange.add(this.head.changeLimbHeightOnOtherChange, this.head, 0, this.body.onHeightChange);
        this.body.onHeightChange.add(function(changeY, signal) {
            this.leftLeg.changeLimbHeightOnOtherChange.call(this.leftLeg, changeY, signal);
            this.pivot.y = this.leftLeg.height;
        }, this, 0, this.body.onHeightChange);

        this.head.onHeightChange.add(this.body.changeLimbHeightOnOtherChange, this.body, 0, this.head.onHeightChange);
        this.head.onHeightChange.add(function(changeY, signal) {
            this.leftLeg.changeLimbHeightOnOtherChange.call(this.leftLeg, changeY, signal);
            this.pivot.y = this.leftLeg.height;
        }, this, 0, this.head.onHeightChange);

        this.leftLeg.onHeightChange.add(this.body.changeLimbHeightOnOtherChange, this.body, 0, this.leftLeg.onHeightChange);
        this.leftLeg.onHeightChange.add(this.head.changeLimbHeightOnOtherChange, this.head, 0, this.leftLeg.onHeightChange);
        this.leftLeg.onHeightChange.add(function(changeY, signal) {
            console.log(changeY + " " + this.pivot.y);
            this.pivot.y = this.leftLeg.height;
        }, this, 0, this.leftLeg.onHeightChange);
    }

    get head() {
        if (!this._head) {
            if (this.body) {
                this._head = this.body.getLimb('head');
            }
        }
        return this._head;
    }

    set head(head) {
        this._head = head;
        head.name = 'head';
        if (this.body) {
            this.body.addLimb(head);
        }
    }

    get leftHand() {
        if (!this._leftHand) {
            if (this.body) {
                this._leftHand = this.body.getLimb('leftHand');
            }
        }
        return this._leftHand;
    }

    set leftHand(leftHand) {
        this._leftHand = leftHand;
        leftHand.name = 'leftHand';
        if (this.body) {
            this.body.addLimb(leftHand);
        }
    }

    get rightHand() {
        if (!this._rightHand) {
            if (this.body) {
                this._rightHand = this.body.getLimb('rightHand');
            }
        }
        return this._rightHand;
    }

    set rightHand(rightHand) {
        this._rightHand = rightHand;
        rightHand.name = 'rightHand';
        if (this.body) {
            this.body.addLimb(rightHand);
        }
    }

    get leftLeg() {
        if (!this._leftLeg) {
            // if(this.body) {
            //     this._leftLeg = this.body.getLimb('leftLeg');                
            // }
            this._leftLeg = this.getLimb('leftLeg');
        }
        return this._leftLeg;
    }

    set leftLeg(leftLeg) {
        this._leftLeg = leftLeg;
        leftLeg.name = 'leftLeg';
        // if(this.body) {
        //     this.body.addLimb(leftLeg);            
        // }
        this.addLimb(leftLeg);
    }

    get rightLeg() {
        if (!this._rightLeg) {
            // if(this.body) {
            //     this._rightLeg = this.body.getLimb('rightLeg');                
            // }
            this._rightLeg = this.getLimb('rightLeg');
        }
        return this._rightLeg;
    }

    set rightLeg(rightLeg) {
        this._rightLeg = rightLeg;
        rightLeg.name = 'rightLeg';
        // if(this.body) {
        //     this.body.addLimb(rightLeg);            
        // }
        this.addLimb(rightLeg);
    }

    setShirt(key, frame, anchorX = 0.5, anchorY = 0, offsetX = 0.5, offsetY = 0, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.body.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'shirt'), true);
    }

    setSleeves(key, frame, anchorX = 1, anchorY = 0, offsetX = 1, offsetY = 0, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.leftHand.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), false, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'leftSleeve'), true);
        this.rightHand.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), false, true, true, new Phaser.Point(1 - anchorX, anchorY), new Phaser.Point(1 - offsetX, offsetY), new Phaser.Point(-offsetInPixelX, offsetInPixelY), true, key, frame, 'rightSleeve'), true);
    }

    setPants(key, frame, anchorX = 1, anchorY = 0, offsetX = 1, offsetY = 0, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.leftLeg.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), false, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'leftPant'), true);
        this.rightLeg.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), false, true, true, new Phaser.Point(1 - anchorX, anchorY), new Phaser.Point(1 - offsetX, offsetY), new Phaser.Point(-offsetInPixelX, offsetInPixelY), false, key, frame, 'rightPant'), true);
    }

    setShoes(key, frame, anchorX = 1, anchorY = 1, offsetX = 1, offsetY = 1, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.leftLeg.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'leftShoe'), true);
        //console.log(" offsetInPixelX  "+ offsetInPixelX+ "offsetInPixelY " +offsetInPixelY);
        this.rightLeg.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, false, new Phaser.Point(1 - anchorX, anchorY), new Phaser.Point(1 - offsetX, offsetY), new Phaser.Point(-offsetInPixelX, offsetInPixelY), true, key, frame, 'rightShoe'), true);
    }

    setChain(key, frame, anchorX = 0.5, anchorY = 0, offsetX = 0.5, offsetY = 0, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.body.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'chain'), true);
    }

    setBelt(key, frame, anchorX = 0.5, anchorY = 0, offsetX = 0.5, offsetY = 0.7, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.body.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'belt'), true);
    }

    setScarf(key, frame, anchorX = 0.5, anchorY = 0, offsetX = 0.5, offsetY = 0, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.body.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'scarf'), false);
    }

    setJacket(key, frame, anchorX = 0.5, anchorY = 0, offsetX = 0.5, offsetY = 0, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.body.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'jacket'), false);
    }

    setGlass(key, frame, anchorX = 0.5, anchorY = 0, offsetX = 0.5, offsetY = 0.3, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'glass'), true);
    }

    setSkin(key, frame, x, y) {
        this.body.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'Skin'), true);
    }


    setArmAccessory(key, frame, anchorX = 0.5, anchorY = 1, offsetX = 0.5, offsetY = 1, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.leftHand.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'armAccessory'), true);
    }

  setHeadShape(key, frame, x, y,radius) {
        
        // this.children[0].children[2].children.splice(0,1);
         this.head.children.splice(0,1);
         this.head.shape = new Sprite(game, x, y, key, frame, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), "headShape" );
        // this.body.children.splice(0,1);
        // this.body.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10),new Phaser.Circle(100, 100, 200) );
        
   }
    setMouth(  key,frame, anchorX=0.5, anchorY=0.5, offsetX=0.48, offsetY=0.75, offsetInPixelX=0, offsetInPixelY=0   ) {
       this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'Mouth'), true);
        
    }
    setHat(key, frame, anchorX = 0.5, anchorY = 1, offsetX = 0.5, offsetY = 0, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'hat'), true);

    }

    setBeard(key, frame, anchorX = 0.5, anchorY = 0, offsetX = 0.5, offsetY = 0.8, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'beard'), true);
    }

    setFrontHair(key, frame, anchorX = 0.5, anchorY = 0, offsetX = 0.5, offsetY = 0, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'frontHair'), true);
    }

    setBackHair(key, frame, anchorX = 0.5, anchorY = 0, offsetX = 0.5, offsetY = 0, offsetInPixelX = 0, offsetInPixelY = 0) {
        this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, false, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'backHair'), true);
    }

    toJSON() {
        let json = super.toJSON();
        json._class = 'Human';
        return json;
    }

    static fromJSON(game, j) {
        let puppet = new Human(game, j.x, j.y, j.bodyColor);
        if (j.shape) {
            puppet.shape = j.shape;
        }
        puppet.accessories = j.accessories;
        puppet.limbs = j.limbs;
        puppet.defineBehavior();
        return puppet;
    }

     animateWalk() {

                this.leftHand.angle = 0;

                this.rightHand.angle = 0;

                this.leftLeg.angle = 0;

                this.rightLeg.angle = 0;

                this.game.add.tween(this.body).to({ y: this.body.y + 2 }, 4 / 24 * 1000, null, true).yoyo(true);

                this.game.add.tween(this.head).to({ y: this.head.y + 2 }, 4 / 24 * 1000, null, true).yoyo(true);

                this.game.add.tween(this.leftHand).to({ angle: -15 }, 4 / 24 * 1000, null, true).chain(this.game.add.tween(this.leftHand).to({ angle: 15 }, 4 / 24 * 1000, null, true));

                this.game.add.tween(this.rightHand).to({ angle: 20 }, 4 / 24 * 1000, null, true).chain(this.game.add.tween(this.rightHand).to({ angle: -3 }, 4 / 24 * 1000, null, true));

                this.game.add.tween(this.leftLeg).to({ angle: 15 }, 4 / 24 * 1000, null, true).chain(this.game.add.tween(this.leftLeg).to({ angle: -15 }, 4 / 24 * 1000, null, true));

                this.game.add.tween(this.rightLeg).to({ angle: -9 }, 4 / 24 * 1000, null, true).chain(this.game.add.tween(this.rightLeg).to({ angle: 15 }, 4 / 24 * 1000, null, true));



        }


    static buildDefault(game, handler) {
        let human = new Human(game);
        human.enableInputs(handler, false);
        human.name = 'human';
        human.childOrder = ['leftLeg', 'rightLeg', 'body'];

        human.body = new Limb(game, new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), true);
        human.body.childOrder = ['bodyShape', 'mask', 'shirt', 'belt', 'chain', 'jacket', 'scarf', 'head', 'leftHand', 'rightHand'];
        human.body.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.RoundedRectangle(0, 0, 200, 300, 10), "bodyShape");
        human.body.enableInputs(handler, false);

        human.head = new Limb(game, new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10), false);
        human.head.childOrder = ['backHair', 'headShape', 'mask', 'glasses', 'beard', 'frontHair', 'hat'];
        human.head.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Circle(75, 80, 157), "headShape");
        // human.head.shapeFace = new ShapeFace(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10), new Phaser.Ellipse(85, 100, 85, 100), new Phaser.Ellipse(55, 80, 55, 80), "headShape");   
        human.head.enableInputs(handler, false);

        human.leftHand = new Limb(game, new Phaser.Point(1, 0), new Phaser.Point(0, 0), new Phaser.Point(-10, 0), false);
        human.leftHand.childOrder = ['leftHandShape', 'mask', 'leftSleeve', 'armAccessory'];
        human.leftHand.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(-10, 0), new Phaser.Rectangle(0, 0, 50, 200), "leftHandShape");
        human.leftHand.enableInputs(handler, false);

        human.rightHand = new Limb(game, new Phaser.Point(0, 0), new Phaser.Point(1, 0), new Phaser.Point(10, 0), false);
        human.rightHand.childOrder = ['rightHandShape', 'mask', 'rightSleeve', 'armAccessory'];
        human.rightHand.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(1, 0), new Phaser.Point(10, 0), new Phaser.Rectangle(0, 0, 50, 200), "rightHandShape");
        human.rightHand.enableInputs(handler, false);

        human.leftLeg = new Limb(game, new Phaser.Point(1, 0), new Phaser.Point(0.5, 0), new Phaser.Point(-10, -20), false);
        human.leftLeg.childOrder = ['leftLegShape', 'mask', 'leftPant', 'leftShoe'];
        human.leftLeg.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Rectangle(0, 0, 50, 300), "leftLegShape");
        human.leftLeg.enableInputs(handler, false);

        human.rightLeg = new Limb(game, new Phaser.Point(0, 0), new Phaser.Point(0.5, 0), new Phaser.Point(10, -20), false, human.bodyColor);
        human.rightLeg.childOrder = ['rightLegShape', 'mask', 'rightPant', 'rightShoe'];
        human.rightLeg.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Rectangle(0, 0, 50, 300), "rightLegShape");
        human.rightLeg.enableInputs(handler, false);

        human.defineBehavior();
        return human;

        // let b = JSON.stringify(human, Puppet.replacer);
        // let a=JSON.parse(JSON.stringify(human, Puppet.replacer), human.revive);    
        // a.scale.setTo(0.5,0.5);        
    }
    
    walkAnimate() {
        
     
        this.leftHand.angle = 0;
        this.rightHand.angle = 0;
        this.leftLeg.angle = 0;
        this.rightLeg.angle = 0;
        
       
        this.game.add.tween(this.body).to({y: this.body.y + 8}, 5/24*1000, null, true, 0,0, true).chain(this.game.add.tween(this.body).to({y: this.body.y + 8}, 5/24*1000, null, true,  0,0, true));
        
        
        
        this.game.add.tween(this.head).to({y: this.head.y + 10}, 5/24*1000, null, true, 0,0, true).chain(this.game.add.tween(this.head).to({y: this.head.y + 12}, 5/24*1000, null, true, 0,0, true));
        
        
        
        this.game.add.tween(this.rightHand).to({angle: this.rightHand.angle + 5.8, y: this.rightHand.y + 1.6}, 2/24*1000, null, true).chain(this.game.add.tween(this.rightHand).to({angle: this.rightHand.angle + 15, y: this.rightHand.y + 4}, 3/24*1000, null, false), this.game.add.tween(this.rightHand).to({angle: this.rightHand.angle - 15, y: this.rightHand.y + 4 }, 4/24*1000, null, false, 5/24*1000), this.game.add.tween(this.rightHand).to({angle: this.rightHand.angle - 5}, 4/24*1000, null, false));
       
        
        this.game.add.tween(this.leftHand).to({angle: this.leftHand.angle - 5.8, y: this.leftHand.y + 1.6}, 2/24*1000, null, true).chain(this.game.add.tween(this.leftHand).to({angle: this.leftHand.angle - 15, y: this.leftHand.y + 4}, 3/24*1000, null, false), this.game.add.tween(this.leftHand).to({angle: this.leftHand.angle + 15, y: this.leftHand.y + 4 }, 4/24*1000, null, false), this.game.add.tween(this.leftHand).to({angle: this.leftHand.angle + 5}, 4/24*1000, null, false));

       
       this.game.add.tween(this.leftLeg).to({angle: this.leftLeg.angle + 14.5, y: this.leftLeg.y + 4}, 5/24*1000, null, true).chain(this.game.add.tween(this.leftLeg).to({angle:  this.leftLeg.angle + 1.6, y: this.leftLeg.y - 5.5}, 2/24*1000, null, false, 5/24*1000), this.game.add.tween(this.leftLeg).to({angle: this.leftLeg.angle - 13.8, y: this.leftLeg.y + 4 }, 3/24*1000, null, false), this.game.add.tween(this.leftLeg).to({angle: this.leftLeg.angle - 4.5, x: this.leftLeg.x + 0,y: this.leftLeg.y + 0 }, 4/24*1000, null, false));
        
       
      
      this.game.add.tween(this.rightLeg).to({angle: this.rightLeg.angle - 15, y: this.rightLeg.y + 4}, 5/24*1000, null, true).chain(this.game.add.tween(this.rightLeg).to({angle:  this.rightLeg.angle + 15, y: this.rightLeg.y + 4}, 5/24*1000, null, false, 5/24*1000), this.game.add.tween(this.rightLeg).to({angle: this.rightLeg.angle + 5, y: this.rightLeg.y + 0 }, 4/24*1000, null, false));

    }
    
    waveAnimate() {
        this.body.angle = 0;
        this.head.angle = 0;
        this.leftHand.angle = 0;
        this.rightHand.angle = 0;
        this.leftLeg.angle = 0;
        this.rightLeg.angle = 0;
     
       this.game.add.tween(this.body).to({y: this.body.y + 12, angle: 8.7},4/24*1000, null, true).yoyo(true,42/24*1000);
      
       this.game.add.tween(this.rightHand).to({x: this.rightHand.x + 6.1499, y: this.rightHand.y + 6.40,angle:-5.2},4/24*1000, null, true).chain(
       this.game.add.tween(this.rightHand).to({x: this.rightHand.x , y: this.rightHand.y ,angle:0}, 4/24*1000, null, false, 42/24*1000));
     
       this.game.add.tween(this.head).to({x: this.head.x + 42.75, y: this.head.y + 15.199 , angle:8.7}, 4/24*1000, null, true).chain(
       this.game.add.tween(this.head).to({ angle:23.7}, 3/24*1000,null, false),
       this.game.add.tween(this.head).to({ angle:8.7}, 3/24*1000, null, false),
       this.game.add.tween(this.head).to({ angle:13.7}, 5/24*1000, null, false),
       this.game.add.tween(this.head).to({ angle:8.7}, 7/24*1000, null, false), 
       this.game.add.tween(this.head).to({ angle:15.5}, 7/24*1000, null, false),
       this.game.add.tween(this.head).to({ angle:8.7}, 7/24*1000, null, false),
       this.game.add.tween(this.head).to({x: this.head.x , y:  this.head.y  , angle:0}, 5/24*1000, null, false, 10/24*1000));
              
       this.game.add.tween(this.leftHand).to({x: this.leftHand.x + 3.0499, y: this.leftHand.y - 3.199, angle:2}, 4/24*1000, null, true).chain(
       this.game.add.tween(this.leftHand).to({x:this.leftHand.x + 3, y: this.leftHand.y - 3.25,angle:173.7}, 8/24*1000, null, false ,3/24*1000),
       this.game.add.tween(this.leftHand).to({ y: this.leftHand.y - 3.30,angle:128.7}, 7/24*1000, null, false),
       this.game.add.tween(this.leftHand).to({x:this.leftHand.x + 3, y: this.leftHand.y - 3.19,angle:171.7},
       7/24*1000, null, false),this.game.add.tween(this.leftHand).to({x:this.leftHand.x + 3, y: this.leftHand.y - 3.30,angle:128.7},
       7/24*1000, null, false),this.game.add.tween(this.leftHand).to({angle:33.3}, 5/24*1000, null, false),
       this.game.add.tween(this.leftHand).to({angle:5.6}, 5/24*1000, null, false),
       this.game.add.tween(this.leftHand).to({x: this.leftHand.x+0, y: this.leftHand.y+0,angle:0},5/24*1000, null, false));
      
        }
        
}