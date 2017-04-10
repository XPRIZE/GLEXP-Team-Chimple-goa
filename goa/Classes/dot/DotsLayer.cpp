//
//  DotsLayer.cpp
//  goa
//
//  Created by Srikanth Talapadi on 01/04/17.
//
//

#include "DotsLayer.hpp"
#include "DotsQuizLayer.hpp"
#include "../menu/GameScene.h"

USING_NS_CC;

std::map<int, std::string> DotsLayer::fingerRep = {
    {1, "hand/one.png"},
    {2, "hand/two.png"},
    {3, "hand/three.png"},
    {4, "hand/four.png"},
    {5, "hand/five.png"},
    {6, "hand/six.png"},
    {7, "hand/seven.png"},
    {8, "hand/eight.png"},
    {9, "hand/nine.png"},
    {10, "hand/ten.png"}
};

cocos2d::Scene* DotsLayer::createScene() {
    auto layer = DotsLayer::create();
    auto scene = GameScene::createWithChild(layer, "Dots");
    layer->_menuContext = scene->getMenuContext();
    return scene;
}

DotsLayer *DotsLayer::create() {
    DotsLayer *dotsLayer = new (std::nothrow) DotsLayer();
    if(dotsLayer && dotsLayer->init()) {
        dotsLayer->autorelease();
        return dotsLayer;
    }
    CC_SAFE_DELETE(dotsLayer);
    return nullptr;
}

void DotsLayer::onEnterTransitionDidFinish() {
    _currentNumber = MAX(1, _menuContext->getCurrentLevel() - 4);
    if(_menuContext->getCurrentLevel() <= 10) {
        showNumber();
    } else {
        auto quiz = DotsQuizLayer::create(_menuContext->getCurrentLevel());
        addChild(quiz);
        _menuContext->setMaxPoints(quiz->_numButtons * 2);
        quiz->showDotNum();
    }
}

DotsLayer::DotsLayer() :
_helpLayer(nullptr),
_currentNumber(0),
_dotNum(nullptr),
_hand(nullptr),
_text(nullptr),
_nextButton(nullptr),
_menuContext(nullptr)
{
    
}

DotsLayer::~DotsLayer() {
    
}

bool DotsLayer::init() {
    if(!LayerGradient::initWithColor(Color4B(141, 71, 33, 255), Color4B(74, 42, 11, 255))) {
        return false;
    }
    setContentSize(Director::getInstance()->getVisibleSize());
    SpriteFrameCache::getInstance()->addSpriteFramesWithFile("maths/hand.plist");
    return true;
}

void DotsLayer::showNumber() {
    _dotNum = DotNum::create(_currentNumber);
    _dotNum->setPosition(Vec2(1280, 2400));
    addChild(_dotNum);
    _dotNum->runAction(Sequence::create(EaseBackOut::create(MoveTo::create(0.5, Vec2(1280, 900))), CallFunc::create([=]() {
        if(_menuContext->getCurrentLevel() == 1) {
            _helpLayer = HelpLayer::create(Rect(1280, 900, 200, 200), Rect::ZERO);
            addChild(_helpLayer);
            _helpLayer->click(Vec2(1280, 900));
        }
    }), NULL));
}

void DotsLayer::showFinger(DotNum *dotNum) {
    if(_helpLayer != nullptr) {
        removeChild(_helpLayer);
        _helpLayer = nullptr;
    }
    _hand = Sprite::createWithSpriteFrameName(fingerRep[_currentNumber]);
    _hand->setPosition(640, 2400);
    addChild(_hand);
    _hand->runAction(Sequence::create(EaseBackOut::create(MoveTo::create(0.5, Vec2(640, 1350))), DelayTime::create(1.0), CallFunc::create([=]() {
        _nextButton = cocos2d::ui::Button::create("maths/next.png");
        addChild(_nextButton);
        _nextButton->setPosition(Vec2(Director::getInstance()->getVisibleSize().width * 0.95, 900.0));
        _nextButton->setScale(0.5);
        _nextButton->runAction(EaseBackOut::create(ScaleTo::create(0.5, 1.0)));
        _nextButton->addTouchEventListener(CC_CALLBACK_2(DotsLayer::showNext, this));
        }), NULL));

    _text = Label::createWithTTF(MenuContext::to_string(_currentNumber), "fonts/Roboto-Regular.ttf", 512);
    _text->setTextColor(Color4B(255, 255, 255, 255));
    _text->setPosition(Vec2(1920, 2400));
    addChild(_text);
    _text->runAction(EaseBackOut::create(MoveTo::create(0.5, Vec2(1920, 1350))));
    
    _dotNum->runAction(EaseBackOut::create(MoveTo::create(0.5, Vec2(1280, 450))));
}

void DotsLayer::showNext(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    removeChild(_dotNum);
    removeChild(_hand);
    removeChild(_text);
    removeChild(_nextButton);
    _currentNumber++;
    if(_currentNumber <= _menuContext->getCurrentLevel()) {
        showNumber();
    } else {
        auto quiz = DotsQuizLayer::create(_menuContext->getCurrentLevel());
        addChild(quiz);
        _menuContext->setMaxPoints(quiz->_numButtons * 2);
        quiz->showDotNum();
    }
}
