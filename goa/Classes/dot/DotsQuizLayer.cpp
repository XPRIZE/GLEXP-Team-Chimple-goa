//
//  DotsQuizLayer.cpp
//  goa
//
//  Created by Srikanth Talapadi on 03/04/17.
//
//

#include "DotsQuizLayer.hpp"
#include "DotsLayer.hpp"
#include "../menu/MenuContext.h"
#include "../effects/FShake.h"

USING_NS_CC;

DotsQuizLayer* DotsQuizLayer::create(int level) {
    DotsQuizLayer *dotsQuizLayer = new (std::nothrow) DotsQuizLayer();
    if(dotsQuizLayer && dotsQuizLayer->init(level)) {
        dotsQuizLayer->autorelease();
        return dotsQuizLayer;
    }
    CC_SAFE_DELETE(dotsQuizLayer);
    return nullptr;
}

DotsQuizLayer::DotsQuizLayer() :
_tries(0),
_numButtons(0),
_buttonLength(0),
_level(0),
_startNum(0),
_endNum(0),
_dotNum(nullptr),
_buttons(nullptr)
{
    
}

DotsQuizLayer::~DotsQuizLayer() {
    
}

bool DotsQuizLayer::init(int level) {
    if(!Node::init()) {
        return false;
    }
    _level = level;
    _numButtons = MIN(level, 5);
    _buttonLength = Director::getInstance()->getVisibleSize().width / MAX(_numButtons, 5);
    _buttons = Node::create();
    _buttons->setPosition(Vec2((5 - _numButtons) / 2 * _buttonLength, 0));
    addChild(_buttons);
    if(level == 11) {
        _endNum = 5;
        _startNum = 0;
    } else if(level == 12) {
        _endNum = 10;
        _startNum = 5;
    } else {
        _endNum = MIN(10, level);
        _startNum = MAX(0, _endNum - 5);
    }
    Color3B buttonColors[5] = {
        Color3B(255, 204, 102),
        Color3B(102, 102, 205),
        Color3B(102, 255, 102),
        Color3B(128, 0, 255),
        Color3B(121, 61, 28)
    };
    
    for (int i = 0; i < _numButtons; i++) {
        auto background = Sprite::create("help/whiteboard.png");
        background->setScale(Director::getInstance()->getVisibleSize().width / (5 * 1640));
        background->setColor(buttonColors[i]);
        background->setPosition(Vec2(_buttonLength * i + _buttonLength / 2, _buttonLength / 2));
        _buttons->addChild(background);
        auto button = cocos2d::ui::Button::create(DotsLayer::fingerRep[_startNum + i + 1], DotsLayer::fingerRep[_startNum + i + 1], DotsLayer::fingerRep[_startNum + i + 1], cocos2d::ui::Widget::TextureResType::PLIST);
        button->setPosition(Vec2(_buttonLength * i + _buttonLength / 2, _buttonLength / 2));
        button->setName(MenuContext::to_string(_startNum + i + 1));
        button->setScale(0.4);
        _buttons->addChild(button);
        button->addTouchEventListener(CC_CALLBACK_2(DotsQuizLayer::buttonPressed, this));
    }
    
    return true;
}

void DotsQuizLayer::buttonPressed(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        if(_dotNum->getNumberOfRunningActions() <= 0) {
            Node* sender = static_cast<Node*>(pSender);
            MenuContext::pronounceWord(sender->getName());
            DotsLayer* dotsLayer = static_cast<DotsLayer*>(getParent());
            if(sender->getName() == MenuContext::to_string(_dotNum->getNum())) {
                if(_helpLayer != nullptr) {
                    removeChild(_helpLayer);
                    _helpLayer = nullptr;
                }
                dotsLayer->_menuContext->addPoints(1);
                _dotNum->runAction(Sequence::create(EaseBackIn::create(MoveTo::create(0.5, Vec2(1280, 2400))), DelayTime::create(1.0), CallFunc::create([=]() {
                    removeChild(_dotNum);
                    _buttons->setOpacity(128);
                    showDotNum();
                }), NULL));
            } else {
                dotsLayer->_menuContext->addPoints(-1);
                _dotNum->runAction(FShake::actionWithDuration(1.0f, 10.0f));
            }
        }
    }
}

void DotsQuizLayer::showDotNum() {
    int num = RandomHelper::random_int(_startNum + 1, _endNum);
    DotsLayer* dotsLayer = static_cast<DotsLayer*>(getParent());
    if(++_tries > _numButtons * 2) {
        dotsLayer->_menuContext->showScore();
    } else {
        _dotNum = DotNum::create(num, false);
        addChild(_dotNum);
        _dotNum->setPosition(1280, 2400);
        _dotNum->runAction(Sequence::create(EaseBackOut::create(MoveTo::create(0.5, Vec2(1280, 1200))), CallFunc::create([=]() {
            _buttons->setOpacity(256);
            if(_level == 1 && _tries == 1) {
                _helpLayer = HelpLayer::create(Rect(1280, _buttonLength / 2, _buttonLength, _buttonLength), Rect(1280, 1200, 600, 600));
                addChild(_helpLayer);
                _helpLayer->click(Vec2(1280, _buttonLength / 2));
            }
        }), NULL));
    }
}
