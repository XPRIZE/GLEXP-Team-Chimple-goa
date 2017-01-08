//
//  FillInTheBlanks.cpp
//  goa
//
//  Created by Srikanth Talapadi on 08/01/2017.
//
//

#include "FillInTheBlanks.hpp"
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
    
}

FillInTheBlanks::FillInTheBlanks() {
    
}

FillInTheBlanks::~FillInTheBlanks() {
    
}

bool FillInTheBlanks::initWithQuestions(QuestionHandler* qHandler, std::vector<std::string> questions) {
    return MultipleChoice::initWithQuestions(qHandler, questions);
}

void FillInTheBlanks::buttonSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    MultipleChoice::buttonSelected(pSender, eEventType);
}
