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
#include "GraphemeGrid.h"
#include "Grapheme.h"

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
    _word = tg->generateAWord();
    _answerGraphemes = tg->getGraphemes(_word);
    _numGraphemes = _answerGraphemes.size();

    addChild(loadNode());
    createAnswer();
    createChoice();
	createGrid();
	_eventDispatcher->addCustomEventListener("grapheme_anim_done", CC_CALLBACK_0(WordScene::checkAnswer, this));
    return true;
}

void WordScene::createGrid() {
    Size visibleSize = Director::getInstance()->getVisibleSize();
    _matrix = TextGenerator::getInstance()->generateMatrix(_word, 2, 8);
    _grid = GraphemeGrid::create(visibleSize.width, getGridHeight(), getGridNumRows(), getGridNumCols(), getGridBackground(), _matrix);
    _grid->setPosition(0, 0);
    addChild(_grid);
    _grid->touchEndedCallback = CC_CALLBACK_2(WordScene::onTouchEnded, this);
}

int WordScene::getGridHeight() {
    return 600;
}

int WordScene::getGridNumRows() {
    return 2;
}

int WordScene::getGridNumCols() {
    return 8;
}

std::string WordScene::getGridBackground() {
    return "smash_de_rock/letter_correct.png";
}

Node* WordScene::loadNode() {
    auto background = CSLoader::createNode("smash_de_rock/MainScene.csb");
    return background;
}

void WordScene::createAnswer() {
    auto label = ui::Text::create();
    label->setString(_word);
    label->setFontSize(200);
    _answer = Node::create();
    _answer->addChild(label);
    _answer->setPosition(Vec2(1280, 1600));
    addChild(_answer);
    
}

void WordScene::createChoice() {
    _choice = Node::create();
    _choice->setPosition(Vec2(1280, 900));
    addChild(_choice);
    for (int i = 0; i < _numGraphemes; i++) {
        auto choiceNode = Node::create();
        choiceNode->setPosition(Vec2(i * 200, 0));
        addChoice(choiceNode);
    }
}

void WordScene::addChoice(Node* choice) {
    _answerVector.push_back(std::pair<Node*, Grapheme*>(choice, nullptr));
    _choice->addChild(choice);
}

void WordScene::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
    auto grapheme = static_cast<Grapheme*>(event->getCurrentTarget());
    if(grapheme->isSelected()) {
        for (auto it = _answerVector.begin() ; it != _answerVector.end(); ++it) {
            if((*it).second == grapheme) {
                *it = std::pair<Node*, Grapheme*>((*it).first, nullptr);
                grapheme->selected(false);
                grapheme->animateToPositionAndChangeBackground(grapheme->getPrevPosition());
                return;
            }
        }
    } else {
        for (auto it = _answerVector.begin() ; it != _answerVector.end(); ++it) {
            if((*it).second == nullptr) {
                auto targetNode = (*it).first;
                *it = std::pair<Node*, Grapheme*>(targetNode, grapheme);
                auto tPos = targetNode->getParent()->convertToWorldSpace(targetNode->getPosition());
                grapheme->selected(true);
                grapheme->animateToPositionAndChangeBackground(_grid->convertToNodeSpace(tPos));
                return;
            }
        }
    }
}

void WordScene::checkAnswer() {
    for (auto i = 0; i < _answerGraphemes.size(); i++) {
        auto grapheme = _answerVector.at(i).second;
        if(grapheme == nullptr || grapheme->getGraphemeString() != _answerGraphemes.at(i)) {
            return;
        }
    }
    if(_grid->getNumberOfActionsRunning() > 1) {
        return;
    }
    gameOver();
}

void WordScene::gameOver() {
    _menuContext->showScore();
}
