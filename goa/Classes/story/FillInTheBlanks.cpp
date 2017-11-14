//
//  FillInTheBlanks.cpp
//  goa
//
//  Created by Srikanth Talapadi on 08/01/2017.
//
//

#include "FillInTheBlanks.hpp"
#include "../util/CommonTextField.hpp"
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

void FillInTheBlanks::onExitTransitionDidStart() {
    MultipleChoice::onExitTransitionDidStart();
}


FillInTheBlanks::FillInTheBlanks()
{
    
}

FillInTheBlanks::~FillInTheBlanks() {
    
}


bool FillInTheBlanks::initWithQuestions(QuestionHandler* qHandler, std::vector<std::string> questions) {
    if(MultipleChoice::initWithQuestions(qHandler, questions)) {
        auto qNode = _questionTextField;
        if(qNode) {
            auto fitb = _questions[1];
//            _questionTextField->setOriginalText(_questions[1]);
            std::transform(fitb.begin(), fitb.end(), fitb.begin(), ::tolower);
            auto fitbOrig = _questions[1];
            std::string blanks = "______________";
            std::string filler = _questions[2];
            std::transform(filler.begin(), filler.end(), filler.begin(), ::tolower);
            auto pos = fitb.find(filler);
            if(pos != std::string::npos) {
                fitbOrig.replace(pos, filler.size(), blanks);
            }
            _questionTextField->setOriginalText(fitbOrig);
            qNode->setString(QuestionHandler::wrapString(fitbOrig, 40));
            
            _soundButton = Button::create("template/template_02/sound_button.png", "template/template_02/click_sound_button.png", "template/template_02/click_sound_button.png", ui::Widget::TextureResType::PLIST);
            _soundButton->setScale(1);
            _soundButton->setPosition(Vec2(qNode->getPosition().x + qNode->getBoundingBox().size.width/2 + 250.0f, qNode->getPosition().y + qNode->getBoundingBox().size.height/2 + 50.0f));
            
            qNode->getParent()->addChild(_soundButton);

        }
        return true;
    }
    return false;
}

void FillInTheBlanks::buttonSelected(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    cocostudio::ComExtensionData* data = (cocostudio::ComExtensionData*)clickedButton->getComponent("ComExtensionData");
    if(data != NULL && !data->getCustomProperty().empty()) {
        std::string word = data->getCustomProperty();        
        _qHandler->getMenuContext()->pronounceWord(word);
    }
    
    switch (eEventType) {
        case ui::Widget::TouchEventType::ENDED:
        {
            clickedButton->setEnabled(false);
            auto buttonName = clickedButton->getName();
            if(buttonName == "1") {
                _qHandler->getMenuContext()->addPoints(1);
                CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("sounds/sfx/success.ogg");
                auto bg = getChildByName("bg");
                auto qNode = bg->getChildByName<TextField*>("TextField_2");
                auto soundButton = clickedButton->getParent()->getChildByName("sound_button");
                if(soundButton != nullptr) {
                    soundButton->removeFromParentAndCleanup(true);
                }                
                clickedButton->runAction(Spawn::createWithTwoActions(MoveTo::create(1.0f, qNode->getPosition()), FadeOut::create(1.0f)));
                runAction(Sequence::create(DelayTime::create(1.0f), CallFunc::create([=]() {
                    auto bg = getChildByName("bg");
                    auto qNode = bg->getChildByName<TextField*>("TextField_2");
                    qNode->setString(QuestionHandler::wrapString(_questions[1], 40));
                }), DelayTime::create(1.0f), CallFunc::create([=]() {
                    _qHandler->gotoNextQuestion(1);
                }), NULL));
            } else {
                clickedButton->runAction(FShake::actionWithDuration(1.0f, 10.0f));
                _qHandler->getMenuContext()->addPoints(-1);
                CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("sounds/sfx/error.ogg");
            }
            break;
        }
    }
}
