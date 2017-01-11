//
//  Introduction.cpp
//  goa
//
//  Created by Srikanth Talapadi on 11/01/2017.
//
//

#include "Introduction.hpp"
#include "../lang/LangUtil.h"
#include "AudioEngine.h"

USING_NS_CC;
using namespace experimental;
using namespace cocos2d::ui;

cocos2d::Scene* Introduction::createScene() {
    auto layer = Introduction::create();
    auto scene = Scene::create();
    scene->addChild(layer);
    return scene;
}

Introduction* Introduction::create() {
    Introduction* word = new (std::nothrow) Introduction();
    if(word && word->init())
    {
        word->autorelease();
        return word;
    }
    CC_SAFE_DELETE(word);
    return nullptr;
}

Introduction::Introduction():
_chimp(nullptr),
_anim(nullptr),
_buttonsClicked(0)
{
    
}

Introduction::~Introduction() {
    
}

bool Introduction::init() {
    if(!Node::init()) {
        return false;
    }
    auto bg = CSLoader::createNode("bgmap/bgmap.csb");
    addChild(bg);
    _chimp = CSLoader::createNode("chimpanzee.csb");
    _chimp->setPosition(Vec2(1280, 400));
    addChild(_chimp);
    _anim = CSLoader::createTimeline("chimpanzee.csb");
    _chimp->runAction(_anim);
    return true;
}

void Introduction::onEnterTransitionDidFinish() {
    Node::onEnterTransitionDidFinish();
    _anim->play("talk", true);
    int audioId = AudioEngine::play2d((LangUtil::getInstance()->getDir() + "/help/introduction/introduction_1.wav").c_str());
    if(audioId >= 0) {
        AudioEngine::setFinishCallback(audioId, CC_CALLBACK_0(Introduction::introduceTouch, this));
    } else {
        introduceTouch();
    }
    
    
}

Button* Introduction::createButton(float scale, Vec2 position) {
    auto button = Button::create("bgmap/sun.png", "bgmap/sun.png", "bgmap/sun.png", Widget::TextureResType::PLIST);
    button->setPosition(position);
    button->setScale(0.1);
    auto scaleTo = ScaleTo::create(1.0f, scale);
    auto elastic = EaseBackOut::create(scaleTo);
    button->runAction(elastic);
}

void Introduction::introduceTouch() {
    _anim->stop();
    Size visibleSize = Director::getInstance()->getVisibleSize();
    auto button = createButton(1.0f, Vec2(visibleSize.width * 3 / 4, visibleSize.height / 2));
    button->addTouchEventListener(CC_CALLBACK_2(Introduction::clickButton, this));
    addChild(button);
}

void Introduction::clickButton(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        Button* clickedButton = dynamic_cast<Button *>(pSender);
        _anim->play("talk", true);
        int audioId = AudioEngine::play2d((LangUtil::getInstance()->getDir() + "/help/introduction/introduction_2.wav").c_str());
        if(audioId >= 0) {
            AudioEngine::setFinishCallback(audioId, CC_CALLBACK_0(Introduction::practiceTouch, this));
        } else {
            practiceTouch();
        }
        clickedButton->removeFromParent();
    }
}

void Introduction::practiceTouch() {
    _anim->stop();
    Size visibleSize = Director::getInstance()->getVisibleSize();
    auto button = createButton(0.25f, Vec2(visibleSize.width * 1 / 4, visibleSize.height * 1 / 4));
    button->addTouchEventListener(CC_CALLBACK_2(Introduction::clickManyButtons, this));
    addChild(button);
    button = createButton(0.25f, Vec2(visibleSize.width * 1 / 4, visibleSize.height * 3 / 4));
    button->addTouchEventListener(CC_CALLBACK_2(Introduction::clickManyButtons, this));
    addChild(button);
    button = createButton(0.25f, Vec2(visibleSize.width * 3 / 4, visibleSize.height * 1 / 4));
    button->addTouchEventListener(CC_CALLBACK_2(Introduction::clickManyButtons, this));
    addChild(button);
    button = createButton(0.25f, Vec2(visibleSize.width * 3 / 4, visibleSize.height * 3 / 4));
    button->addTouchEventListener(CC_CALLBACK_2(Introduction::clickManyButtons, this));
    addChild(button);
    
}

void Introduction::clickManyButtons(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        if(++_buttonsClicked == 4) {
            Button* clickedButton = dynamic_cast<Button *>(pSender);
            _anim->play("talk", true);
            int audioId = AudioEngine::play2d((LangUtil::getInstance()->getDir() + "/help/introduction/introduction_3.wav").c_str());
            if(audioId >= 0) {
                AudioEngine::setFinishCallback(audioId, CC_CALLBACK_0(Introduction::introduceDrag, this));
            } else {
                practiceTouch();
            }
            clickedButton->removeFromParent();
        }
    }
    
}

void Introduction::introduceDrag() {
    _anim->stop();
    Size visibleSize = Director::getInstance()->getVisibleSize();
    auto button = createButton(0.25f, Vec2(visibleSize.width * 1 / 4, visibleSize.height * 1 / 4));
    button->addTouchEventListener(CC_CALLBACK_2(Introduction::clickManyButtons, this));
    addChild(button);
}

void Introduction::dragButton(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        Button* clickedButton = dynamic_cast<Button *>(pSender);
        _anim->play("talk", true);
        int audioId = AudioEngine::play2d((LangUtil::getInstance()->getDir() + "/help/introduction/introduction_4.wav").c_str());
        if(audioId >= 0) {
            AudioEngine::setFinishCallback(audioId, CC_CALLBACK_0(Introduction::practiceTouch, this));
        } else {
            practiceTouch();
        }
        clickedButton->removeFromParent();
    }
    
}

void Introduction::playVideo() {
    
}

