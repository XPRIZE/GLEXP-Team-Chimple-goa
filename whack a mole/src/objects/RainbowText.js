class RainbowText extends Phaser.Text {

	constructor(game, x, y, text) {

		super(game, x, y, text, { font: "45px Arial", fill: "#000000", align: "center" });
        this.game.stage.addChild(this);
   /*  WebFontConfig = {
    active () { game.time.events.add(Phaser.Timer.SECOND, createText, this); 
                        },
    google: {
      families: ['Finger Paint']
    }

}*/
	}

}

export default RainbowText;