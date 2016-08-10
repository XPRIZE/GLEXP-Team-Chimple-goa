//
//  WordBoard.cpp
//  safari
//
//  Created by Srikanth Talapadi on 09/08/16.
//
//

#include "WordBoard.h"
#include "../GameScene.h"

USING_NS_CC;

cocos2d::Scene* WordBoard::createScene() {
    auto layer = WordBoard::create();
    auto scene = GameScene::createWithChild(layer, "wordBoard");
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

WordBoard* WordBoard::create() {
    WordBoard* word = new (std::nothrow) WordBoard();
    if(word && word->init())
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

WordBoard* WordBoard::createWithWord(std::string wordStr) {
    WordBoard* word = new (std::nothrow) WordBoard();
    if(word && word->initWithWord(wordStr))
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

WordBoard::WordBoard() {
    
}

WordBoard::~WordBoard() {
    
}

int WordBoard::getGridHeight() {
    return 600;
}

int WordBoard::getGridNumRows() {
    return 2;
}

int WordBoard::getGridNumCols() {
    return 8;
}

std::string WordBoard::getGridBackground() {
    return "common_screen/letter_box.png";
}

Node* WordBoard::loadNode() {
    auto background = CSLoader::createNode("common_screen/MainScene.csb");
    auto water = background->getChildByName("Node_1");
//    water->setPosition(0, -1800);
    auto moveTo = MoveTo::create(5.0, Vec2(0, 1800));
    water->runAction(moveTo);
    return background;
}

void WordBoard::createGrid() {
    WordScene::createGrid();
    _grid->setPosition(0, 100);
}

void WordBoard::createChoice() {
    Size visibleSize = Director::getInstance()->getVisibleSize();
    const float squareWidth = visibleSize.width / _numGraphemes;
    _choice = Node::create();
    _choice->setPosition(Vec2(0, 1000));
    addChild(_choice);
    for (int i = 0; i < _numGraphemes; i++) {
        auto choiceNode = Node::create();
        choiceNode->setPosition(Vec2((i + 0.5 ) * squareWidth , 0));
        auto hole = Sprite::createWithSpriteFrameName("common_screen/letter_hole.png");
        hole->setPosition(Vec2(0, -100));
        choiceNode->addChild(hole);
        addChoice(choiceNode);
    }
}
