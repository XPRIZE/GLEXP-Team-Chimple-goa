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
#include "../menu/MenuContext.h"
#include "../lang/LangUtil.h"

class GameScene : public cocos2d::Scene {
public:
    static GameScene* createWithChild(Node* node, std::string name);
    static GameScene* createWithChildForIslandAndSceneName(Node *node, std::string island, std::string sceneName);
    MenuContext* getMenuContext();
    LangUtil* getLangUtil();
    Node* getChildLayer();
CC_CONSTRUCTOR_ACCESS:
    GameScene();
    virtual ~GameScene();
    bool initWithChild(Node* node, std::string name);
    bool initWithChildForIslandAndSceneName(Node *node, std::string name, std::string sceneName);
    
protected:
    Node* _child;
    std::string _name;
    std::string _sceneName;
    MenuContext* _menuContext;
    LangUtil* _langUtil;
};

#endif /* GameScene_h */
