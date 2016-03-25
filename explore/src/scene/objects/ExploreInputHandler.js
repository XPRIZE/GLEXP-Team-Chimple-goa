import Surface from './Surface.js';
import TileTexture from './TileTexture.js';

export default class ExploreInputHandler {
    constructor(scene) {
        this.clickEnabled = true;
        this.dragEnabled = true;
        this.inputEnabled = true;
        this.scene = scene;
    }
    
    
    onInputDown(sprite, pointer) {
        sprite.scale.setTo(1.2,1.2);
        sprite.y -= 10;
        
        this.instance.scene.selectedObject = sprite;
        
        $('#element_to_pop_up').bPopup();
        
   		var url = "make" + '.json';
		console.log('url '+url);
		var meaning = '';
			$.getJSON(url, function(jd) {
					meaning = jd.meaning;
					meaning = $(meaning).text();
					$("#word").text(url);					
					$("#meaning_content").text(meaning);
					$("#example_content").text(jd.exmaples);
					$("#image_content").attr("src", jd.image);
               });
        
     //   sprite.toggleDoorOpen();
    }
    
    onInputUp(sprite, pointer) {
        sprite.scale.setTo(1,1);
        sprite.y += 10;
        this.instance.scene.selectedObject = null;
    }
    
    onDragStart(sprite, pointer) {
    }

    onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
    }

    onDragStop(sprite, pointer) {
        sprite.input.dragOffset.x = 0;
        let globalPoint = this.toGlobal(new PIXI.Point(0, 0));
        let testSprite = new Phaser.Sprite(this.game, globalPoint.x, globalPoint.y, this.key, this.frame);
        this.game.physics.enable(testSprite);
        testSprite.body.setSize(this.width, this.game.height - this.y, this.x, this.y);
        this.addChild(testSprite);
        this.game.debug.body(testSprite);

         let self = this,enoughSpace = true , result = {},newResult = {};
        this.game.physics.arcade.overlap(testSprite, Surface.All, this.overlapHandler, null, result);
        testSprite.destroy();
        if (result.closestObject) {
            
            let closestObjectName = result.closestObject;
            
            this.game.physics.arcade.overlap(this, Surface.All,function(obj1,obj2) {
         
                if(obj2 instanceof TileTexture){
                    return;
                }
                if (! (obj2.parent._uniquename == closestObjectName.parent._uniquename)) {
                        let value1 = obj2.parent.toGlobal(obj2.parent.position);
                        let value2 = closestObjectName.parent.toGlobal(closestObjectName.parent.position);
                    if(obj1.height >= Math.abs((value1.y - value2.y)/2) ){
                        enoughSpace = false;
                        console.log("There is no Enough space ");
                        return; 
                    }
                }
            } , null , newResult);
        
            if(enoughSpace){
                result.closestObject.parent.addContent(this);
                this.game.add.tween(this).to({ y: 0 + result.closestObject.height / 2 }, (Math.abs(this.y)/0.1), null, true);
                enoughSpace = true;    
             }
        
        }
        
    }   
}