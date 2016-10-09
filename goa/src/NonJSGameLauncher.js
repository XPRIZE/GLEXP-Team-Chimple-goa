/// <reference path="cocos2d-typescript-definitions-master/cocos2d/cocos2d-lib.d.ts" />
var xc = xc || {};
var gameName = cc.sys.localStorage.getItem("currentLaunchGameName");
cc.log('gameName:' + gameName);
goa.MenuContext.launchGameFromJS(gameName);