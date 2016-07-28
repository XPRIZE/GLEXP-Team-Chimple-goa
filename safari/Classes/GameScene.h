//
//  GameScene.h
//  safari
//
//  Created by Srikanth Talapadi on 28/07/16.
//
//

#ifndef GameScene_h
#define GameScene_h

#include "cocos2d.h"
#include "menu/MenuContext.h"
#include "lang/LangUtil.h"

class GameScene : public cocos2d::Scene {
public:
    static GameScene* createWithChild(Node* node, std::string name);
    MenuContext* getMenuContext();
    LangUtil* getLangUtil();
    
CC_CONSTRUCTOR_ACCESS:
    GameScene();
    virtual ~GameScene();
    bool initWithChild(Node* node, std::string name);
    
protected:
    Node* _child;
    std::string _name;
    MenuContext* _menuContext;
    LangUtil* _langUtil;
};

#endif /* GameScene_h */
