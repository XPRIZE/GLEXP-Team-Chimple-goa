export default class PreloadState extends Phaser.State {

    preload() {
        this._asset = this.add.sprite(320, 240, 'assets/preloader.gif');
        this._asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this._asset);
        this.load.atlas('scene/scene', "assets/scene/scene.png", "assets/scene/scene.json");
        this.load.image('testsprite', 'assets/test.png');

        //default book and page image
        this.load.image('story_cover', 'assets/storyBuilder/story_cover.png');
        this.load.image('page_cover', 'assets/storyBuilder/page_cover.png');

        //load background scenes thumbnail JSON
        this.load.atlas('storyBuilder/backgrounds', "assets/storyBuilder/backgrounds.png", "assets/storyBuilder/backgrounds.json");
        this.load.json('storyBuilder/backgrounds_grid', 'assets/storyBuilder/backgrounds_grid.json');


        //load puppet scenes json
        this.load.atlas('puppet/characters', 'assets/puppet/characters.png', 'assets/puppet/characters.json');
        this.load.atlas('puppet/character', 'assets/puppet/Character.png', 'assets/puppet/Character.json');
        this.load.atlas('puppet/eye_mouth', 'assets/puppet/eye_mouth.png', 'assets/puppet/eye_mouth.json');
        this.load.json('puppet/accessorize', 'assets/puppet/accessorize.json');
        this.load.json('puppet/menu_accessorize', 'assets/puppet/menu_accessorize.json');
        this.load.atlas('puppet/headshape', 'assets/puppet/headshape.png', 'assets/puppet/headshape.json');
        
        //load puppet scenes thumbnail JSON
        this.load.atlas('storyBuilder/puppets', "assets/storyBuilder/puppets.png", "assets/storyBuilder/puppets.json");
        this.load.json('storyBuilder/puppets_grid', 'assets/storyBuilder/puppets_grid.json');
        


        this.load.image('storyBuilder/plus', "assets/storyBuilder/plus_button.png");
        this.load.image('storyBuilder/setting', "assets/storyBuilder/setting_button.png");
        this.load.image('storyBuilder/backgroundOverlay', "assets/storyBuilder/backgroundOverlay.png");
        this.load.image('storyBuilder/audio','assets/storyBuilder/audio.png');
        this.load.image('storyBuilder/text','assets/storyBuilder/text.png');
                        
        this.load.image('storyBuilder/sound_button', 'assets/storyBuilder/sound_button.png');

        this.load.json('storyBuilder/background_themes', 'assets/storyBuilder/background_themes.json');
        this.load.json('storyBuilder/object_sounds', 'assets/storyBuilder/object_sounds.json');
        this.load.json('storyBuilder/object_animation', 'assets/storyBuilder/object_animation.json');
        this.load.json('storyBuilder/object_effects', 'assets/storyBuilder/object_effects.json');


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

        // load images for icon in question answer
        this.load.image("match_the_following","assets/match_the_following.png");
        this.load.image("multiple_choice_ques","assets/multiple_choice_ques.png");
        this.load.image("next","assets/next.png");
        
        
        
        

    }

    create() {
        this._asset.cropEnabled = false;
    }

    update() {
        if (!!this.ready) {
            this.game.state.start('StoryBuilderLibraryState');
        }
    }

    onLoadComplete() {
        this.ready = true;
    }

}
