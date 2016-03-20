export default class PreloadState extends Phaser.State {

    preload() {
        this._asset = this.add.sprite(320, 240, 'assets/preloader.gif');
        this._asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this._asset);
        this.load.atlas('scene/scene', "assets/scene/scene.png", "assets/scene/scene.json");
        this.load.image('testsprite', 'assets/test.png');
        this.load.atlas('puppet/0', "assets/puppet/0.svg", "assets/puppet/0.json");
        this.load.atlas('puppet/1', "assets/puppet/1.svg", "assets/puppet/1.json");
        this.load.image('storyBuilder/record', "assets/storyBuilder/record_button.png");
        this.load.image('storyBuilder/stop', "assets/storyBuilder/stop_button.png");
        this.load.image('storyBuilder/pause', "assets/storyBuilder/pause_button.png");
        this.load.image('storyBuilder/backgroundOverlay', "assets/storyBuilder/backgroundOverlay.png");

        this.load.atlas('scene/scene', "assets/scene/scene.png", "assets/scene/scene.json");
        this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");
        this.load.atlas('scene/icons', "assets/scene/icons.png", "assets/scene/icons.json");
        this.load.json('scene/menu_icons', 'assets/scene/menu_icons.json');
        this.load.json('storyBuilder/library', 'assets/storyBuilder/library.json');
        this.load.image('puppet/delete_button', 'assets/puppet/hair_chooser.png');

        //load file story sceen

        this.load.image('storyBuilder/forest_1_th', 'assets/storyBuilder/forest/forest_1_th.png');
        this.load.image('storyBuilder/forest_2_th', 'assets/storyBuilder/forest/forest_2_th.png');
        this.load.image('storyBuilder/forest_3_th', 'assets/storyBuilder/forest/forest_3_th.png');
        this.load.image('storyBuilder/forest_4_th', 'assets/storyBuilder/forest/forest_4_th.png');
        this.load.image('storyBuilder/forest_5_th', 'assets/storyBuilder/forest/forest_5_th.png');
        this.load.image('storyBuilder/forest_6_th', 'assets/storyBuilder/forest/forest_6_th.png');
        this.load.image('storyBuilder/forest_7_th', 'assets/storyBuilder/forest/forest_7_th.png');

        this.load.image('storyBuilder/village_1_th', 'assets/storyBuilder/village/village_1_th.png');
        this.load.image('storyBuilder/village_2_th', 'assets/storyBuilder/village/village_2_th.png');
        this.load.image('storyBuilder/village_3_th', 'assets/storyBuilder/village/village_3_th.png');
        this.load.image('storyBuilder/village_4_th', 'assets/storyBuilder/village/village_4_th.png');
        this.load.image('storyBuilder/village_5_th', 'assets/storyBuilder/village/village_5_th.png');
        this.load.image('storyBuilder/village_6_th', 'assets/storyBuilder/village/village_6_th.png');
        this.load.image('storyBuilder/village_7_th', 'assets/storyBuilder/village/village_7_th.png');

        this.load.image('storyBuilder/puppet/american_football_th', 'assets/storyBuilder/puppet/american_football_th.png')
        //load configuration files
        this.load.json('storyBuilder/scene_config', 'assets/misc/configuration/scene_config.json');
        this.load.json('storyBuilder/puppet_config', 'assets/misc/configuration/puppet_config.json');
    }

    create() {
        this._asset.cropEnabled = false;
    }

    update() {
        if (!!this.ready) {
            this.game.state.start('StoryBuilderMenuState');
        }
    }

    onLoadComplete() {
        this.ready = true;
    }

}
