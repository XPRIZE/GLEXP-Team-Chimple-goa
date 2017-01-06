//
//  MapScene.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 26/07/16.
//
//
#include <stdio.h>
#include "cocos2d.h"
#include "RPGConfig.h"
#include "HelloWorldScene.h"
#include "menu/MenuContext.h"
#include "lang/LangUtil.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/CCComExtensionData.h"
#include "ui/UIWidget.h"
#include "ui/GUIExport.h"
#include "cocos-ext.h"


#ifndef MapScene_h
#define MapScene_h

class MapScene : public cocos2d::Layer {
public:
    
    static cocos2d::Scene* createScene();
    static MapScene* create();
    static const std::map<std::string, std::string> levelToGameNameMap;    
    static const std::map<std::string, std::string> createLevelToGameName();
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    MapScene();
    virtual ~MapScene();
    static const char* gameName() { return "map";}
private:
    int unlockLevel;
    MenuContext* menuContext;
    LangUtil* currentLangUtil;
    void loadMap();
    void processChildNodes(cocos2d::Node *rootNode);
    void islandSelected(Ref* pSender, ui::Widget::TouchEventType eEventType);
    std::map<std::string, std::string> gameNameToLevelMap;
};

#endif /* MapScene_h */

