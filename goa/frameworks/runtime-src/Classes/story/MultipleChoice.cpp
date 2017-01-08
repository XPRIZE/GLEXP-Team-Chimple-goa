//
//  MultipleChoice.cpp
//  goa
//
//  Created by Srikanth Talapadi on 08/01/2017.
//
//

#include "MultipleChoice.hpp"
#include "editor-support/cocostudio/CocoStudio.h"
#include "platform/CCFileUtils.h"
#include "ui/CocosGUI.h"

USING_NS_CC;
using namespace cocos2d::ui;

MultipleChoice *MultipleChoice::create(QuestionHandler* qHandler, std::vector<std::string> questions) {
    MultipleChoice* lhs = new (std::nothrow) MultipleChoice();
    if(lhs && lhs->initWithQuestions(qHandler, questions))
    {
        lhs->autorelease();
        return lhs;
    }
    CC_SAFE_DELETE(lhs);
    return nullptr;
}

void MultipleChoice::onEnterTransitionDidFinish() {
    
}

MultipleChoice::MultipleChoice() {
    
}

MultipleChoice::~MultipleChoice() {
    
}

bool MultipleChoice::init() {
    return true;
}

bool MultipleChoice::initWithQuestions(QuestionHandler* qHandler, std::vector<std::string> questions) {
    _questions = questions;
    _qHandler = qHandler;
    auto bg = CSLoader::createNode("template/template.csb");
    auto visibleSize = Director::getInstance()->getVisibleSize();
    bg->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
    bg->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
    addChild(bg);
    if(_questions.size() == 6) {
        auto qNode = static_cast<TextField*> (bg->getChildByName("TextField_2"));
        if(qNode) {
            qNode->setString(_questions[1]);
            qNode->setEnabled(false);
            qNode->setTouchEnabled(false);
            qNode->setFocusEnabled(false);
            qNode->setFontName(QuestionHandler::FONT_NAME);
            qNode->setTextColor(Color4B(QuestionHandler::FONT_COLOR));
            qNode->setFontSize(QuestionHandler::FONT_SIZE);
        }
        QuestionHandler::setButtonProperties(bg->getChildByName("Button_7"), "1", _questions[2], CC_CALLBACK_2(MultipleChoice::buttonSelected, this));
        QuestionHandler::setButtonProperties(bg->getChildByName("Button_8"), "0", _questions[3], CC_CALLBACK_2(MultipleChoice::buttonSelected, this));
        QuestionHandler::setButtonProperties(bg->getChildByName("Button_9"), "0", _questions[4], CC_CALLBACK_2(MultipleChoice::buttonSelected, this));
        QuestionHandler::setButtonProperties(bg->getChildByName("Button_10"), "0", _questions[5], CC_CALLBACK_2(MultipleChoice::buttonSelected, this));
#if defined(AUTO_CLICK) && (AUTO_CLICK > 0)
        runAction(Sequence::create(DelayTime::create(2.0), CallFunc::create([=]() {
            this->buttonSelected(bg->getChildByName("Button_7"), ui::Widget::TouchEventType::ENDED);
        }), NULL));
#endif
        
    }
    return true;
}

void MultipleChoice::buttonSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::ENDED:
        {
            clickedButton->setEnabled(false);
            auto buttonName = clickedButton->getName();
            if(buttonName == "1") {
                _qHandler->gotoNextQuestion(1);
            } else {
                
            }
            break;
        }
    }
    
}
