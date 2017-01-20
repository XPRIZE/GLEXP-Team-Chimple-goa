//
//  WordBoard.cpp
//  safari
//
//  Created by Srikanth Talapadi on 09/08/16.
//
//

#include "WordBoard.h"
#include "../menu/GameScene.h"

USING_NS_CC;

cocos2d::Scene* WordBoard::createScene() {
    auto layer = WordBoard::create();
    auto scene = GameScene::createWithChild(layer, "wordBoard");
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

cocos2d::Scene* WordBoard::createSceneWithWord(std::string wordStr) {
    auto layer = WordBoard::createWithWord(wordStr);
    auto scene = GameScene::createWithChild(layer, "wordBoard");
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

cocos2d::Scene* WordBoard::createSceneWithWordInIslandAndSceneName(std::string wordStr, std::string island, std::string sceneName) {
    auto layer = WordBoard::createWithWord(wordStr);
    auto scene = GameScene::createWithChildForIslandAndSceneName(layer, island, sceneName);
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
    if(RPGConfig::enableHandWriting) {
        word->enableHandWriting();
    }
    if(word && word->initWithWord(wordStr))
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

WordBoard::WordBoard() :
_timerStarted(false){
    
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
    return background;
}

void WordBoard::createGrid() {
    WordScene::createGrid();
    if(_grid) {
        _grid->setPosition(0, 100);
    }
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

void WordBoard::checkAnswer() {
    WordScene::checkAnswer();
    if(!_timerStarted) {
        _timerStarted = true;
        auto water = _background->getChildByName("Node_1");
        auto moveTo = MoveTo::create(5.0 * _numGraphemes, Vec2(0, 1600));
        auto callback = CallFunc::create(CC_CALLBACK_0(WordBoard::gameOver, this, false));
        water->runAction(Sequence::create(moveTo, callback, NULL));
    }
}

void WordBoard::gameOver(bool correct) {
    if(correct) {
//        ScriptingCore * scriptingCore = ScriptingCore::getInstance();
//        
//        JSContext * context = scriptingCore->getGlobalContext();
//        JS::RootedObject object(context, scriptingCore->getGlobalObject());
//        JS::RootedValue owner(context);
//        
//        jsval * argumentsVector = new jsval[1];
//        argumentsVector[0] = INT_TO_JSVAL(1);
//        
//        JS_GetProperty(context, object, "xc", &owner);
//        scriptingCore->executeFunctionWithOwner(owner, "addNumberHints", 1, argumentsVector);
//        
//        delete [] argumentsVector;

        _menuContext->showScore();
    }
}
