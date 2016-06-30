//
//  DuelScene.h
//  rpg
//
//  Created by Srikanth Talapadi on 22/06/16.
//
//

#ifndef DuelScene_h
#define DuelScene_h

#include "cocos2d.h"

class DuelScene : public cocos2d::LayerColor
{
public:
    static cocos2d::Scene* createScene();
    
    virtual bool init();
    
    // a selector callback
    void menuCloseCallback(cocos2d::Ref* pSender);
    
    void hello(Node* node);
    
    // implement the "static create()" method manually
    CREATE_FUNC(DuelScene);
};

#endif /* DuelScene_h */
