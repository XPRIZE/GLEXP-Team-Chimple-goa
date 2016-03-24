import Surface from './Surface.js';
import TileTexture from './TileTexture.js';

export default class ExploreInputHandler {
    constructor(game) {
        this.clickEnabled = true;
        this.dragEnabled = true;


        this.inputEnabled = true;
        
    }
    
    
    onInputDown(sprite, pointer) {
        sprite.scale.setTo(1.2,1.2);
        
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
    }
    
    onDragStart(sprite, pointer) {
        sprite._isDragging = true;
        sprite.game.camera.follow(sprite, Phaser.Camera.FOLLOW_PLATFORMER);
        sprite.start_camera_x = sprite.game.camera.x;
        sprite.start_camera_y = sprite.game.camera.y;

        // sprite.x = this.game.input.activePointer.x;
        // sprite.y = this.game.input.activePointer.y;
    }

    onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
        sprite.x += sprite.game.camera.x - sprite.start_camera_x;
        sprite.y += sprite.game.camera.y - sprite.start_camera_y;


        // let distanceFromLastUp = Phaser.Math.distance(game.input.activePointer.positionDown.x, game.input.activePointer.positionDown.y,
        //     game.input.activePointer.x, game.input.activePointer.y);

        // if (distanceFromLastUp < 5) {
        //     this._isDragging = false;
        // } else {
        //     this._isDragging = true;

        //     if (this._isDragging == true) {

        //         sprite.x = this.game.input.activePointer.worldX;
        //         sprite.y = this.game.input.activePointer.worldY - (0.570 * this.game.height);

        //     }
        // }
    }

    onDragStop(sprite, pointer) {
        this.game.camera.unfollow();
        sprite._isDragging = false;
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