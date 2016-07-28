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
#include "../lang/LangUtil.h"

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
    const int numChars = LangUtil::getInstance()->getNumberOfCharacters();
    const int numCols = 7;
    const int numRows = ceil((float)numChars / numCols);
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            auto alphamon = Alphamon::createWithAlphabet(LangUtil::getInstance()->getAllCharacters()[count]);
            alphamon->setPosition(Vec2(origin.x + visibleSize.width * (j + 0.5 )/ numCols, origin.y + visibleSize.height * (1 - (i + 0.5)/ numRows)));
            alphamon->setScale(0.4);
            addChild(alphamon);
            if(++count >= numChars) {
                goto theEnd;
            }
        }
    }
theEnd: return true;
}

void SelectAlphamon::onAlphabetSelected(EventCustom *event) {
    wchar_t* buf = static_cast<wchar_t*>(event->getUserData());
    
    if(_firstChar == 0) {
        _firstChar = buf[0];
        auto firstMon = getChildByName(LangUtil::convertUTF16CharToString(_firstChar));
        firstMon->setScale(0.5);
    } else if(_firstChar == buf[0]) {
        auto firstMon = getChildByName(LangUtil::convertUTF16CharToString(_firstChar));
        firstMon->setScale(0.4);
        _firstChar = 0;
    } else {
        _secondChar = buf[0];
        auto secondMon = getChildByName(LangUtil::convertUTF16CharToString(_secondChar));
        secondMon->setScale(0.5);
        _eventDispatcher->removeCustomEventListeners("alphamon_pressed");
        Director::getInstance()->replaceScene(TransitionSplitCols::create(1, DuelScene::createScene(_firstChar, _secondChar)));
    }
}