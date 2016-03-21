import Scene from '../../scene/objects/Scene.js';
import Floor from '../../scene/objects/Floor.js';
import Wall from '../../scene/objects/Wall.js';
import Texture from '../../scene/objects/Texture.js';
import TileTexture from '../../scene/objects/TileTexture.js';
import Item from '../../scene/objects/Item.js';
import Holder from '../../scene/objects/Holder.js';
import Surface from '../../scene/objects/Surface.js';
import Util from '../../scene/objects/Util.js';
import PuppetUtil from '../../puppet/objects/PuppetUtil.js';
import Human from '../../puppet/objects/Human.js';
import Puppet from '../../puppet/objects/Puppet.js';
import TabView from '../../puppet/objects/TabView.js';

import StoryUtil from '../objects/StoryUtil.js';
import RecordingManager from '../objects/RecordingManager.js';
import ShowAttributeEditorSignal from '../objects/ShowAttributeEditorSignal.js';
import AttributeEditOverlay from '../objects/AttributeEditOverlay.js';
import StoryBuilderInputHandler from '../objects/StoryBuilderInputHandler.js';
import Library from '../objects/Library.js';
import Story from '../objects/Story.js';
import StoryPage from '../objects/StoryPage.js';
import ButtonGrid from '../../puppet/objects/ButtonGrid.js';


var _ = require('lodash');

export default class ConstructNewStoryPageState extends Phaser.State {
    init(cachedDisplayGroup, lastLoadedKey, lastLoadedType) {
        this._cachedDisplayGroup = cachedDisplayGroup;
        this._lastLoadedKeyForPupperOrSceneJSON = lastLoadedKey;
        this._lastLoadedType = lastLoadedType;
    }

    preload() {
        this.load.atlas('scene/scene', "assets/scene/scene.png", "assets/scene/scene.json");
        this.load.atlas('misc/theme', "assets/misc/theme.png", "assets/misc/theme.json");
        this.load.atlas('scene/icons', "assets/scene/icons.png", "assets/scene/icons.json");
        this.load.json('scene/menu_icons', 'assets/scene/menu_icons.json');
        this.load.json('storyBuilder/background_themes', 'assets/storyBuilder/background_themes.json');
        this.load.json('storyBuilder/puppet_themes', 'assets/storyBuilder/puppet_themes.json');

        this.load.image('storybuilder/choose_prop_button', 'assets/storyBuilder/prop_button.png');
        this.load.image('storybuilder/choose_character_button', 'assets/storyBuilder/prop_button.png');
        this.load.image('storybuilder/choose_background_button', 'assets/storyBuilder/prop_button.png');
        this.load.image('storybuilder/setting_button', 'assets/storyBuilder/setting_button.png');
        this.load.image('storybuilder/plus', 'assets/storyBuilder/plus_button.png');


    }

    create() {
        //Create UI
        //Button to user input
        //Add Background
        //Add Puppet
        //Add Props
        if (this._cachedDisplayGroup != null) {
            this._displayControlGroup = this._cachedDisplayGroup;
            this.game.add.existing(this._displayControlGroup);
        } else {
            this._displayControlGroup = this.game.add.group();
            this._displayControlGroup.inputEnabled = true;
            this.setUpUI();
        }

        //load configuration
        this._sceneConfig = this.game.cache.getJSON('storyBuilder/scene_config');
        this._puppetConfig = this.game.cache.getJSON('storyBuilder/puppet_config');

        this.constructStory();

    }
    setUpUI() {

        this.createActionButtons();
        this.initializeRecordingManager();
    }

    constructStory() {
        let cachedJSON = this.cache.getJSON(this._lastLoadedKeyForPupperOrSceneJSON);
        if (cachedJSON) {

            this._scene = null;
            if (this._lastLoadedType == ConstructNewStoryPageState.SCENE_TYPE) {
                let cachedJSONStr = JSON.stringify(cachedJSON);
                this._scene = JSON.parse(cachedJSONStr, Util.revive);
            } else if (this._lastLoadedType == ConstructNewStoryPageState.PUPPET_TYPE) {
                let cachedJSONStr = JSON.stringify(cachedJSON, PuppetUtil.replacer);
                this._puppet = JSON.parse(cachedJSONStr, PuppetUtil.revive);
                this._puppet.body.enableInputs(new StoryBuilderInputHandler(), false);
                //later puppet and add to scene

                //scene = JSON.parse(cachedJSONStr, PuppetUtil.revive);
            }
            if (this._scene) {
                console.log('scene:' + this._scene);

                this._scene.floor.contents.forEach(function(element) {
                    element.enableInputs(new StoryBuilderInputHandler(), false);
                }, this);

                this._scene.wall.contents.forEach(function(element) {
                    element.enableInputs(new StoryBuilderInputHandler(), false);
                }, this);

                this._displayControlGroup.add(this._scene);
                this._displayControlGroup.sendToBack(this._scene);

            }
        }

    }

    createActionButtons() {

        this._homeButton = this.game.make.sprite(this.game.width - 40, 40, 'storybuilder/home_button');
        this._homeButton.anchor.setTo(0.5);
        this._homeButton.inputEnabled = true;
        this._homeButton.events.onInputDown.add(this.navigateToLibrary, this);
        this._displayControlGroup.add(this._homeButton);


        this._chooseBackGroundButton = this.game.make.sprite(this.game.width - 100, 40, 'storybuilder/home_button');
        this._chooseBackGroundButton.anchor.setTo(0.5);
        this._chooseBackGroundButton.inputEnabled = true;
        this._chooseBackGroundButton.events.onInputDown.add(this.chooseBackGround, this);
        this._chooseBackGroundButton.x = this._homeButton.x - this._homeButton.width;
        this._chooseBackGroundButton.y = this._homeButton.y;

        this._displayControlGroup.add(this._chooseBackGroundButton);

        this._chooseCharacterButton = this.game.make.sprite(this.game.width - 160, 40, 'storybuilder/home_button');
        this._chooseCharacterButton.anchor.setTo(0.5);
        this._chooseCharacterButton.inputEnabled = true;
        this._chooseCharacterButton.x = this._chooseBackGroundButton.x - this._chooseBackGroundButton.width;
        this._chooseCharacterButton.y = this._homeButton.y;
        this._chooseCharacterButton.events.onInputDown.add(this.choosePuppet, this);
        this._displayControlGroup.add(this._chooseCharacterButton);

    }

    chooseBackGround(sprite, pointer) {
        if (this._choosePuppetTab) {
            this._choosePuppetTab.alpha = 0;
        }

        this.createChooseBackGroundTab();
        this._chooseBackGroundTab.alpha = 1;
    }

    choosePuppet(sprite, pointer) {
        if (this._chooseBackGroundTab) {
            this._chooseBackGroundTab.alpha = 0;
        }

        this.createChoosePuppetTab();
        this._choosePuppetTab.alpha = 1;
    }


    navigateToLibrary() {
        this.game.state.start('StoryBuilderLibraryState');
    }

    createChooseBackGroundTab() {
        if (!this._chooseBackGroundTab) {
            let backGroundThemes = this.game.cache.getJSON('storyBuilder/background_themes');
            //later get from texture packer
            let forestNames = ["forest_1_th", "forest_2_th", "forest_3_th", "forest_4_th", "forest_5_th", "forest_6_th", "forest_7_th"];
            let villageNames = ["village_1_th", "village_2_th", "village_3_th", "village_4_th", "village_5_th", "village_6_th", "village_7_th"];

            this._chooseBackGroundTab = this._displayControlGroup.add(new TabView(this.game, 'scene/scene', this.game.width * 0.9, this.game.height, 10, 50, 5, 3, true, function(tab, button) {
                this._chooseBackGroundTab.unSelect();
                this.dynamicallyLoadAssets(button, ConstructNewStoryPageState.SCENE_TYPE, this._sceneConfig);
                this._chooseBackGroundTab.alpha = 0;
            }, this, backGroundThemes));

            this._chooseBackGroundTab.tabs = { 'forest': forestNames, 'village': villageNames };
            this._chooseBackGroundTab.x = this.game.width * 0.05;
            this._chooseBackGroundTab.y = 0;
            this._chooseBackGroundTab.fixedToCamera = true;
            this._chooseBackGroundTab.visible = false;

        } else {
            this._chooseBackGroundTab.visible = true;
            this._chooseBackGroundTab.selectTab(Object.keys(this._chooseBackGroundTab.tabs)[0]);
        }
    }

    createChoosePuppetTab() {
        if (!this._choosePuppetTab) {
            let puppetThemes = this.game.cache.getJSON('storyBuilder/puppet_themes');
            //later get from texture packer
            let humanNames = ["american_football_th"];

            this._choosePuppetTab = this._displayControlGroup.add(new TabView(this.game, 'Puppet', this.game.width * 0.9, this.game.height, 10, 50, 5, 3, true, function(tab, button) {
                this._choosePuppetTab.unSelect();
                console.log('button:' + button);
                console.log('tab:' + tab);
                //place item on game
                //load puppet for selected button
                this.dynamicallyLoadAssets(button, ConstructNewStoryPageState.PUPPET_TYPE, this._puppetConfig);
                this._choosePuppetTab.alpha = 0;
            }, this, puppetThemes));

            this._choosePuppetTab.tabs = { 'human1': humanNames, 'human2': humanNames };
            this._choosePuppetTab.x = this.game.width * 0.05;
            this._choosePuppetTab.y = 0;
            this._choosePuppetTab.fixedToCamera = true;
            this._choosePuppetTab.visible = false;
        } else {
            this._choosePuppetTab.visible = true;
            this._chooseBackGroundTab.selectTab(Object.keys(this._choosePuppetTab.tabs)[0]);
        }
    }

    initializeRecordingManager() {
        if (!this.recordingManager) {
            this.recordingManager = new RecordingManager(game, this._displayControlGroup);
            this._showAttributeEditorSignal = new ShowAttributeEditorSignal();
            this._showAttributeEditorSignal.add(this.showAttributeEditor, this);
        }
    }


    dynamicallyLoadAssets(assetName, type, config) {
        this._configToLoad = config[type][assetName];
        this.game.state.start('StoryOnDemandLoadState', true, false, this._configToLoad, this.game.state.getCurrentState().key, type, this._displayControlGroup);
    }

    showAttributeEditor(item, pointer) {
        this._AttributeEditOverlay = new AttributeEditOverlay(game, game.width, game.height, item, pointer);
    }

    shutdown() {
        this.world.remove(this._page);
        this.world.remove(this._displayControlGroup);
    }


}


ConstructNewStoryPageState.SCENE_TYPE = 'scenes';
ConstructNewStoryPageState.PUPPET_TYPE = 'puppets';