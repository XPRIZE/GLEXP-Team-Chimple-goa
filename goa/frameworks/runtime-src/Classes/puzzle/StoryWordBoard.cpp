//
//  StoryWordBoard.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 09/12/16.
//
//

#include "StoryWordBoard.hpp"
#include "../GameScene.h"
#include "scripting/js-bindings/manual/ScriptingCore.h"
#include "storage/local-storage/LocalStorage.h"

USING_NS_CC;

cocos2d::Scene* StoryWordBoard::createScene() {
    auto layer = StoryWordBoard::create();
    auto scene = GameScene::createWithChild(layer, "story-play");
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

cocos2d::Scene* StoryWordBoard::createSceneWithWords(std::vector<std::string> words, int currentIndex, std::string baseDir, int totalPoints, int currentPoints) {
    auto layer = StoryWordBoard::createWithWords(words, currentIndex, baseDir, totalPoints, currentPoints);
    auto scene = GameScene::createWithChild(layer, "story-play");
    layer->_menuContext = scene->getMenuContext();
    layer->_menuContext->setMaxPoints(totalPoints);
    layer->_menuContext->addPoints(currentPoints);
    return scene;
}


void StoryWordBoard::processGrapheme(Grapheme* grapheme) {
    if(grapheme->isSelected()) {
        int i = 0;
        for (auto it = _answerVector.begin() ; it != _answerVector.end(); ++it) {
            if((*it).second == grapheme) {
                *it = std::pair<Node*, Grapheme*>((*it).first, nullptr);
                grapheme->selected(false);
                grapheme->setZOrder(0);
                grapheme->animateToPositionAndChangeBackground(grapheme->getPrevPosition());
                if(grapheme->getGraphemeString() == _answerGraphemes.at(i)) {
                    _menuContext->addPoints(-1);
                } else {
                    _menuContext->addPoints(1);
                }
                return;
            }
            i++;
        }
    } else {
        int i = 0;
        for (auto it = _answerVector.begin() ; it != _answerVector.end(); ++it) {
            if((*it).second == nullptr) {
                auto targetNode = (*it).first;
                *it = std::pair<Node*, Grapheme*>(targetNode, grapheme);
                auto tPos = targetNode->getParent()->convertToWorldSpace(targetNode->getPosition());
                grapheme->selected(true);
                grapheme->setZOrder(1);
                grapheme->animateToPositionAndChangeBackground(_grid->convertToNodeSpace(tPos));
                if(_answerGraphemes.at(i) == grapheme->getGraphemeString()) {
                    _menuContext->addPoints(1);
                } else {
                    _menuContext->addPoints(-1);
                }
                return;
            }
            i++;
        }
    }
}

StoryWordBoard* StoryWordBoard::create() {
    StoryWordBoard* word = new (std::nothrow) StoryWordBoard();
    if(word && word->init())
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

StoryWordBoard* StoryWordBoard::createWithWords(std::vector<std::string> words, int currentIndex, std::string baseDir, int totalPoints, int currentPoints) {
    StoryWordBoard* word = new (std::nothrow) StoryWordBoard();
    word->_currentIndex = currentIndex;
    word->_words = words;
    word->_baseDir = baseDir;
    word->_totalPoints = totalPoints;
    word->_currentPoints = currentPoints;
    std::string wordStr = word->_words.at(word->_currentIndex);
    if(word && word->initWithWord(wordStr))
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

StoryWordBoard::StoryWordBoard() :
_currentIndex(0),
_baseDir("")
{
    
}

StoryWordBoard::~StoryWordBoard() {
    
}

int StoryWordBoard::getGridHeight() {
    return 600;
}

int StoryWordBoard::getGridNumRows() {
    return 2;
}

int StoryWordBoard::getGridNumCols() {
    return 8;
}

std::string StoryWordBoard::getGridBackground() {
    return "common_screen/letter_box.png";
}

Node* StoryWordBoard::loadNode() {
    auto background = CSLoader::createNode("common_screen/MainScene.csb");
    return background;
}

void StoryWordBoard::createGrid() {
    WordScene::createGrid();
    if(_grid) {
        _grid->setPosition(0, 100);
    }
}

void StoryWordBoard::createChoice() {
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

void StoryWordBoard::checkAnswer() {
    WordScene::checkAnswer();
}

void StoryWordBoard::gameOver(bool correct) {
    if(correct) {
        Size visibleSize = Director::getInstance()->getVisibleSize();
        Vec2 origin = Director::getInstance()->getVisibleOrigin();
        
        _ps = CCParticleSystemQuad::create("scoreboard/particle_success.plist");
        _ps->setTexture(CCTextureCache::sharedTextureCache()->addImage("scoreboard/success_particle.png"));
        
        _ps->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
        this->addChild(_ps, 10);
        
        if(_currentIndex == _words.size() - 1)
        {
            localStorageSetItem("xc.story.totalPoints", MenuContext::to_string(_menuContext->getMaxPoints()));
            localStorageSetItem("xc.story.currentPoints", MenuContext::to_string(_menuContext->getPoints()));
            localStorageSetItem("xc.story.baseDir", _baseDir);
            runAction(Sequence::create(DelayTime::create(5.0), CallFunc::create([=] {
                this->removeChild(_ps);
                _ps = nullptr;
                ScriptingCore::getInstance()->runScript("src/start/nativeCopyRightHandler.js");
            }), NULL));            
        } else {
            _currentIndex++;
            
            runAction(Sequence::create(DelayTime::create(5.0), CallFunc::create([=] {
                this->removeChild(_ps);
                _ps = nullptr;
                Director::getInstance()->replaceScene(StoryWordBoard::createSceneWithWords(_words, _currentIndex, _baseDir, _menuContext->getMaxPoints(), _menuContext->getPoints()));
            }), NULL));
            
        }
    }
}
