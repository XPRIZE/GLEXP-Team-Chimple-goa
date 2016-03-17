export default class MenuState extends Phaser.State {

	create() {
        var x = this.game.width / 2;
        var y = this.game.height / 2;

        var style = { font: "65px Arial", fill: "#ffffff", align: "center" };

        this._text = this.add.text(x - 300, y - 200, "Press to Start", style);

        this.input.onDown.add(this.onDown, this);
	}

    onDown() {
        this.game.state.start('SceneEditState');
    }
}
