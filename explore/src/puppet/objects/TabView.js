import MiscUtil from '../../util/MiscUtil.js';

import ButtonGrid from './ButtonGrid.js';

export default class TabView extends Phaser.Group {
    constructor(game, name, width, height, numTabs, tabThickness, numRows, numCols, horizontal, callback, callbackContext, frameData, style) {
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

        if(!style) {
            style = {};
        }
        if(!style.overFillColor) {
            style.overFillColor = 0x25878A;            
        }
        if(!style.upFillColor) {
            style.upFillColor = 0x32A9B4;            
        }
        if(!style.downFillColor) {
            style.downFillColor = 0x136662;            
        }
        
        this.priorityID = 5;

        this.backPanel = this.add(new Phaser.Graphics(game, 0, this.tabThickness));
        this.backPanel.beginFill(style.downFillColor);
        this.backPanel.drawRect(0, 0, this.elementWidth, this.elementHeight - this.tabThickness);
        this.backPanel.endFill();
        this.backPanel.inputEnabled = true;
        // this.backPanel.input.priorityID = this.priorityID;
        MiscUtil.setPriorityID(this.backPanel, this.priorityID);
        
    }
    
    set tabs(tabs) {
        this._tabs = tabs;
        this.tabView = new ButtonGrid(this.game, this.name, this.elementWidth, this.tabThickness, 1, this.numTabs, this.horizontal, this.callSelectTab, this, this.frameData, {buttonType: 'tab'});
        this.tabView.priorityID = this.priorityID;
        this.tabView.padding = 0;
        this.add(this.tabView);
        this.tabView.buttons = Object.keys(tabs);
        this.buttonView = new ButtonGrid(this.game, this.name, this.elementWidth, this.elementHeight - this.tabThickness, this.numRows, this.numCols, this.horizontal, this.callback, this.callbackContext, this.frameData);
        this.buttonView.priorityID = this.priorityID + 1;        
        this.add(this.buttonView);
        this.buttonView.y = this.tabThickness;
        this.selectTab(Object.keys(tabs)[0]);
    }
    
    get tabs() {
        return this._tabs;
    }

    set priorityID(number) {
        this._priorityID = number;
        if(this.backPanel) {
            // this.backPanel.input.priorityID = number;     
            MiscUtil.setPriorityID(this.backPanel, number);   
        }
        if(this.tabView) {
            // this.tabView.input.priorityID = number;
            MiscUtil.setPriorityID(this.tabView, number);
        }
        if(this.buttonView) {
            this.buttonView.input.priorityID = number + 1;
            MiscUtil.setPriorityID(this.buttonView, number+1);
        }
    }
    
    get priorityID() {
        return this._priorityID;
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
        this.backPanel.visible = false;
    }
}

TabView.LAYOUT_VERTICAL = 1;
TabView.LAYOUT_HORIZONTAL = 2;
TabView.MIN_TAB_LENGTH = 20;
TabView.DEFAULT_PADDING = 10;