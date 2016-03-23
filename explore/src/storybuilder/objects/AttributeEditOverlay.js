import RecordingPauseSignal from './RecordingPauseSignal.js';
import RecordingResumeSignal from './RecordingResumeSignal.js';
import Shape from '../../puppet/objects/Shape.js';
import TabView from '../../puppet/objects/TabView.js';

export default class AttributeEditOverlay extends Phaser.Group {
    //container to edit item properties
    constructor(game, width, height, clickedObject, pointer) {
        super(game);
        this._width = width;
        this._height = height;
        this._recordingPauseSignal = new RecordingPauseSignal();
        this._recordingResumeSignal = new RecordingResumeSignal();

        if (clickedObject instanceof Shape) {
            this._clickedObject = clickedObject.parent.parent;
        } else {
            this._clickedObject = clickedObject;
        }


        this._overlayBitMap = game.make.bitmapData(game.width + game.world.camera.x, game.height + game.world.camera.y);
        this._overlayBitMap.draw(game.cache.getImage('storyBuilder/backgroundOverlay'), 0, 0, this._width + game.world.camera.x, this._height + game.world.camera.y);

        this._clickedObject.inputEnabled = false;
        this._overlayDisplaySprite = game.add.sprite(0, 0, this._overlayBitMap);
        this._overlayDisplaySprite.anchor.setTo(0, 0);
        this._overlayDisplaySprite.alpha = 0.5;
        this._overlayDisplaySprite.inputEnabled = true;
        game.world.bringToTop(this._overlayDisplaySprite);
        this._overlayDisplaySprite.events.onInputDown.add(this.onInputDown, this);
        this._overlayDisplaySprite.events.onInputUp.add(this.onInputUp, this);

        this.drawScaleHandler(0.8, 0xFFFFFF, 1.5, 75);

        this._settings = this._overlayDisplaySprite.addChild(game.make.sprite(300, 60, 'storyBuilder/setting'));
        this._settings.fixedToCameara = true;
        this._settings.inputEnabled = true;
        this._settings.events.onInputUp.add(this.createAdditionalPropertiesOverlay, this);
        this._settings.input.priorityID = 2;

    }

    createAdditionalPropertiesOverlay() {
        console.log('input up');
        //create new TabUI for text and Sound editing
        var that = this;

        game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            that._fixedHandlerSprite.destroy();
            that._dragHandlerSprite.destroy();
            that._dynamicCircle.destroy();
            that._overlayDisplaySprite.destroy();


            let backGroundThemes = that.game.cache.getJSON('storyBuilder/background_themes');
            //later get from texture packer
            let TextNames = ["plus1", "plus2", "plus3", "plus4"];
            let audioNames = ["plus1", "plus2"];
            
            that._chooseBackGroundTab = that.game.add.existing(new TabView(that.game, 'scene/scene', that.game.width + that.game.world.camera.x, that.game.height + that.game.world.camera.y, 10, 50, 5, 3, true, function(tab, button) {
                that._chooseBackGroundTab.unSelect();
                that._chooseBackGroundTab.destroy();
                that._clickedObject.inputEnabled = true;
                //that._recordingResumeSignal.dispatch();
               
                console.log(" button name is : "+ button + " tab name is : "+tab);

                $("#login-box").fadeIn(300);
                
                $('body').append('<div id="mask"></div>');
                $('#mask').fadeIn(300);
                    window.callback = this.addtext_fromhtml;
                    window.callbackContext = this;
            }, that, backGroundThemes));

            that._chooseBackGroundTab.tabs = { 'forest': TextNames, 'village': audioNames };
            that._chooseBackGroundTab.x = that.game.width * 0.05;
            that._chooseBackGroundTab.y = 0;
            that._chooseBackGroundTab.fixedToCamera = true;
            that._chooseBackGroundTab.visible = true;
            that._chooseBackGroundTab.bringToTop = true;
        });

    }

    addtext_fromhtml(textvalue, text_color, background_color)
    {
           console.log("my value = "+textvalue + " color : "+ text_color + " background_color : "+ background_color);
    }

    drawScaleHandler(alpha, color, lineWidth, radius) {
        this._dynamicCircle = self.game.add.graphics(0, 0);
        this.drawFixedHandler(alpha, color, lineWidth, radius);
        this.drawDragHandler(alpha, color, lineWidth, 20);
        this._recordingPauseSignal.dispatch();
    }

    drawFixedHandler(alpha, color, lineWidth, radius) {
        let graphics = game.add.graphics(0, 0);
        graphics.lineStyle(lineWidth, color, alpha);
        graphics.drawCircle(0, 0, 2 * radius);

        //draw line across circle

        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 0, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 45, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 90, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 135, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 180, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 225, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 270, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 315, 5);
        this.drawHorizontalLineAroundCircleOnGraphics(graphics, radius, 360, 5);


        //let pos = this._clickedObject.parent.toGlobal(new Phaser.Point(this._clickedObject.x, this._clickedObject.y - this._clickedObject.height / 2));
        //let clickedPointer = new Phaser.Point(pos.x + game.camera.x, pos.y + game.camera.y);
        let pos = this._clickedObject.toGlobal(new Phaser.Point(0, - this._clickedObject.height / 2));
        let clickedPointer = new Phaser.Point(pos.x + game.camera.x, pos.y + game.camera.y);
        this._fixedHandlerSprite = game.add.sprite(clickedPointer.x, clickedPointer.y, graphics.generateTexture());
        this.add(this._fixedHandlerSprite);
        game.world.bringToTop(this._fixedHandlerSprite);
        this._fixedHandlerSprite.anchor.set(0.5);
        this._fixedHandlerSprite.inputEnabled = false;
        graphics.destroy();
    }


    drawHorizontalLineAroundCircleOnGraphics(graphics, radius, angle, lineOffSet) {
        let p1 = this.computePointOnCircle(radius, angle, lineOffSet);
        let p2 = this.computePointOnCircle(radius, angle, -lineOffSet);
        graphics.moveTo(p1.x, p1.y);
        graphics.lineTo(p2.x, p2.y);
    }

    computePointOnCircle(radius, angle, lineOffSet) {
        let xPoint = (radius + lineOffSet) * Math.cos(angle * Math.PI / 180);
        let yPoint = (radius + lineOffSet) * Math.sin(angle * Math.PI / 180);

        return new Phaser.Point(xPoint, yPoint);
    }

    drawDragHandler(alpha, color, lineWidth, radius) {
        let graphicsDrag = game.add.graphics(0, 0);
        graphicsDrag.lineStyle(lineWidth, color, alpha);
        graphicsDrag.drawCircle(0, 0, 2 * radius);

        let initialDistance = (this._clickedObject.scale.x - 1.0) * 100 + 75;
        let xPoint = (initialDistance * Math.cos((this._clickedObject.angle + 90) * Math.PI / 180));
        let yPoint = (initialDistance * Math.sin((this._clickedObject.angle + 90) * Math.PI / 180));
        this.refresh(initialDistance);

        this._dragHandlerSprite = game.add.sprite(this._fixedHandlerSprite.x + xPoint, this._fixedHandlerSprite.y + yPoint, graphicsDrag.generateTexture());
        game.world.bringToTop(this._dragHandlerSprite);
        this._dragHandlerSprite.anchor.setTo(0.5);
        this._dragHandlerSprite.inputEnabled = true;
        this._dragHandlerSprite.input.enableDrag();
        this._dragHandlerSprite.angle = this._clickedObject.angle;
        this._dragHandlerSprite._click = 0;
        this._dragHandlerSprite._clickScale = new Phaser.Point(1, 1);
        this._dragHandlerSprite.input.useHandCursor = true;
        this._dragHandlerSprite.input.bringToTop = true;
        this._dragHandlerSprite.events.onInputDown.add(this.onDragHandlerInputDown, this);
        this._dragHandlerSprite.events.onInputUp.add(this.onDragHandlerInputUp, this);

        graphicsDrag.destroy();
    }

    refresh(distance) {
        this._dynamicCircle.lineStyle(1.5, 0xFFFFFF, 0.6);
        game.world.bringToTop(this._dynamicCircle);
        this._dynamicCircle.drawCircle(this._fixedHandlerSprite.x, this._fixedHandlerSprite.y, 2 * distance);

    }


    onDragHandlerInputDown(sprite, pointer) {
        this._dragHandlerSprite._click = new Phaser.Point(pointer.x, pointer.y);
        this._dynamicCircle.clear();
        game.input.addMoveCallback(this.onDragHandlerInputDrag, this);
    }

    onDragHandlerInputDrag(pointer, x, y, down) {
        this._dynamicCircle.clear();
        this._recordingResumeSignal.dispatch();
        let rotation = game.physics.arcade.angleToPointer(this._fixedHandlerSprite, pointer);
        let angle = rotation * 180 / Math.PI - 90;
        this._clickedObject.angle = angle;

        let difference = 0;

        let distance = game.physics.arcade.distanceBetween(this._fixedHandlerSprite, this._dragHandlerSprite);
        difference = distance - 75;

        let scaleX = this._dragHandlerSprite._clickScale.x + difference / 100;
        let increasedScaleX = scaleX;
        this._clickedObject.scale.setTo(scaleX, scaleX);
        this.refresh(distance);
    }

    onDragHandlerInputUp(sprite, pointer) {
        let self = this;
        game.input.deleteMoveCallback(this.onDragHandlerInputDrag, this);
        this.closeAttributeEditOverlay();
    }

    onInputDown() {
        let self = this;
        this.closeAttributeEditOverlay();
    }

    closeAttributeEditOverlay() {
        var that = this;
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            that._fixedHandlerSprite.destroy();
            that._dragHandlerSprite.destroy();
            that._overlayDisplaySprite.destroy();
            that._dynamicCircle.destroy();
            that._clickedObject.inputEnabled = true;
            that._recordingResumeSignal.dispatch();
        });


    }

    onInputUp() {

    }


    shutdown() {
        this._overlayBitMap.destroy();
    }
}