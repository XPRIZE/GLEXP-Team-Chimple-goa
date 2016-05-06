import Surface from './Surface.js';
import TileTexture from './TileTexture.js';
import Holder from './Holder.js';
import Item from './Item.js';
import Wall from './Wall.js';
import MiscUtil from '../../util/MiscUtil.js';

export default class ExploreInputHandler {
    constructor(scene) {
        this.clickEnabled = true;
        this.dragEnabled = true;
        this.inputEnabled = true;
        this.scene = scene;
    }


    onInputDown(sprite, pointer) {
        let consoleBar = sprite.game.state.getCurrentState().consoleBar;
        let consoleText;
        if(consoleBar) {
            if(sprite instanceof Holder) {
                if(sprite.children[0]) {
                    consoleText = sprite.children[0].frameName;
                }
            } else {
                consoleText = sprite.frameName
            }
            if(consoleText) {
                if(consoleText.indexOf('_') != -1) {
                    consoleText = consoleText.substr(0, consoleText.indexOf('_'));
                } else if (consoleText.indexOf('.') != -1) {
                    consoleText = consoleText.substr(0, consoleText.indexOf('.'));
                }
                consoleBar.text.text = consoleText.charAt(0).toLowerCase() + consoleText.slice(1);
            }
        }
        sprite.scale.setTo(1.25, 1.25);
        sprite.y -= 10;

        this.instance.scene.selectedObject = sprite;
        sprite.position = sprite.parent.toGlobal(sprite.position).add(sprite.game.camera.x, 0);
        sprite.parent.removeChild(sprite);
        if(sprite instanceof Holder) {
            // sprite.input.priorityID = 1;        
            MiscUtil.setPriorityID(sprite, 1);
        }
        sprite.game.add.existing(sprite);
        sprite.bringToTop();

        // $('#element_to_pop_up').bPopup();

        // var url = "make" + '.json';
        // console.log('url '+url);
        // var meaning = '';
        // 	$.getJSON(url, function(jd) {
        // 			meaning = jd.meaning;
        // 			meaning = $(meaning).text();
        // 			$("#word").text(url);					
        // 			$("#meaning_content").text(meaning);
        // 			$("#example_content").text(jd.exmaples);
        // 			$("#image_content").attr("src", jd.image);
        //        });

        //   sprite.toggleDoorOpen();
    }

    onInputUp(sprite, pointer) {
        sprite.scale.setTo(1, 1);
        sprite.y += 10;
        this.instance.scene.selectedObject = null;
    }

    onDragStart(sprite, pointer) {
    }

    onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
    }

    onDragStop(sprite, pointer) {
        sprite.input.dragOffset.x = 0;
        let globalPoint = this.toGlobal(new PIXI.Point(0, 0)).add(sprite.game.camera.x, 0);
        let boundingBox = sprite.getBoundingBox();
        let testSprite = null;
        if(sprite instanceof Holder) {
            testSprite = new Phaser.Sprite(this.game, globalPoint.x, globalPoint.y, this.key, this.frame);                    
        } else if(sprite instanceof Item) {
            testSprite = new Phaser.Sprite(this.game, globalPoint.x - boundingBox.halfWidth, globalPoint.y, this.key, this.frame);        
        }
        this.game.physics.enable(testSprite);
        testSprite.body.setSize(boundingBox.width, this.game.height - this.y);
        this.addChild(testSprite);
        // this.game.debug.body(testSprite);
        // this.game.debug.body(sprite);

        let self = this, enoughSpace = true, result = {}, newResult = {};
        this.game.physics.arcade.overlap(testSprite, Surface.All, function(obj1, obj2) {
            let object = obj2;
            while(object = object.parent) {
                if(object == obj1.parent) {
                    return;
                }
            }            
            if (obj2.parent instanceof Wall) {
                return;
            }
            let collideObject = obj2.parent.toGlobal(obj2.parent.position).add(obj2.game.camera.x, 0);
            let distance = Math.abs(obj1.y - collideObject.y);
            if (!this.closestDistance || this.closestDistance > distance) {
               let match = false;
            //     let globalx = obj2.parent.toLocal(obj1.position).x - sprite.game.camera.x;
            //    let testSpriteLanded = new Phaser.Sprite(obj1.game, globalx, obj2.height / 2, obj1.key, obj1.frame);
            //    testSpriteLanded.anchor.setTo(0.5, 1);
            //    obj2.parent.addChild(testSpriteLanded);
            //    testSpriteLanded.game.physics.enable(testSpriteLanded);
            //    testSpriteLanded.body.setSize(obj1.width, obj1.height);
            //     testSpriteLanded.game.debug.body(testSpriteLanded);
               
            //    let surfaceTextures = [];
            //    obj2.parent.parent.surfaces.forEach(function(surface) {
            //        Array.prototype.push.apply(surfaceTextures, surface.textures);
            //    });
            //    testSpriteLanded.game.physics.arcade.overlap(testSpriteLanded, surfaceTextures, function(objx, objy) {
            //        if(objy != obj2) {
            //            match = true;
            //        }
            //    });
            //    obj2.parent.removeChild(testSpriteLanded);
            //    testSpriteLanded.destroy();
               if (!match) {
                    this.closestDistance = distance;
                    this.closestObject = obj2;                               
               }
            }            
        }, null, result);
        testSprite.destroy();
        if (result.closestObject) {
            this.position = result.closestObject.parent.toLocal(this.position).subtract(sprite.game.camera.x, 0);
            result.closestObject.parent.addContent(this);
            if(this instanceof Holder) {
                this.input.priorityID = 2;
            }
            this.game.add.tween(this).to({ y: result.closestObject.y + result.closestObject.height / 2 }, (Math.abs(this.y) / 0.1), null, true);
        }
        // if (result.closestObject) {

        //     let closestObjectName = result.closestObject;

        //     this.game.physics.arcade.overlap(this, Surface.All, function(obj1, obj2) {

        //         if (obj2 instanceof TileTexture) {
        //             return;
        //         }
        //         if (!(obj2.parent._uniquename == closestObjectName.parent._uniquename)) {
        //             let value1 = obj2.parent.toGlobal(obj2.parent.position);
        //             let value2 = closestObjectName.parent.toGlobal(closestObjectName.parent.position);
        //             if (obj1.height >= Math.abs((value1.y - value2.y) / 2)) {
        //                 enoughSpace = false;
        //                 console.log("There is no Enough space ");
        //                 return;
        //             }
        //         }
        //     }, null, newResult);

        //     if (enoughSpace) {
        //         result.closestObject.parent.addContent(this);
        //         this.game.add.tween(this).to({ y: 0 + result.closestObject.height / 2 }, (Math.abs(this.y) / 0.1), null, true);
        //         enoughSpace = true;
        //     }

        // }

    }
}