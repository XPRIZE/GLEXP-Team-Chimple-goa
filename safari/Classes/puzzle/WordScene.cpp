//
//  WordScene.cpp
//  safari
//
//  Created by Srikanth Talapadi on 05/08/16.
//
//

#include "WordScene.h"
#include "../GameScene.h"
#include "../lang/TextGenerator.h"

USING_NS_CC;

cocos2d::Scene* WordScene::createScene() {
    auto layer = WordScene::create();
    auto scene = GameScene::createWithChild(layer, "word");
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

WordScene* WordScene::create() {
    WordScene* word = new (std::nothrow) WordScene();
    if(word && word->init())
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
    
}

WordScene::WordScene() {
    
}

WordScene::~WordScene() {
    
}

bool WordScene::init() {
    if(!Node::init()) {
        return false;
    }
    auto tg = TextGenerator::getInstance();
    auto str = tg->generateAWord();
    auto matrix = tg->generateMatrix(str, 2, 8);
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 8; j++) {
            auto label = Label::createWithTTF(matrix[i][j], "fonts/arial.ttf", 100);
            label->setPosition(Vec2(200 + j * 400, 200 + i * 400));
            addChild(label);
        }
    }
    return true;
}
