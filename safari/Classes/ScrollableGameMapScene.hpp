//
//  ScrollableGameMapScene.hpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 12/08/16.
//
//

#ifndef ScrollableGameMapScene_hpp
#define ScrollableGameMapScene_hpp

#include <stdio.h>
#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "StartMenuScene.h"
#include "menu/MenuContext.h"

#define ICON_FOLDER "gameicons"
#define NUMBER_OF_BUTTONS_ROWS 2
#define NUMBER_OF_BUTTONS_COLS 4

class ScrollableGameMapScene : public cocos2d::ui::ScrollView {
public:
    static cocos2d::Scene* createScene();
    CREATE_FUNC(ScrollableGameMapScene);
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    ScrollableGameMapScene();
    virtual ~ScrollableGameMapScene();
    
protected:
    cocos2d::Layer* _layer;
    MenuContext* menuContext;
    void gameSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
};

#endif /* ScrollableGameMapScene_hpp */
