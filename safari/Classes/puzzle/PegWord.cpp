//
//  PegWord.cpp
//  safari
//
//  Created by Srikanth Talapadi on 09/08/16.
//
//

#include "PegWord.h"
#include "../GameScene.h"

USING_NS_CC;

cocos2d::Scene* PegWord::createScene() {
    auto layer = PegWord::create();
    auto scene = GameScene::createWithChild(layer, "peg");
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

PegWord* PegWord::create() {
    PegWord* word = new (std::nothrow) PegWord();
    if(word && word->init())
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

PegWord* PegWord::createWithWord(std::string wordStr) {
    PegWord* word = new (std::nothrow) PegWord();
    if(word && word->initWithWord(wordStr))
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

PegWord::PegWord() {
    
}

PegWord::~PegWord() {
    
}

int PegWord::getGridHeight() {
    return 600;
}

int PegWord::getGridNumRows() {
    return 1;
}

int PegWord::getGridNumCols() {
    return _numGraphemes;
}

std::string PegWord::getGridBackground() {
    return "";
}

Node* PegWord::loadNode() {
    auto background = CSLoader::createNode("common_screen/MainScene.csb");
    return background;
}

