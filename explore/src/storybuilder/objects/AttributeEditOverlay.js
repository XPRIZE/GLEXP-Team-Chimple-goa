export default class AttributeEditOverlay extends Phaser.Group {
    //container to edit item properties
    constructor(game, width, height, clickedObject, pointer) {
        super(game);
        this.width = width;
        this.height = height;

        this.clickedObject = clickedObject;
        this.clickedPointer = pointer;
        this._overlayBitMap = game.make.bitmapData(game.width, game.height);
        this._overlayBitMap.draw(game.cache.getImage('storyBuilder/backgroundOverlay'), 0, 0, game.width, game.height);

        this.clickedObject.inputEnabled = false;
        this._overlayDisplaySprite = game.add.sprite(0, 0, this._overlayBitMap);
        this._overlayDisplaySprite.anchor.setTo(0, 0);
        this._overlayDisplaySprite.alpha = 0.5;
        this._overlayDisplaySprite.inputEnabled = true;
        game.world.bringToTop(this._overlayDisplaySprite);
        this._overlayDisplaySprite.events.onInputDown.add(this.onInputDown, this);
        this._overlayDisplaySprite.events.onInputUp.add(this.onInputUp, this);

        this.drawScaleHandler(0.8, 0xFFFFFF, 1.5, 75);

    }

    drawScaleHandler(alpha, color, lineWidth, radius) {
        this.dynamicCircle = self.game.add.graphics(0, 0);
        this.drawFixedHandler(alpha, color, lineWidth, radius);
        this.drawDragHandler(alpha, color, lineWidth, 20);
        
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


        let pos = this.clickedObject.toGlobal(new Phaser.Point(0, -this.clickedObject.height / 2));
        let clickedPointer = new Phaser.Point(pos.x + game.camera.x, pos.y + game.camera.y);
        this.fixedHandlerSprite = game.add.sprite(clickedPointer.x, clickedPointer.y, graphics.generateTexture());
        this.add(this.fixedHandlerSprite);
        game.world.bringToTop(this.fixedHandlerSprite);
        this.fixedHandlerSprite.anchor.set(0.5);
        this.fixedHandlerSprite.inputEnabled = false;
        graphics.destroy();
    }


    drawHorizontalLineAroundCircleOnGraphics(graphics, radius, angle, lineOffSet) {
        var p1 = this.computePointOnCircle(radius, angle, lineOffSet);
        var p2 = this.computePointOnCircle(radius, angle, -lineOffSet);
        graphics.moveTo(p1.x, p1.y);
        graphics.lineTo(p2.x, p2.y);
    }

    computePointOnCircle(radius, angle, lineOffSet) {
        var xPoint = (radius + lineOffSet) * Math.cos(angle * Math.PI / 180);
        var yPoint = (radius + lineOffSet) * Math.sin(angle * Math.PI / 180);

        return new Phaser.Point(xPoint, yPoint);
    }

    drawDragHandler(alpha, color, lineWidth, radius) {
        let graphicsDrag = game.add.graphics(0, 0);
        graphicsDrag.lineStyle(lineWidth, color, alpha);
        graphicsDrag.drawCircle(0, 0, 2 * radius);

        let initialDistance = (this.clickedObject.scale.x - 1.0) * 100 + 75;
        let xPoint = (initialDistance * Math.cos((this.clickedObject.angle + 90) * Math.PI / 180));
        let yPoint = (initialDistance * Math.sin((this.clickedObject.angle + 90) * Math.PI / 180));
        this.refresh(initialDistance);

        this.dragHandlerSprite = game.add.sprite(this.fixedHandlerSprite.x + xPoint, this.fixedHandlerSprite.y + yPoint, graphicsDrag.generateTexture());
        game.world.bringToTop(this.dragHandlerSprite);
        this.dragHandlerSprite.anchor.setTo(0.5);
        this.dragHandlerSprite.inputEnabled = true;
        this.dragHandlerSprite.input.enableDrag();
        this.dragHandlerSprite.angle = this.clickedObject.angle;
        this.dragHandlerSprite._click = 0;
        this.dragHandlerSprite._clickScale = new Phaser.Point(1, 1);
        this.dragHandlerSprite.input.useHandCursor = true;
        this.dragHandlerSprite.input.bringToTop = true;
        this.dragHandlerSprite.events.onInputDown.add(this.onDragHandlerInputDown, this);
        this.dragHandlerSprite.events.onInputUp.add(this.onDragHandlerInputUp, this);

        graphicsDrag.destroy();
    }

    refresh(distance) {
        this.dynamicCircle.lineStyle(1.5, 0xFFFFFF, 0.6);
        game.world.bringToTop(this.dynamicCircle);
        this.dynamicCircle.drawCircle(this.fixedHandlerSprite.x, this.fixedHandlerSprite.y, 2 * distance);

    }


    onDragHandlerInputDown(sprite, pointer) {
        this.dragHandlerSprite._click = new Phaser.Point(pointer.x, pointer.y);
        this.dynamicCircle.clear();
        game.input.addMoveCallback(this.onDragHandlerInputDrag, this);
    }

    onDragHandlerInputDrag(pointer, x, y, down) {
        this.dynamicCircle.clear();
        var rotation = game.physics.arcade.angleToPointer(this.fixedHandlerSprite, pointer);
        var angle = rotation * 180 / Math.PI - 90;
        this.clickedObject.angle = angle;

        var difference = 0;

        var distance = game.physics.arcade.distanceBetween(this.fixedHandlerSprite, this.dragHandlerSprite);
         difference = distance - 75;

        var scaleX = this.dragHandlerSprite._clickScale.x + difference / 100;
        var increasedScaleX = scaleX;
        this.clickedObject.scale.setTo(scaleX, scaleX);
        this.refresh(distance);
    }

    onDragHandlerInputUp(sprite, pointer) {
        var self = this;
        game.input.deleteMoveCallback(this.onDragHandlerInputDrag, this);
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            self.fixedHandlerSprite.destroy();
            self.dragHandlerSprite.destroy();
            self._overlayDisplaySprite.destroy();
            self.dynamicCircle.destroy();
            self.clickedObject.inputEnabled = true;
        });

    }

    onInputDown() {
        var self = this;
        game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            self.fixedHandlerSprite.destroy();
            self.dragHandlerSprite.destroy();
            self._overlayDisplaySprite.destroy();
            self.dynamicCircle.destroy();
            self.clickedObject.inputEnabled = true;
        });
    }

    onInputUp() {

    }


    shutdown() {
        this._overlayBitMap.destroy();
    }
}