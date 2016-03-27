export default class MenuState extends Phaser.State {

    preload() {
        this.load.atlas('scene/icons', "assets/scene/icons.png", "assets/scene/icons.json");
        this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");
    }
    
	create() {
        let explore = game.add.button(this.game.width / 4, this.game.height / 2, 'scene/icons', this.goExplore, this, 'explore.png', 'explore.png', 'explore.png', 'explore.png')
        explore.anchor.setTo(0.5, 0.5)

        let edit = game.add.button(this.game.width * 2 / 4, this.game.height / 2, 'scene/icons', this.goEdit, this, 'edit.png', 'edit.png', 'edit.png', 'edit.png')
        edit.anchor.setTo(0.5, 0.5)

        let group = game.add.button(this.game.width * 3 / 4, this.game.height / 2, 'scene/icons', this.goGroup, this, 'group.png', 'group.png', 'group.png', 'group.png')
        group.anchor.setTo(0.5, 0.5)
	}

    goExplore() {
        this.game.state.start('SceneGameState', true, false, 'school');
    }

    goEdit() {
        this.game.state.start('SceneEditState');
    }

    goGroup() {
        // this.game.state.start('SceneEditHolderState');
        document.getElementById('overlay').style.display = "block"
    }
}
