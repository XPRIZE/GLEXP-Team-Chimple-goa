export default class BootState extends Phaser.State {

	create() {
        this.game.input.maxPointers = 1;
        this.game.stage.backgroundColor = 0xd8d8d8;

        if (this.game.device.desktop) {
            this.game.stage.pageAlignHorizontally = true;
        } else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth =  480;
            this.game.scale.minHeight = 260;
            this.game.scale.maxWidth = 1280;
            this.game.scale.maxHeight = 800;
            this.game.scale.forceLandscape = true;
            this.game.scale.pageAlignHorizontally = true;
        }

        this.game.state.start('PuppetPreloadState');
 	}

}
