/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "noCache"       : false,
    // "noCache" set whether your resources will be loaded with a timestamp suffix in the url.
    // In this way, your resources will be force updated even if the browser holds a cache of it.
    // It's very useful for mobile browser debuging.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */


cc.game.onStart = function(){
   
   cc.view.adjustViewPort(true);
   if(cc.sys.isNative)
   {
       if(cc.view.getFrameSize().width >= 640 && cc.view.getFrameSize().height >=640 )
       {
           var size;
           if(cc.view.getFrameSize().width >= 640 && cc.view.getFrameSize().height >=640)
           {
               size = 1136;
           }
           else
               size = 960;
               
           cc.view.setRealPixelResolution(640, size, cc.ResolutionPolicy.SHOW_ALL);
       }
       else
       {
           cc.view.setRealPixelResolution(320, 480, cc.ResolutionPolicy.SHOW_ALL);
       }    
   }
   else
   {
            cc.view.setRealPixelResolution(1280,800,cc.ResolutionPolicy.SHOW_ALL);
            cc.view.resizeWithBrowserSize(true);
   }
   

   // LoadingScene
   // LevelStateScene
   // Level_1_Scene


   // cc.director.runScene(new loadScene());

   
    cc.LoaderScene.preload(g_resources, function () {
       cc.director.runScene(new loadScene());
   }, this); 
};
cc.game.run();