//
//  Picture.cpp
//  goa
//
//  Created by Srikanth Talapadi on 08/01/2017.
//
//

#include "Picture.hpp"

USING_NS_CC;
using namespace cocos2d::ui;

Picture *Picture::create(QuestionHandler* qHandler, std::vector<std::string> questions) {
    Picture* lhs = new (std::nothrow) Picture();
    if(lhs && lhs->initWithQuestions(qHandler, questions))
    {
        lhs->autorelease();
        return lhs;
    }
    CC_SAFE_DELETE(lhs);
    return nullptr;
}

void Picture::onEnterTransitionDidFinish() {
    
}

Picture::Picture() {
    
}

Picture::~Picture() {
    
}

bool Picture::initWithQuestions(QuestionHandler* qHandler, std::vector<std::string> questions) {
    return Meaning::initWithQuestions(qHandler, questions);
}

void Picture::buttonSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    Meaning::buttonSelected(pSender, eEventType);
}

void Picture::adjustButtons() {
    auto bg = this->getChildByName("bg");
    
    auto button = static_cast<Button*> (bg->getChildByName("Button_1"));
    button->setName("1");
    auto sprite = Sprite::create(_qHandler->getBaseDir() + "/" + _questions[1]);
    if(sprite) {
        button->addChild(sprite);
    }
    button = static_cast<Button*> (bg->getChildByName("Button_2"));
    button->setName("2");
    sprite = Sprite::create(_qHandler->getBaseDir() + "/" + _questions[3]);
    if(sprite) {
        button->addChild(sprite);
    }
    button = static_cast<Button*> (bg->getChildByName("Button_3"));
    button->setName("3");
    sprite = Sprite::create(_qHandler->getBaseDir() + "/" + _questions[5]);
    if(sprite) {
        button->addChild(sprite);
    }
    button = static_cast<Button*> (bg->getChildByName("Button_4"));
    button->setName("4");
    sprite = Sprite::create(_qHandler->getBaseDir() + "/" + _questions[7]);
    if(sprite) {
        button->addChild(sprite);
    }
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_1"), "1", _questions[1], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_2"), "2", _questions[3], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_3"), "3", _questions[5], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_4"), "4", _questions[7], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_5"), "1_answer", _questions[2], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_6"), "2_answer", _questions[4], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_7"), "3_answer", _questions[6], CC_CALLBACK_2(Meaning::buttonSelected, this));
    QuestionHandler::setButtonProperties(bg->getChildByName("Button_8"), "4_answer", _questions[8], CC_CALLBACK_2(Meaning::buttonSelected, this));
    
}
