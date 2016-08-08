//
//  WordScene.h
//  safari
//
//  Created by Srikanth Talapadi on 05/08/16.
//
//

#ifndef WordScene_h
#define WordScene_h

#include "cocos2d.h"
#include "../menu/MenuContext.h"

class WordScene : public cocos2d::Node {
public:
    static cocos2d::Scene* createScene();
    static WordScene *create();
    
CC_CONSTRUCTOR_ACCESS:
    WordScene();
    ~WordScene();
    bool init();
    
protected:
    MenuContext* _menuContext;

};

#endif /* WordScene_h */
