import ButtonGrid from './ButtonGrid.js';

export default class TabView extends Phaser.Group {
    constructor(game, name, width, height, minTabLength, callback, callbackContext) {
        super(game);
        this.name = name;
        this.elementWidth = width;
        this.elementHeight = height;
        this.minTabLength = minTabLength || TabView.MIN_TAB_LENGTH;
        this.padding = TabView.DEFAULT_PADDING;
        this.callback = callback;
        this.callbackContext = callbackContext;
    }
    
    set tabs(tabs) {
        this._tabs = tabs;
        let numberOfTabs = Object.keys(tabs).length;
        let totalLength = numberOfTabs * (this.minTabLength + this.padding * 2);
        //let numberOfRows = Math.ceil(totalLength / this.elementWidth);
        let numberOfRows = 1;
//        let numberOfColumns = Math.ceil(numberOfTabs / numberOfRows);
        let numberOfColumns = numberOfTabs;
        let tabHeaderWidth = this.elementWidth;
        let tabHeaderHeight = numberOfRows * (this.minTabLength + this.padding * 2);
        this.tabView = new ButtonGrid(this.game, this.name, tabHeaderWidth, tabHeaderHeight, numberOfRows, numberOfColumns, this.callSelectTab, this);
        this.add(this.tabView);
        this.tabView.buttons = Object.keys(tabs);
        let maxButtons = 0;
        for (var key in tabs) {
            if(maxButtons < tabs[key].length) {
                maxButtons = tabs[key].length;
            }
        }
        let tabBodyWidth = this.elementWidth;
        let tabBodyHeight = this.elementHeight - tabHeaderHeight;
        let numberOfBodyRows = Math.ceil(maxButtons * (this.minTabLength + this.padding * 2) / tabBodyWidth);
        let numberOfBodyColumns = Math.ceil(maxButtons / numberOfBodyRows);
        this.tabBody = new ButtonGrid(this.game, this.name, tabBodyWidth, tabBodyHeight, numberOfBodyRows, numberOfBodyColumns, this.callback, this.callbackContext);
        this.add(this.tabBody);
        this.tabBody.x = 0;
        this.tabBody.y = tabHeaderHeight;
        this.selectTab(Object.keys(tabs)[0]);
        
    }
    
    get tabs() {
        return this._tabs;
    }
    
    selectTab(name) {
        this.selectTabButton(this.tabView.getButton(name));
    }
        
    selectTabButton(button) {
        this.tabView.selectButton(button);
        let buttons = this._tabs[button.name];
        this.tabBody.buttons = buttons;
    }
    
    /**
     * @param  {String} tab The currently choosen tab
     * @param  {String} button The currently choosen button
     * For tab, both values will be the same
     */
    callSelectTab(tab, button) {
        this.selectTab(button);
    }
    
}

TabView.LAYOUT_VERTICAL = 1;
TabView.LAYOUT_HORIZONTAL = 2;
TabView.MIN_TAB_LENGTH = 20;
TabView.DEFAULT_PADDING = 10;