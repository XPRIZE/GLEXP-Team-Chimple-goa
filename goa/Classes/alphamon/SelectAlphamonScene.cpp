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
#include "../lang/SafariAnalyticsManager.h"
#include "../puzzle/CharGenerator.h"

USING_NS_CC;

static const int ALPHA_WIDTH = 400;
static const float HEIGHT_FACTOR = 1.0;

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
//    if (!LayerGradient::initWithColor(Color4B(255, 159, 0, 255), Color4B::WHITE))
    if(!ScrollView::init())
    {
        return false;
    }
    _eventDispatcher->addCustomEventListener("alphamon_pressed", CC_CALLBACK_1(SelectAlphamon::onAlphabetSelected, this));

    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    _layer = Layer::create();
    int count = 0;
    int totalNumRows = 0;
    const int numChars = LangUtil::getInstance()->getNumberOfCharacters();
    auto vec = LangUtil::getInstance()->getNumCharsInRows();
    auto allChars = LangUtil::getInstance()->getAllCharacters();
//    SafariAnalyticsManager::getInstance()->insertAlphabet(allChars[0]);
//    SafariAnalyticsManager::getInstance()->doesAlphabetExist(allChars[0]);
    
    const int numCols = visibleSize.width / ALPHA_WIDTH;
//    const int numRows = ceil((float)numChars / numCols);
    for(auto it=vec.begin(); it!=vec.end(); ++it){
        int numRows = ceil((float) *it / numCols);
        int countInRow = 0;
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < numCols; j++) {
                auto alphamon = Alphamon::createWithAlphabet(allChars[count]);
                alphamon->setPosition(Vec2(origin.x + visibleSize.width * (j + 0.5 )/ numCols, - ALPHA_WIDTH * (totalNumRows + 0.75) * HEIGHT_FACTOR));
                alphamon->setScale(0.6);
                _layer->addChild(alphamon);
                count++;
                if(++countInRow >= *it) {
                    totalNumRows++;
                    goto rowEnd;
                }
            }
            totalNumRows++;
        }
    rowEnd: ;
    }
    _layer->setContentSize(Size(visibleSize.width, totalNumRows * ALPHA_WIDTH * HEIGHT_FACTOR));
    _layer->setPosition(Vec2(0, totalNumRows * ALPHA_WIDTH * HEIGHT_FACTOR));
    addChild(_layer);
    setContentSize(visibleSize);
    setDirection(cocos2d::ui::ScrollView::Direction::VERTICAL);
    setInnerContainerSize(_layer->getContentSize());
    setBackGroundColorType(cocos2d::ui::Layout::BackGroundColorType::GRADIENT);
    setBackGroundColor(Color3B(255, 159, 0), Color3B::WHITE);
    return true;
}

void SelectAlphamon::onAlphabetSelected(EventCustom *event) {
    wchar_t* buf = static_cast<wchar_t*>(event->getUserData());
    _firstChar = buf[0];
    auto firstMon = _layer->getChildByName(LangUtil::convertUTF16CharToString(_firstChar));
    firstMon->setScale(0.8);
    _secondChar = CharGenerator::getInstance()->generateAChar();
    
    _eventDispatcher->removeCustomEventListeners("alphamon_pressed");
    Director::getInstance()->replaceScene(TransitionFade::create(2.0, DuelScene::createScene(_firstChar, _secondChar)));

}