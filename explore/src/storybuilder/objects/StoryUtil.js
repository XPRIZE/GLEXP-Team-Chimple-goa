import Library from './Library.js';
import Story from './Story.js';
import Page from './Page.js';

export default class StoryUtil {
    static revive(k, v) {
        if (v instanceof Object && v._class == 'Library') {
            return Library.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Story') {
            return Story.fromJSON(window.game, v);
        } else if (v instanceof Object && v._class == 'Page') {
            return Page.fromJSON(window.game, v);
        }
        return v;
    }

    static replacer(k, v) {
        return v;
    }
}