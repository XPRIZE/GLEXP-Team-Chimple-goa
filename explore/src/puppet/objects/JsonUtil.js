import Limb from './Limb.js';
import Accessory from './Accessory.js';
import Shape from './Shape.js';
import RelativePosition from './RelativePosition.js';
import Puppet from './Puppet.js';
import Human from './Human.js';


import Scene from '../../scene/objects/Scene.js';
import Floor from '../../scene/objects/Floor.js';
import Wall from '../../scene/objects/Wall.js';
import Holder from '../../scene/objects/Holder.js';
import Texture from '../../scene/objects/Texture.js';
import Surface from '../../scene/objects/Surface.js';
import Item from '../../scene/objects/Item.js';
import TileTexture from '../../scene/objects/TileTexture.js';

import Library from '../../storybuilder/objects/Library.js';
import Story from '../../storybuilder/objects/Story.js';
import LibraryStory from '../../storybuilder/objects/LibraryStory.js';
import Page from '../../storybuilder/objects/Page.js';
import StoryPage from '../../storybuilder/objects/StoryPage.js';

export default class JsonUtil {
    static revive(k, v) {
        if (v instanceof Object && v._class == 'Shape') {
            return Shape.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'ComboShape') {
            return ComboShape.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Limb') {
            return Limb.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Puppet') {
            return Puppet.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Human') {
            return Human.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Accessory') {
            return Accessory.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Phaser.Point') {
            return new Phaser.Point(v.x, v.y);
        } else if (v instanceof Object && v._class == 'Phaser.RoundedRectangle') {
            return new Phaser.RoundedRectangle(v.x, v.y, v.width, v.height, v.radius);
        } else if (v instanceof Object && v._class == 'Phaser.Rectangle') {
            return new Phaser.Rectangle(v.x, v.y, v.width, v.height);
        } else if (v instanceof Object && v._class == 'Phaser.Circle') {
            return new Phaser.Circle(v.x, v.y, v.diameter);
        } else if (v instanceof Object && v._class == 'Phaser.Ellipse') {
            return new Phaser.Ellipse(v.x, v.y, v.width, v.height);
        } else if (v instanceof Object && v._class == 'Scene') {
            return Scene.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Holder') {
            return Holder.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Floor') {
            return Floor.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Wall') {
            return Wall.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Texture') {
            return Texture.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'TileTexture') {
            return TileTexture.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Surface') {
            return Surface.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Item') {
            return Item.fromJSON(window.game, v);
        }
        else if (v instanceof Object && v._class == 'Library') {
            let a = Library.fromJSON(window.game, v);
            return a;
        } else if (v instanceof Object && v._class == 'Story') {
            let a = Story.fromJSON(window.game, v);
            return a;
        } else if (v instanceof Object && v._class == 'Page') {
            let a = Page.fromJSON(window.game, v);
            return a;
        } else if (v instanceof Object && v._class == 'StoryPage') {
            let a = StoryPage.fromJSON(window.game, v);
            return a;
        } else if (v instanceof Object && v._class == 'LibraryStory') {
            let a = LibraryStory.fromJSON(window.game, v);
            return a;
        }
        return v;
    }

    static replacer(k, v) {
        if (v instanceof Phaser.Point) {
            return {
                _class: "Phaser.Point",
                x: v.x,
                y: v.y
            }
        } else if (v instanceof Phaser.RoundedRectangle) {
            return {
                _class: "Phaser.RoundedRectangle",
                x: v.x,
                y: v.y,
                width: v.width,
                height: v.height,
                radius: v.radius
            }
        } else if (v instanceof Phaser.Rectangle) {
            return {
                _class: "Phaser.Rectangle",
                x: v.x,
                y: v.y,
                width: v.width,
                height: v.height
            }
        } else if (v instanceof Phaser.Circle) {
            return {
                _class: "Phaser.Circle",
                x: v.x,
                y: v.y,
                diameter: v.diameter
            }

        } else if (v instanceof Phaser.Ellipse) {
            return {
                _class: "Phaser.Ellipse",
                x: v.x,
                y: v.y,
                width: v.width,
                height: v.height
            }

        }
        return v;
    }
}