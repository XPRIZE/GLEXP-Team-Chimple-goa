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
#include "MapIsland.h"
#include "menu/MenuContext.h"
#include "LanguageManager.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/CCComExtensionData.h"

#ifndef MapScene_h
#define MapScene_h

class MapScene : public cocos2d::Layer {
public:
    
    static cocos2d::Scene* createScene();
    static MapScene* create();
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    MapScene();
    virtual ~MapScene();
    
private:
    MenuContext* menuContext;
    LanguageManager* languageManger;
    void loadMap();
    void processChildNodes(cocos2d::Node *rootNode);
    
};

#endif /* MapScene_h */

