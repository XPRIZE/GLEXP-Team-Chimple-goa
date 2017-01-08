//
//  Meaning.cpp
//  goa
//
//  Created by Srikanth Talapadi on 08/01/2017.
//
//

#include "Meaning.hpp"
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
                clickedButton->setEnabled(false);
                _button1 = clickedButton;
            } else if(_button2 == nullptr) {
                clickedButton->setEnabled(false);
                _button2 = clickedButton;
                auto buttonName = clickedButton->getName();
                if(buttonName.substr(0, 1) == _button1->getName().substr(0, 1)) {
                    _numSolved++;
                    if(_numSolved >= 4) {
                        _qHandler->gotoNextQuestion(_numSolved);
                    }
                } else {
                    _button1->setEnabled(true);
                    _button2->setEnabled(true);
                }
                _button1 = nullptr;
                _button2 = nullptr;
            }
            break;
        }
    }
    
}

void Meaning::adjustButtons() {
    auto bg = this->getChildByName("bg");
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_1"), "1", _questions[1], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_2"), "2", _questions[3], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_3"), "3", _questions[5], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_4"), "4", _questions[7], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_5"), "1_answer", _questions[2], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_6"), "2_answer", _questions[4], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_7"), "3_answer", _questions[6], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_8"), "4_answer", _questions[8], CC_CALLBACK_2(Meaning::buttonSelected, this));
}

