//
//  GameScene.cpp
//  safari
//
//  Created by Srikanth Talapadi on 28/07/16.
//
//

#include "GameScene.h"

/*
 *
 * DEPRECATED = Please use ScrollbleGameMapScene
 */
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
    _menuContext = MenuContext::create(node, name);
    addChild(_menuContext);
    _langUtil = LangUtil::getInstance();
    return true;
}


GameScene* GameScene::createWithChildForIslandAndSceneName(cocos2d::Node *node, std::string island, std::string sceneName) {
    GameScene *ret = new (std::nothrow) GameScene();
    if (ret && ret->initWithChildForIslandAndSceneName(node, island, sceneName))
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

bool GameScene::initWithChildForIslandAndSceneName(Node *node, std::string name, std::string sceneName) {
    if (!Scene::init()) {
        return false;
    }
    _name = name;
    _sceneName = sceneName;
    _child = node;
    addChild(node);
    _menuContext = MenuContext::create(node, name, false, sceneName);
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


Node* GameScene::getChildLayer() {
    return _child;
}