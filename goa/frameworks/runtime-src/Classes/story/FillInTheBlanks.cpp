//
//  FillInTheBlanks.cpp
//  goa
//
//  Created by Srikanth Talapadi on 08/01/2017.
//
//

#include "FillInTheBlanks.hpp"
#include "../effects/FShake.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "platform/CCFileUtils.h"
#include "ui/CocosGUI.h"

USING_NS_CC;
using namespace cocos2d::ui;

FillInTheBlanks *FillInTheBlanks::create(QuestionHandler* qHandler, std::vector<std::string> questions) {
    FillInTheBlanks* lhs = new (std::nothrow) FillInTheBlanks();
    if(lhs && lhs->initWithQuestions(qHandler, questions))
    {
        lhs->autorelease();
        return lhs;
    }
    CC_SAFE_DELETE(lhs);
    return nullptr;
}

void FillInTheBlanks::onEnterTransitionDidFinish() {
    MultipleChoice::onEnterTransitionDidFinish();
}

FillInTheBlanks::FillInTheBlanks() {
    
}

FillInTheBlanks::~FillInTheBlanks() {
    
}

bool FillInTheBlanks::initWithQuestions(QuestionHandler* qHandler, std::vector<std::string> questions) {
    if(MultipleChoice::initWithQuestions(qHandler, questions)) {
        auto bg = getChildByName("bg");
        auto qNode = bg->getChildByName<TextField*>("TextField_2");
        if(qNode) {
            auto fitb = _questions[1];
            std::string blanks = "______________";
            fitb.replace(fitb.find(_questions[2]), _questions[2].size(), blanks);
            qNode->setString(fitb);
        }
        return true;
    }
    return false;
}

void FillInTheBlanks::buttonSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::ENDED:
        {
            clickedButton->setEnabled(false);
            auto buttonName = clickedButton->getName();
            if(buttonName == "1") {
                _qHandler->getMenuContext()->addPoints(1);
                auto bg = getChildByName("bg");
                auto qNode = bg->getChildByName<TextField*>("TextField_2");
                clickedButton->runAction(Spawn::createWithTwoActions(MoveTo::create(1.0f, qNode->getPosition()), FadeOut::create(1.0f)));
                runAction(Sequence::create(DelayTime::create(1.0f), CallFunc::create([=]() {
                    auto bg = getChildByName("bg");
                    auto qNode = bg->getChildByName<TextField*>("TextField_2");
                    qNode->setString(_questions[1]);
                }), DelayTime::create(1.0f), CallFunc::create([=]() {
                    _qHandler->gotoNextQuestion(1);
                }), NULL));
            } else {
                clickedButton->runAction(FShake::actionWithDuration(1.0f, 10.0f));
                _qHandler->getMenuContext()->addPoints(-1);
            }
            break;
        }
    }
}
