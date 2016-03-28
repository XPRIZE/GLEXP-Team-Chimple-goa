import Puppet from './Puppet.js';
import Limb from './Limb.js';
import Shape from './Shape.js';
import Sprite from './Sprite.js';
import ComboShape from './ComboShape.js';
import HandShape from './HandShape.js';
import Accessory from './Accessory.js';
import StoryUtil from '../../storybuilder/objects/StoryUtil.js';
import TextData from '../../storybuilder/objects/TextData.js';
import SoundData from '../../scene/objects/SoundData.js';
import PlayPauseSignal from '../../storybuilder/objects/PlayPauseSignal.js';
import PlayResumeSignal from '../../storybuilder/objects/PlayResumeSignal.js';
import SpecialAttribute from '../../scene/objects/SpecialAttribute.js';
import RecordInfo from '../../storybuilder/objects/RecordInfo.js';

export default class Human extends Puppet {
    constructor(game, x, y, color, uniquename) {
        super(game, x, y, color);
        
        this._specialAttribute = new SpecialAttribute();
        
        this._playPauseSignal = new PlayPauseSignal();
        this._playResumeSignal = new PlayResumeSignal();
        
        if(!uniquename) {
            this._uniquename = StoryUtil.generateUUID();
        } else {
            this._uniquename = uniquename;
        }
        
    }

    addText(textData) {
        this._specialAttribute.addText(textData); 
    }
    
    applyText(whichTextIndex, apply) {
        this._specialAttribute.applyText(whichTextIndex, apply);
        let appliedTextData = this._specialAttribute.getText(whichTextIndex);
        let text = appliedTextData.text;
        //later you should get text, fontColor, backgroundColor, style 
        if (game._inRecordingMode) {
            this._specialAttributesChangedSignal.dispatch({ uniquename: this._uniquename, x: this.x, y: this.y, scaleX: this.scale.x, scaleY: this.scale.y, angle: this.angle, recordingAttributeKind: RecordInfo.TEXT_RECORDING_TYPE, userGeneratedText: text});
        }        
    }
    
    addSound(soundData) {
        this._specialAttribute.addSound(soundData); 
    }

    applySound(whichSoundIndex, apply) {
        this._specialAttribute.applySound(whichSoundIndex, apply);
        let soundData = this._specialAttribute.getSound(whichSoundIndex);
        soundData.apply = apply;
        if (game._inRecordingMode) {            
            if (game.cache.checkSoundKey(soundData.soundFileName)) {
                                
                if(apply) {
                    soundData.playMusic();                       
                } else {
                    soundData.stopMusic();                    
                }
            }            
            this._specialAttributesChangedSignal.dispatch({ uniquename: this._uniquename, x: this.x, y: this.y, scaleX: this.scale.x, scaleY: this.scale.y, angle: this.angle, recordingAttributeKind: RecordInfo.SOUND_RECORDING_TYPE, soundData: soundData});
        }        
    }


    update() {
        var self = this;
       
        if (game._inRecordingMode) {
            // console.log('in recording mode');            
            this.onAttributesChanged.dispatch({ uniquename: this._uniquename, x: this.x, y: this.y, scaleX: this.scale.x, scaleY: this.scale.y, angle: this.angle, recordingAttributeKind: RecordInfo.DEFAULT_RECORDING_TYPE });
        } else if (game._inPlayMode) {
            console.log('in play mode');
            if (this._changeAttributes != null && this._changeAttributes.size > 0) {
                let json = this._changeAttributes.get(this._uniquename);
                var recordedInfo = RecordInfo.fromJSON(json);
                console.log('this.x: ' + this.x + " this.y:" + this.y);
                this.x = recordedInfo.x;
                this.y = recordedInfo.y;
                this.scale.x = recordedInfo.scaleX;
                this.scale.y = recordedInfo.scaleY;
                this.angle = recordedInfo.angle;
                //this.game.camera.x = recordedInfo.cameraX;
                //this.game.camera.y = recordedInfo.cameraY;
                console.log('recordedInfo.x:' + recordedInfo.x + "recordedInfo.y:" + recordedInfo.y);
                this.applySpecialAttributeChanges(recordedInfo);                                
            }
        }
    }

applySpecialAttributeChanges(recordedInfo) {
        var self = this;
        //later refactor into 4 different classes
        if (recordedInfo.recordingAttributeKind == RecordInfo.TEXT_RECORDING_TYPE) {
            //send an signal to show Text PopUp to User
            console.log('show text popup to User' + recordedInfo.userGeneratedText);
            $('#element_to_pop_up').bPopup({onClose: function() {
                console.log('closing pop up');
                self._playResumeSignal.dispatch();
            }});

            var url = "make" + '.json';
            console.log('url ' + url);
            var meaning = '';
            $.getJSON(url, function(jd) {
                meaning = jd.meaning;
                meaning = $(meaning).text();
                $("#word").text(url);
                $("#meaning_content").text(meaning);
                $("#example_content").text(jd.exmaples);
                $("#image_content").attr("src", jd.image);
            });
            
            self._playPauseSignal.dispatch();
        } else if (recordedInfo.recordingAttributeKind == RecordInfo.SOUND_RECORDING_TYPE) {
            //check if sound present in cache, if so use (should had been created when user choose sound for page)
            // if sound not present, then add to game and reference to game for now - TBD (how to remove)            
            let soundData = recordedInfo.soundData;
            if (game.cache.checkSoundKey(soundData.soundFileName)) {
                if(!this._soundFileName) {
                    this._soundFileName = new SoundData(game, soundData.soundFileName, soundData.apply);    
                }                
                if(soundData.apply) {
                    this._soundFileName.playMusic();        
                } else {
                    this._soundFileName.stopMusic();
                    // this._soundFileName.destroy();
                }
            }
        }
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
    

        this.lhx = this.leftHand.x;
        this.lhy = this.leftHand.y;
        
        this.llx = this.leftLeg.x;
        this.lly = this.leftLeg.y;
        
        this.rhx = this.rightHand.x;
        this.rhy = this.rightHand.y
        
        this.rlx = this.rightLeg.x;
        this.rly = this.rightLeg.y;
        
        this.bx = this.body.x;
        this.by = this.body.y;
        
        this.hx = this.head.x;
        this.hy = this.head.y;
        
        
        this.bodyTweenFlag = false;

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

  setHeadShape(key, frame, x, y,radius)
   {
        // this.children[0].children[2].children.splice(0,1);
         this.head.children.splice(0,1);
         this.head.shape = new Sprite(game, x, y, key, frame, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), "headShape" );
        // this.body.children.splice(0,1);
        // this.body.shape = new Shape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10),new Phaser.Circle(100, 100, 200) );
        
   }
    setMouth(  key,frame, anchorX=0.5, anchorY=0.5, offsetX=0.48, offsetY=0.75, offsetInPixelX=0, offsetInPixelY=0   ) {
       this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'Mouth'), true);
        
    }
    
    setEye(key,frame,anchorX=0.5, anchorY=0, offsetX=0.5, offsetY=0.7, offsetInPixelX=0, offsetInPixelY=0){
        this.eyekey=key;
        this.eyeframe=frame;
        this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(anchorX, anchorY), new Phaser.Point(offsetX, offsetY), new Phaser.Point(offsetInPixelX, offsetInPixelY), false, key, frame, 'eyeopen'), true);
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
        json.uniquename = this._uniquename;
        return json;
    }

    static fromJSON(game, j) {
        let puppet = new Human(game, j.x, j.y, j.bodyColor, j.uniquename);
        if (j.shape) {
            puppet.shape = j.shape;
        }
        puppet.accessories = j.accessories;
        puppet.limbs = j.limbs;
        puppet.defineBehavior();
        return puppet;
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

    blinkAct()
    {  
          let self = this;
          let i = 1;
          this.mytime = this.game.time.events.loop(500,function()
          {
            if(i == 2 || i == 3 || i==4)
              {
                  self.eyeopen();
                  //console.log('---------- i --------'+i);
                  i++;
                  if(i==5){
                      i = 1;
                  }
              }
              else if(i == 1)
              {
                  self.eyeclose();
                  // console.log('---------- i --------'+i);
                  i++;
              }},this);
          
        //   this.game.time.events.loop(10000,function(){
        //       self.game.time.events.remove(self.mytime);
        //   })
   }
    eyeopen()
    {
            let eyes;   
            for(let i=0; i <this.head.children.length;i++)
            {
               if(this.head.children[i].name == "eyeclose")
               {
                  eyes = this.head.children[i].name;
                  this.head.children.splice(i,1,this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(0, 0.1),
                  new Phaser.Point(0.13, 0.3), new Phaser.Point(0,0), false,  "puppet/eye_mouth", this.eyeframe, 'eyeopen'), true));

               } 
           }
     }
    
    eyeclose()
    {
                   let eyes ;
                   for(let i=0; i <this.head.children.length;i++)
                   {
                       if(this.head.children[i].name == "eyeopen")
                       {
                             eyes = this.head.children[i].name;
                             this.head.children.splice(i,1,this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true,
                             new Phaser.Point(0, 0.1), new Phaser.Point(0.13, 0.3),
                             new Phaser.Point(0,0), false,  "puppet/eye_mouth", "eyes 2.png", 'eyeclose'), true));
                       } 
                }
    }  

   smileAct()
    {
        this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(0.45, 0.5), new Phaser.Point(0.5, 0.8), new Phaser.Point(0,0), false, "puppet/eye_mouth","mouth 5.png" , 'mouth'), true);
    }
   sadAct(){
       this.head.addAccessory(new Accessory(this.game, new Phaser.Point(1, 1), true, true, true, new Phaser.Point(0.45, 0.5), new Phaser.Point(0.5, 0.8), new Phaser.Point(0,0), false, "puppet/eye_mouth","mouth 4.png" , 'mouth'), true);
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
        human.head.shape = new ComboShape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(0, 0), new Phaser.Circle(75, 100, 157),new Phaser.Circle(75, 60, 124), "headShape");
        // human.head.shapeFace = new ShapeFace(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, -10), new Phaser.Ellipse(85, 100, 85, 100), new Phaser.Ellipse(55, 80, 55, 80), "headShape");   
        human.head.enableInputs(handler, false);

        human.leftHand = new Limb(game, new Phaser.Point(1, 0), new Phaser.Point(0, 0), new Phaser.Point(-10, 0), false);
        human.leftHand.childOrder = ['leftHandShape', 'mask', 'leftSleeve', 'armAccessory'];
        human.leftHand.shape = new HandShape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(0, 0), new Phaser.Point(-10, 0), new Phaser.Rectangle(0, 30, 50, 200), new Phaser.Circle(25, 30, 50), new Phaser.Circle(25, 230, 50),"leftHandShape");
        human.leftHand.enableInputs(handler, false);

        human.rightHand = new Limb(game, new Phaser.Point(0, 0), new Phaser.Point(1, 0), new Phaser.Point(10, 0), false);
        human.rightHand.childOrder = ['rightHandShape', 'mask', 'rightSleeve', 'armAccessory'];
        human.rightHand.shape = new HandShape(game, new Phaser.Point(1, 1), new Phaser.Point(0.5, 0), new Phaser.Point(1, 0), new Phaser.Point(10, 0), new Phaser.Rectangle(0, 30, 50, 200), new Phaser.Circle(25, 30, 50), new Phaser.Circle(25, 230, 50),"rightHandShape");
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
    
    drawBoundingBox(color) {
        let box = this.addChild(new Phaser.Graphics(this.game, -this.offsetX, -this.offsetY));
        box.lineStyle(1, color);
        box.beginFill(0x000000, 0);
        box.drawRect(0, 0, this.width, this.height);
        box.endFill();
        return box;
    }
    
     handshakeAnimate(){
                    this.leftHand.x = this.lhx;
                    this.leftHand.y = this.lhy;
                    
                    this.leftLeg.x = this.llx;
                    this.leftLeg.y = this.lly;
                    
                    this.rightHand.x = this.rhx;
                    this.rightHand.y = this.rhy;
                    
                    this.rightLeg.x = this.rlx;
                    this.rightLeg.y = this.rly;
                    
                    this.body.x = this.bx;
                    this.body.y = this.by;
                    
                    this.head.x = this.hx;
                    this.head.y = this.hy;
     
                    this.bodyTween = this.game.add.tween(this.body).to({angle:-5.7},6/24*1000, null, false).chain(
                    this.game.add.tween(this.body).to({y: this.body.y + 0},12/24*1000, null, false),
                    this.game.add.tween(this.body).to({angle:0},5/24*1000, null, false));
                    
                    this.headTween = this.game.add.tween(this.head).to({x: this.head.x - 27.95,y: this.head.y + 1.4, angle:3.1},6/24*1000, null, false).chain(
                    this.game.add.tween(this.head).to({ },12/24*1000, null, false),
                    this.game.add.tween(this.head).to({x: this.head.x -0, y: this.head.y + 0, angle:0},5/24*1000, null, false));
                    
                    this.leftHandTween = this.game.add.tween(this.leftHand).to({x:this.leftHand.x -26.74,y: this.leftHand.y +13.399, angle:34.6}, 6/24*1000, null,false).chain(
                    this.game.add.tween(this.leftHand).to({x:this.leftHand.x -26,angle:49.6}, 4/24*1000, null, false ),
                    this.game.add.tween(this.leftHand).to({ angle:41.6}, 4/24*1000, null, false),
                    this.game.add.tween(this.leftHand).to({angle:49.4}, 4/24*1000, null, false),
                    this.game.add.tween(this.leftHand).to({x:this.leftHand.x + 0, y: this.leftHand.y - 0,angle:0},5/24*1000, null, false) );
                 
                    this.rightHandTween = this.game.add.tween(this.rightHand).to({x: this.rightHand.x - 10.79 , y: this.rightHand.y - 6.54 ,angle:-5.7},6/24*1000, null,false).chain(
                    this.game.add.tween(this.rightHand).to({}, 12/24*1000, null, false),
                    this.game.add.tween(this.rightHand).to({x: this.rightHand.x+0.099 , y: this.rightHand.y +0.99 ,angle:0}, 5/24*1000, null, false));
                   
                   this.leftLegTween = this.game.add.tween(this.leftLeg).to({  },23/24*1000, null, false);    
                    
                   this.rightLegTween = this.game.add.tween(this.rightLeg).to({  },23/24*1000, null, false);
              
                    let self = this;
                    this.startStopAniamation(1500);
     }
    jumpAnimate(){
           
                    this.leftHand.x = this.lhx;
                    this.leftHand.y = this.lhy;
                    
                    this.leftLeg.x = this.llx;
                    this.leftLeg.y = this.lly;
                    
                    this.rightHand.x = this.rhx;
                    this.rightHand.y = this.rhy;
                    
                    this.rightLeg.x = this.rlx;
                    this.rightLeg.y = this.rly;
                    
                    this.body.x = this.bx;
                    this.body.y = this.by;
                    
                    this.head.x = this.hx;
                    this.head.y = this.hy;
     
                    this.bodyTween = this.game.add.tween(this.body).to({y: this.body.y - 4},3/24*1000, null, false).chain(
                    this.game.add.tween(this.body).to({y: this.body.y + 20},4/24*1000, null, false),
                    this.game.add.tween(this.body).to({y: this.body.y -72},6/24*1000, null, false),
                    this.game.add.tween(this.body).to({y: this.body.y + 20},5/24*1000, null, false),
                    this.game.add.tween(this.body).to({y: this.body.y - 4},3/24*1000, null, false), 
                    this.game.add.tween(this.body).to({y: this.body.y + 0},2/24*1000, null, false));
                        
                    this.headTween = this.game.add.tween(this.head).to({ y: this.head.y -4}, 3/24*1000, null, false).chain(
                    this.game.add.tween(this.head).to({ y: this.head.y + 38}, 4/24*1000,null, false),
                    this.game.add.tween(this.head).to({y: this.head.y - 70}, 6/24*1000, null, false),
                    this.game.add.tween(this.head).to({y: this.head.y +38}, 5/24*1000, null, false),
                    this.game.add.tween(this.head).to({y: this.head.y - 4}, 3/24*1000, null, false), 
                    this.game.add.tween(this.head).to({ y: this.head.y +0}, 2/24*1000, null, false));
                    
                    this.rightHandTween = this.game.add.tween(this.rightHand).to({x: this.rightHand.x +0.0499 , y: this.rightHand.y - 3.9499 ,angle:-15},3/24*1000, null, false).chain(
                    this.game.add.tween(this.rightHand).to({x: this.rightHand.x-27.95 , y: this.rightHand.y - 15.9499 ,angle:-45}, 4/24*1000, null, false),
                    this.game.add.tween(this.rightHand).to({x: this.rightHand.x-11.95 , y: this.rightHand.y - 57.84 ,angle:-75}, 6/24*1000, null, false),
                    this.game.add.tween(this.rightHand).to({x: this.rightHand.x-27.95 , y: this.rightHand.y - 15.94 ,angle:-45}, 5/24*1000, null, false),
                    this.game.add.tween(this.rightHand).to({x: this.rightHand.x+0.04 , y: this.rightHand.y - 3.94 ,angle:-15}, 3/24*1000, null, false),
                    this.game.add.tween(this.rightHand).to({ y: this.rightHand.y + 0.050 ,angle:0}, 2/24*1000, null, false));
                    
                    this.leftHandTween = this.game.add.tween(this.leftHand).to({y: this.leftHand.y - 4, angle:15}, 3/24*1000, null, false).chain(
                    this.game.add.tween(this.leftHand).to({x:this.leftHand.x + 30, y: this.leftHand.y - 16,angle:45}, 4/24*1000, null, false ),
                    this.game.add.tween(this.leftHand).to({x:this.leftHand.x + 12.04, y: this.leftHand.y -51.94, angle:75}, 6/24*1000, null, false),
                    this.game.add.tween(this.leftHand).to({x:this.leftHand.x + 30, y: this.leftHand.y - 16,angle:45}, 5/24*1000, null, false),
                    this.game.add.tween(this.leftHand).to({x:this.leftHand.x + 0, y: this.leftHand.y - 4,angle:15},3/24*1000, null, false),
                    this.game.add.tween(this.leftHand).to({y: this.leftHand.y-0,angle:0}, 2/24*1000, null, false));
                    
                    this.leftLegTween = this.game.add.tween(this.leftLeg).to({ y: this.leftLeg.y + 0 },7/24*1000, null, false).chain(
                    this.game.add.tween(this.leftLeg).to({ y: this.leftLeg.y - 90.05 }, 6/24*1000, null, false),
                    this.game.add.tween(this.leftLeg).to({ y: this.leftLeg.y - 0 }, 5/24*1000, null, false));    
                    
                    this.rightLegTween = this.game.add.tween(this.rightLeg).to({ y: this.rightLeg.y + 0 },7/24*1000, null, false).chain(
                    this.game.add.tween(this.rightLeg).to({ y: this.rightLeg.y - 90.05 }, 6/24*1000, null, false),
                    this.game.add.tween(this.rightLeg).to({ y: this.rightLeg.y - 0 }, 5/24*1000, null, false));
                    
                    this.startStopAniamation(1500);
             }
         
      walkAnimate() {
        
        
        this.leftHand.angle = 0;
        this.rightHand.angle = 0;
        this.leftLeg.angle = 0;
        this.rightLeg.angle = 0;
       
        this.leftHand.x = this.lhx;
        this.leftHand.y = this.lhy;
        
        this.leftLeg.x = this.llx;
        this.leftLeg.y = this.lly;
        
        this.rightHand.x = this.rhx;
        this.rightHand.y = this.rhy;
        
        this.rightLeg.x = this.rlx;
        this.rightLeg.y = this.rly;
        
        this.body.x = this.bx;
        this.body.y = this.by;
        
        this.head.x = this.hx;
        this.head.y = this.hy;
        
       
        this.bodyTween = this.game.add.tween(this.body).to({y: this.body.y + 8}, 5/24*1000, null, false).chain(this.game.add.tween(this.body).to({y: this.body.y + 0}, 5/24*1000, null, false),
        this.game.add.tween(this.body).to({y: this.body.y + 0}, 5/24*1000, null, false),
        this.game.add.tween(this.body).to({y: this.body.y + 0}, 5/24*1000, null, false));//416.6
        
        
        
        this.headTween = this.game.add.tween(this.head).to({y: this.head.y + 10}, 5/24*1000, null, false).chain(this.game.add.tween(this.head).to({y: this.head.y + 0}, 5/24*1000, null, false),
        this.game.add.tween(this.head).to({y: this.head.y + 12}, 5/24*1000, null, false),
        this.game.add.tween(this.head).to({y: this.head.y + 0}, 5/24*1000, null, false));//416.6
        
        
        
        this.rightHandTween = this.game.add.tween(this.rightHand).to({angle: this.rightHand.angle + 5.8, y: this.rightHand.y + 1.6}, 2/24*1000, null, false).chain(this.game.add.tween(this.rightHand).to({angle: this.rightHand.angle + 15, y: this.rightHand.y + 4}, 3/24*1000, null, false), this.game.add.tween(this.rightHand).to({angle: this.rightHand.angle - 15, y: this.rightHand.y + 4 }, 4/24*1000, null, false), this.game.add.tween(this.rightHand).to({angle: this.rightHand.angle - 5}, 4/24*1000, null, false)); //750
       
        
        this.leftHandTween = this.game.add.tween(this.leftHand).to({angle: this.leftHand.angle - 5.8, y: this.leftHand.y + 1.6}, 2/24*1000, null, false).chain(this.game.add.tween(this.leftHand).to({angle: this.leftHand.angle - 15, y: this.leftHand.y + 4}, 3/24*1000, null, false), this.game.add.tween(this.leftHand).to({angle: this.leftHand.angle + 15, y: this.leftHand.y + 4 }, 4/24*1000, null, false), this.game.add.tween(this.leftHand).to({angle: this.leftHand.angle + 5}, 4/24*1000, null, false));//541.6

       
       this.leftLegTween = this.game.add.tween(this.leftLeg).to({angle: this.leftLeg.angle + 14.5, y: this.leftLeg.y + 4}, 5/24*1000, null, false).chain(this.game.add.tween(this.leftLeg).to({angle:  this.leftLeg.angle + 1.6, y: this.leftLeg.y - 5.5}, 2/24*1000, null, false), this.game.add.tween(this.leftLeg).to({angle: this.leftLeg.angle - 13.8, y: this.leftLeg.y + 4 }, 3/24*1000, null, false), this.game.add.tween(this.leftLeg).to({angle: this.leftLeg.angle - 4.5, x: this.leftLeg.x + 0,y: this.leftLeg.y + 0 }, 4/24*1000, null, false));//791.6
        
       
      
      this.rightLegTween = this.game.add.tween(this.rightLeg).to({angle: this.rightLeg.angle - 15, y: this.rightLeg.y + 4}, 5/24*1000, null, false).chain(this.game.add.tween(this.rightLeg).to({angle:  this.rightLeg.angle + 15, y: this.rightLeg.y + 4}, 5/24*1000, null, false), this.game.add.tween(this.rightLeg).to({angle: this.rightLeg.angle + 5, y: this.rightLeg.y + 0 }, 4/24*1000, null, false));
      
       this.startStopAniamation(791);
      
          
      }
      
      startStopAniamation(time){
          
           let self = this;
          
           let key = true;
                  
           if(this.bodyTweenFlag )
              {
                  
                   this.bodyTween.stop();
                   this.headTween.stop();
                   this.leftHandTween.stop();
                   this.rightHandTween.stop();
                   this.rightLegTween.stop();
                   this.leftLegTween.stop();
                  
                  
                   this.leftHand.angle = 0;
                   this.rightHand.angle = 0;
                   this.leftLeg.angle = 0;
                   this.rightLeg.angle = 0;
       
                   this.leftHand.x = this.lhx;
                   this.leftHand.y = this.lhy;
        
                   this.leftLeg.x = this.llx;
                   this.leftLeg.y = this.lly;
        
                   this.rightHand.x = this.rhx;
                   this.rightHand.y = this.rhy;
        
                   this.rightLeg.x = this.rlx;
                   this.rightLeg.y = this.rly;
        
                   this.body.x = this.bx;
                   this.body.y = this.by;
        
                   this.head.x = this.hx;
                   this.head.y = this.hy;
                   
                   
                   self.game.time.events.remove(this.myTween);
                   this.bodyTweenFlag = false;
                  
                   key = true;
              
            }else{
                  
                   self.bodyTween.start();
                   self.headTween.start();
                   self.leftHandTween.start();
                   self.rightHandTween.start();
                   self.rightLegTween.start();
                   self.leftLegTween.start();
                   this.bodyTweenFlag = true;
                   key = false;
              }
              if(!key)
              {
                this.myTween =  this.game.time.events.loop(time,function(){
             
                   self.bodyTween.start();
                   self.headTween.start();
                   self.leftHandTween.start();
                   self.rightHandTween.start();
                   self.rightLegTween.start();
                   self.leftLegTween.start();
               });
              }
      
      }
      
}