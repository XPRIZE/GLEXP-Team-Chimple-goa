import Shape from '../../puppet/objects/Shape.js';

export default class StoryBuilderInputHandler {
    constructor(game) {
        this.clickEnabled = true;
        this.dragEnabled = true;
    }

    onInputDown(sprite, pointer) {
        sprite.modifiedBit = 1;
        // $('#element_to_pop_up').bPopup();

        // var url = "make" + '.json';
        // console.log('url ' + url);
        // var meaning = '';
        // $.getJSON(url, function(jd) {
        //     meaning = jd.meaning;
        //     meaning = $(meaning).text();
        //     $("#word").text(url);
        //     $("#meaning_content").text(meaning);
        //     $("#example_content").text(jd.exmaples);
        //     $("#image_content").attr("src", jd.image);
        // });

    }

    onInputUp(sprite, pointer) {
    }

    onDragStart(sprite, pointer) {
        sprite._isDragging = true;
        sprite.game.camera.follow(sprite, Phaser.Camera.FOLLOW_PLATFORMER);
        sprite.start_camera_x = sprite.game.camera.x;
        sprite.start_camera_y = sprite.game.camera.y;
    }

    onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {
        sprite.x += sprite.game.camera.x - sprite.start_camera_x;
        sprite.y += sprite.game.camera.y - sprite.start_camera_y;

    }

    onDragStop(sprite, pointer) {
        this.game.camera.unfollow();
        var distanceFromLastUp = Phaser.Math.distance(self.game.input.activePointer.positionDown.x, self.game.input.activePointer.positionDown.y,
            self.game.input.activePointer.x, self.game.input.activePointer.y);

        if (distanceFromLastUp < 5) {
            sprite._isDragging = false;
            if (!sprite._isDragging && !game._inPlayMode) {
                sprite._showAttributeEditorSignal.dispatch(sprite, pointer);
            }

        }

    }
}