//
//  GameMapScene.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 29/07/16.
//
//

#include <stdio.h>
#include "cocos2d.h"
#include "../hero/RPGConfig.h"
#include "StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/CCComExtensionData.h"
#include "ui/UIWidget.h"
#include "ui/GUIExport.h"
#include "cocos-ext.h"


#ifndef GameMapScene_h
#define GameMapScene_h

/*
 *
 * DEPRECATED = Please use ScrollbleGameMapScene
 */


class MenuContext;

class GameMapScene : public cocos2d::Layer {
public:
    
    static cocos2d::Scene* createScene();
    static GameMapScene* create();
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    GameMapScene();
    virtual ~GameMapScene();
    
private:
    MenuContext* menuContext;
    void loadGameMap();
    void processChildNodes(cocos2d::Node *rootNode);
    void islandSelected(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
};


#endif /* GameMapScene_h */
