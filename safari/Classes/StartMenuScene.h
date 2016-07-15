//
//  StartMenuScene.h
//  safari
//
//  Created by Srikanth Talapadi on 14/07/16.
//
//

#ifndef StartMenuScene_h
#define StartMenuScene_h

#include "cocos2d.h"

class StartMenu : public cocos2d::LayerGradient {
public:
    static cocos2d::Scene* createScene();
    CREATE_FUNC(StartMenu);
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    StartMenu();
    virtual ~StartMenu();
    
};

#endif /* StartMenuScene_h */
