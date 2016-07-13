//
//  SelectAlphamonScene.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 10/07/16.
//
//

#include "SelectAlphamonScene.h"
#include "Alphamon.h"
#include "../puzzle/DuelScene.h"

static const char* const a_to_z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ;

USING_NS_CC;

SelectAlphamon::SelectAlphamon() :
_firstChar(0),
_secondChar(0) {
    
}

SelectAlphamon::~SelectAlphamon() {
    
}

Scene *SelectAlphamon::createScene() {
    auto scene = Scene::create();
    auto layer = SelectAlphamon::create();
    scene->addChild(layer);
    return scene;
}

bool SelectAlphamon::init() {
    if (!LayerGradient::initWithColor(Color4B(255, 159, 0, 255), Color4B::WHITE)){
        return false;
    }
    _eventDispatcher->addCustomEventListener("alphamon_pressed", CC_CALLBACK_1(SelectAlphamon::onAlphabetSelected, this));

    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    int count = 0;
    const int numRows = 4;
    const int numCols = 7;
    const int numChars = 26;
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            auto alphamon = Alphamon::createWithAlphabet(a_to_z[count]);
            alphamon->setPosition(Vec2(origin.x + visibleSize.width * (j + 0.5 )/ numCols, origin.y + visibleSize.height * (1 - (i + 0.5)/ numRows)));
            alphamon->setScale(0.4);
            alphamon->setName(std::string(1, a_to_z[count]));
            addChild(alphamon);
            if(++count >= numChars) {
                goto theEnd;
            }
        }
    }
theEnd: return true;
}

void SelectAlphamon::onAlphabetSelected(EventCustom *event) {
    char* buf = static_cast<char*>(event->getUserData());
    
    if(_firstChar == 0) {
        _firstChar = buf[0];
        auto firstMon = getChildByName(std::string(1, _firstChar));
        firstMon->setScale(0.5);
    } else if(_firstChar == buf[0]) {
        auto firstMon = getChildByName(std::string(1, _firstChar));
        firstMon->setScale(0.4);
        _firstChar = 0;
    } else {
        _secondChar = buf[0];
        auto secondMon = getChildByName(std::string(1, _secondChar));
        secondMon->setScale(0.5);
        _eventDispatcher->removeCustomEventListeners("alphamon_pressed");
        Director::getInstance()->replaceScene(TransitionSplitCols::create(1, DuelScene::createScene(_firstChar, _secondChar)));
    }
}