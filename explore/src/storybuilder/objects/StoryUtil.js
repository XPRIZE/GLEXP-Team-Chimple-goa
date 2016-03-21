import Library from './Library.js';
import Story from './Story.js';
import LibraryStory from './LibraryStory.js';
import Page from './Page.js';
import StoryPage from './StoryPage.js';

export default class StoryUtil {
    static revive(k, v) {
        if (v instanceof Object && v._class == 'Library') {
            let a = Library.fromJSON(window.game, v);
            return a;
        } else if (v instanceof Object && v._class == 'Story') {
            let a = Story.fromJSON(window.game, v);
            return a;
        } else if (v instanceof Object && v._class == 'Page') {
            let a =  Page.fromJSON(window.game, v);
            return a;
        } else if (v instanceof Object && v._class == 'StoryPage') {
            let a =  StoryPage.fromJSON(window.game, v);
            return a;
        } else if (v instanceof Object && v._class == 'LibraryStory') {
            let a =  LibraryStory.fromJSON(window.game, v);
            return a;
        }
        return v;
    }

    static replacer(k, v) {
        return v;
    }
}