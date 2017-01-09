//
//  Meaning.cpp
//  goa
//
//  Created by Srikanth Talapadi on 08/01/2017.
//
//

#include "Meaning.hpp"
#include "../effects/FShake.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "platform/CCFileUtils.h"
#include "ui/CocosGUI.h"

USING_NS_CC;
using namespace cocos2d::ui;

Meaning *Meaning::create(QuestionHandler* qHandler, std::vector<std::string> questions) {
    Meaning* lhs = new (std::nothrow) Meaning();
    if(lhs && lhs->initWithQuestions(qHandler, questions))
    {
        lhs->autorelease();
        return lhs;
    }
    CC_SAFE_DELETE(lhs);
    return nullptr;
}

void Meaning::onEnterTransitionDidFinish() {
    Node::onEnterTransitionDidFinish();
    runAction(FadeIn::create(1.0f));    
}

Meaning::Meaning() :
_numSolved(0),
_button1(nullptr),
_button2(nullptr)
{
    
}

Meaning::~Meaning() {
    
}

bool Meaning::init() {
    return true;
}

bool Meaning::initWithQuestions(QuestionHandler* qHandler, std::vector<std::string> questions) {
    _questions = questions;
    _qHandler = qHandler;
    auto bg = CSLoader::createNode("template/template_2.csb");
    auto visibleSize = Director::getInstance()->getVisibleSize();
    bg->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
    bg->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
    bg->setName("bg");
    addChild(bg);
    if(_questions.size() == 9) {
        _buttonMap[static_cast<Button*>(bg->getChildByName("Node_1")->getChildByName("Button_1"))] = static_cast<Button*>(bg->getChildByName("Node_5")->getChildByName("Button_5"));
        _buttonMap[static_cast<Button*>(bg->getChildByName("Node_2")->getChildByName("Button_2"))] = static_cast<Button*>(bg->getChildByName("Node_6")->getChildByName("Button_6"));
        _buttonMap[static_cast<Button*>(bg->getChildByName("Node_3")->getChildByName("Button_3"))] = static_cast<Button*>(bg->getChildByName("Node_7")->getChildByName("Button_7"));
        _buttonMap[static_cast<Button*>(bg->getChildByName("Node_4")->getChildByName("Button_4"))] = static_cast<Button*>(bg->getChildByName("Node_8")->getChildByName("Button_8"));
        adjustButtons();
#if defined(AUTO_CLICK) && (AUTO_CLICK > 0)
        runAction(Sequence::create(DelayTime::create(0.5), CallFunc::create([=]() {
            auto bg = this->getChildByName("bg");
            auto button = bg->getChildByName("1");
            this->buttonSelected(button, ui::Widget::TouchEventType::ENDED);
        }),
                DelayTime::create(0.5), CallFunc::create([=]() {
            auto bg = this->getChildByName("bg");
            auto button = bg->getChildByName("1_answer");
            this->buttonSelected(button, ui::Widget::TouchEventType::ENDED);
        }), DelayTime::create(0.5), CallFunc::create([=]() {
            auto bg = this->getChildByName("bg");
            auto button = bg->getChildByName("2");
            this->buttonSelected(button, ui::Widget::TouchEventType::ENDED);
        }),
                             DelayTime::create(0.5), CallFunc::create([=]() {
            auto bg = this->getChildByName("bg");
            auto button = bg->getChildByName("2_answer");
            this->buttonSelected(button, ui::Widget::TouchEventType::ENDED);
        }), DelayTime::create(0.5), CallFunc::create([=]() {
            auto bg = this->getChildByName("bg");
            auto button = bg->getChildByName("3");
            this->buttonSelected(button, ui::Widget::TouchEventType::ENDED);
        }),
                             DelayTime::create(0.5), CallFunc::create([=]() {
            auto bg = this->getChildByName("bg");
            auto button = bg->getChildByName("3_answer");
            this->buttonSelected(button, ui::Widget::TouchEventType::ENDED);
        }), DelayTime::create(0.5), CallFunc::create([=]() {
            auto bg = this->getChildByName("bg");
            auto button = bg->getChildByName("4");
            this->buttonSelected(button, ui::Widget::TouchEventType::ENDED);
        }),
                             DelayTime::create(0.5), CallFunc::create([=]() {
            auto bg = this->getChildByName("bg");
            auto button = bg->getChildByName("4_answer");
            this->buttonSelected(button, ui::Widget::TouchEventType::ENDED);
        }),
                                   NULL));
#endif
        
    }
    return true;
}

void Meaning::buttonSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::ENDED:
        {
            if(_button1 == nullptr) {
                if(_buttonMap.count(clickedButton) == 1) {
                    clickedButton->setEnabled(false);
                    _button1 = clickedButton;
                } else {
                    clickedButton->runAction(FShake::actionWithDuration(1.0f, 10.0f));
                }
            } else {
                if(_buttonMap.count(clickedButton) == 1) {
                    _button1->setEnabled(true);
                    clickedButton->setEnabled(false);
                    _button1 = clickedButton;
                } else {
                    auto buttonName = clickedButton->getName();
                    if(buttonName.substr(0, 1) == _button1->getName().substr(0, 1)) {
                        clickedButton->setEnabled(false);
                        _numSolved++;
                        _qHandler->getMenuContext()->addPoints(1);
                        CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("sounds/sfx/success.ogg");
                        auto pairButton = _buttonMap[_button1];
                        if(pairButton) {
                            auto pairButtonPos = pairButton->getParent()->getPosition();
                            auto clickedButtonPos = clickedButton->getParent()->getPosition();
                            for (auto it=_buttonMap.begin(); it!=_buttonMap.end(); ++it) {
                                if(it->second == clickedButton) {
                                    it->second = pairButton;
                                }
                            }
                            _buttonMap[_button1] = clickedButton;
                            pairButton->getParent()->runAction(MoveTo::create(1.0f, clickedButtonPos));
                            clickedButton->getParent()->runAction(MoveTo::create(1.0f, pairButtonPos));
                            _button1->setColor(Color3B(128.0f, 128.0f, 128.0f));
                            clickedButton->setColor(Color3B(128.0f, 128.0f, 128.0f));
                        }
                        _button1 = nullptr;
                        if(_numSolved >= 4) {
                            _qHandler->gotoNextQuestion(_numSolved);
                        }
                    } else {
                        clickedButton->runAction(FShake::actionWithDuration(1.0f, 10.0f));
                        _qHandler->getMenuContext()->addPoints(-1);
                        CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("sounds/sfx/error.ogg");
                    }
                }
            }
            break;
        }
    }
    
}

void Meaning::adjustButtons() {
    auto bg = this->getChildByName("bg");
    std::vector<std::string> buttons = {
        "5",
        "6",
        "7",
        "8"
    };
    std::random_shuffle ( buttons.begin(), buttons.end() );
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_1")->getChildByName("Button_1"), "1", _questions[1], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_2")->getChildByName("Button_2"), "2", _questions[3], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_3")->getChildByName("Button_3"), "3", _questions[5], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_4")->getChildByName("Button_4"), "4", _questions[7], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_" + buttons[0])->getChildByName("Button_"+buttons[0]), "1_answer", QuestionHandler::wrapString(_questions[2], 40), CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_" + buttons[1])->getChildByName("Button_"+buttons[1]), "2_answer", QuestionHandler::wrapString(_questions[4], 40), CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_" + buttons[2])->getChildByName("Button_"+buttons[2]), "3_answer", QuestionHandler::wrapString(_questions[6], 40), CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_" + buttons[3])->getChildByName("Button_"+buttons[3]), "4_answer", QuestionHandler::wrapString(_questions[8], 40), CC_CALLBACK_2(Meaning::buttonSelected, this));
}

