import ButtonGrid from './ButtonGrid.js';

export default class TabView extends Phaser.Group {
    constructor(game, name, width, height, numTabs, tabThickness, numRows, numCols, horizontal, callback, callbackContext, frameData) {
        super(game);
        this.name = name;
        this.elementWidth = width;
        this.elementHeight = height;
        this.numTabs = numTabs;
        this.tabThickness = tabThickness;
        this.numRows = numRows;
        this.numCols = numCols;
        this.horizontal = horizontal;
        this.callback = callback;
        this.callbackContext = callbackContext;
        if(frameData) this.frameData = frameData;

        // let back = this.add(new Phaser.Graphics(game, 0, 0));
        // back.beginFill(0xDDDDDD);
        // // back.alpha = 1;
        // back.drawRect(0, 0, width, height);
        // back.endFill();
        
    }
    
    set tabs(tabs) {
        this._tabs = tabs;
        this.tabView = new ButtonGrid(this.game, this.name, this.elementWidth, this.tabThickness, 1, this.numTabs, this.horizontal, this.callSelectTab, this, this.frameData);
        this.add(this.tabView);
        this.tabView.buttons = Object.keys(tabs);
        this.buttonView = new ButtonGrid(this.game, this.name, this.elementWidth, this.elementHeight - this.tabThickness, this.numRows, this.numCols, this.horizontal, this.callback, this.callbackContext, this.frameData);
        this.add(this.buttonView);
        this.buttonView.y = this.tabThickness;
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
        this.selectedTab = button.name;
        let buttons = this._tabs[button.name];
        this.buttonView.buttons = buttons;
        this.buttonView.visible = true;
    }
    
    /**
     * @param  {String} tab The currently choosen tab
     * @param  {String} button The currently choosen button
     * For tab, both values will be the same
     */
    callSelectTab(tab, button) {
        if(this._tabs[button] && this._tabs[button].length >= 0) {
            if(this.selectedTab == button) {
                this.unSelect();            
            } else {
                this.selectTab(button);        
            }
        } else {
            this.callback.call(this.callbackContext, tab);            
        }
    }
    
    unSelect() {
        this.selectedTab = null;
        this.tabView.unSelect();
        this.buttonView.visible = false;
    }
}

TabView.LAYOUT_VERTICAL = 1;
TabView.LAYOUT_HORIZONTAL = 2;
TabView.MIN_TAB_LENGTH = 20;
TabView.DEFAULT_PADDING = 10;