import Limb from './Limb.js';
import Accessory from './Accessory.js';
import Shape from './Shape.js';
import RelativePosition from './RelativePosition.js';
import Puppet from './Puppet.js';
import Human from './Human.js';

export default class Util {
    static revive(k, v) {
        if (v instanceof Object && v._class == 'Shape') {
            return Shape.fromJSON(window.game, v);
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
      
        }
        return v;
    }    
}