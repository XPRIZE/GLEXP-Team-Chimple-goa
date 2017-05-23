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
    Meaning::onEnterTransitionDidFinish();
}

Picture::Picture() {
    
}

Picture::~Picture() {
    
}

bool Picture::initWithQuestions(QuestionHandler* qHandler, std::vector<std::string> questions) {
    return Meaning::initWithQuestions(qHandler, questions);
}

void Picture::soundSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    Meaning::soundSelected(pSender, eEventType);
}

void Picture::buttonSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    Meaning::buttonSelected(pSender, eEventType);
}

void Picture::adjustButtons() {
    auto bg = this->getChildByName("bg");
    
    auto button = static_cast<Button*> (bg->getChildByName("Node_1")->getChildByName("Button_1"));
    button->setName("1");
    button->addTouchEventListener(CC_CALLBACK_2(Meaning::buttonSelected, this));
    auto sprite = Sprite::create(_qHandler->getBaseDir() + "/" + _questions[1]);
    if(sprite) {
//        sprite->setPosition(button->getContentSize().width / 2, button->getContentSize().height / 2);
        bg->getChildByName("Node_1")->addChild(sprite);
    }
    button = static_cast<Button*> (bg->getChildByName("Node_2")->getChildByName("Button_2"));
    button->setName("2");
    button->addTouchEventListener(CC_CALLBACK_2(Meaning::buttonSelected, this));
    sprite = Sprite::create(_qHandler->getBaseDir() + "/" + _questions[3]);
    if(sprite) {
//        sprite->setPosition(button->getContentSize().width / 2, button->getContentSize().height / 2);
        bg->getChildByName("Node_2")->addChild(sprite);
    }
    button = static_cast<Button*> (bg->getChildByName("Node_3")->getChildByName("Button_3"));
    button->setName("3");
    button->addTouchEventListener(CC_CALLBACK_2(Meaning::buttonSelected, this));
    sprite = Sprite::create(_qHandler->getBaseDir() + "/" + _questions[5]);
    if(sprite) {
//        sprite->setPosition(button->getContentSize().width / 2, button->getContentSize().height / 2);
        bg->getChildByName("Node_3")->addChild(sprite);
    }
    button = static_cast<Button*> (bg->getChildByName("Node_4")->getChildByName("Button_4"));
    button->setName("4");
    button->addTouchEventListener(CC_CALLBACK_2(Meaning::buttonSelected, this));
    sprite = Sprite::create(_qHandler->getBaseDir() + "/" + _questions[7]);
    if(sprite) {
//        sprite->setPosition(button->getContentSize().width / 2, button->getContentSize().height / 2);
        bg->getChildByName("Node_4")->addChild(sprite);
    }
    std::vector<std::string> buttons = {
        "5",
        "6",
        "7",
        "8"
    };
    std::random_shuffle ( buttons.begin(), buttons.end() );
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_" + buttons[0])->getChildByName("Button_"+buttons[0]), "1_answer", _questions[2], CC_CALLBACK_2(Meaning::buttonSelected, this), CC_CALLBACK_2(Meaning::soundSelected, this), 36);
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_" + buttons[1])->getChildByName("Button_"+buttons[1]), "2_answer", _questions[4], CC_CALLBACK_2(Meaning::buttonSelected, this), CC_CALLBACK_2(Meaning::soundSelected, this),36);
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_" + buttons[2])->getChildByName("Button_"+buttons[2]), "3_answer", _questions[6], CC_CALLBACK_2(Meaning::buttonSelected, this), CC_CALLBACK_2(Meaning::soundSelected, this), 36);
    QuestionHandler::setButtonProperties(bg->getChildByName("Node_" + buttons[3])->getChildByName("Button_"+buttons[3]), "4_answer", _questions[8], CC_CALLBACK_2(Meaning::buttonSelected, this), CC_CALLBACK_2(Meaning::soundSelected, this), 36);
}
