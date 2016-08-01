//
//  GameScene.cpp
//  safari
//
//  Created by Srikanth Talapadi on 28/07/16.
//
//

#include "GameScene.h"

USING_NS_CC;

GameScene::GameScene() :
_menuContext(nullptr),
_langUtil(nullptr)
{
    
}

GameScene::~GameScene() {

}

GameScene* GameScene::createWithChild(cocos2d::Node *node, std::string name) {
    GameScene *ret = new (std::nothrow) GameScene();
    if (ret && ret->initWithChild(node, name))
    {
        ret->autorelease();
        return ret;
    }
    else
    {
        CC_SAFE_DELETE(ret);
        return nullptr;
    }
}

bool GameScene::initWithChild(Node *node, std::string name) {
    if (!Scene::init()) {
        return false;
    }
    _name = name;
    _child = node;
    addChild(node);
    _menuContext = MenuContext::create(node);
    addChild(_menuContext);
    _langUtil = LangUtil::getInstance();
    return true;
}

MenuContext* GameScene::getMenuContext() {
    return _menuContext;
}

LangUtil* GameScene::getLangUtil() {
    return _langUtil;
}