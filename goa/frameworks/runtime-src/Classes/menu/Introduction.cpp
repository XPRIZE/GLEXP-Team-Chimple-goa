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
#include "../ScrollableGameMapScene.hpp"

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
_buttonsClicked(0),
_currentStep(0)
{
    
}

Introduction::~Introduction() {
    
}

bool Introduction::init() {
    if(!Node::init()) {
        return false;
    }
    Size visibleSize = Director::getInstance()->getVisibleSize();
    auto bg = Sprite::create("introduction/monkeybg.png");
    bg->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
    addChild(bg);
    
    _chimp = CSLoader::createNode("chimpanzee.csb");
    _chimp->setPosition(Vec2(1280, 400));
    addChild(_chimp);
    _anim = CSLoader::createTimeline("chimpanzee.csb");
    _chimp->runAction(_anim);
    return true;
}

Button* Introduction::createButton(float scale, Vec2 position) {
    auto button = Button::create("introduction/ball.png", "introduction/ball.png", "introduction/ball.png", Widget::TextureResType::LOCAL);
    button->setPosition(position);
    button->setScale(0.1);
    auto scaleTo = ScaleTo::create(1.0f, scale);
    auto elastic = EaseBackOut::create(scaleTo);
    auto callFunc = CallFuncN::create([=](Node *b) {
        auto scaleBy = ScaleBy::create(1.0f, 1.1f);
        auto seq = Sequence::create(EaseBackOut::create(scaleBy), DelayTime::create(1.0), EaseBackOut::create(scaleBy->reverse()), NULL);
        b->runAction(RepeatForever::create(seq));
    });
    button->runAction(Sequence::createWithTwoActions(elastic, callFunc));
    return button;
}

void Introduction::onEnterTransitionDidFinish() {
    Node::onEnterTransitionDidFinish();
    _anim->play("talk", true);
    _currentStep++;
    CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic((LangUtil::getInstance()->getDir() + "/help/introduction/introduction_1.wav").c_str());
    runAction(Sequence::createWithTwoActions(DelayTime::create(2.0f), CallFunc::create(CC_CALLBACK_0(Introduction::scheduleUpdate, this))));
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
        _currentStep++;
        CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic((LangUtil::getInstance()->getDir() + "/help/introduction/introduction_2.wav").c_str());
        runAction(Sequence::createWithTwoActions(DelayTime::create(2.0f), CallFunc::create(CC_CALLBACK_0(Introduction::scheduleUpdate, this))));
        clickedButton->removeFromParent();
    }
}

void Introduction::practiceTouch() {
    _anim->stop();
    Size visibleSize = Director::getInstance()->getVisibleSize();
    auto button = createButton(0.5f, Vec2(visibleSize.width * 1 / 4, visibleSize.height * 1 / 4));
    button->addTouchEventListener(CC_CALLBACK_2(Introduction::clickManyButtons, this));
    addChild(button);
    button = createButton(0.5f, Vec2(visibleSize.width * 1 / 4, visibleSize.height * 3 / 4));
    button->addTouchEventListener(CC_CALLBACK_2(Introduction::clickManyButtons, this));
    addChild(button);
    button = createButton(0.5f, Vec2(visibleSize.width * 3 / 4, visibleSize.height * 1 / 4));
    button->addTouchEventListener(CC_CALLBACK_2(Introduction::clickManyButtons, this));
    addChild(button);
    button = createButton(0.5f, Vec2(visibleSize.width * 3 / 4, visibleSize.height * 3 / 4));
    button->addTouchEventListener(CC_CALLBACK_2(Introduction::clickManyButtons, this));
    addChild(button);
    
}

void Introduction::clickManyButtons(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        Button* clickedButton = dynamic_cast<Button *>(pSender);
        if(++_buttonsClicked == 4) {
            _anim->play("talk", true);
            _currentStep++;
            CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic((LangUtil::getInstance()->getDir() + "/help/introduction/introduction_3.wav").c_str());
            runAction(Sequence::createWithTwoActions(DelayTime::create(2.0f), CallFunc::create(CC_CALLBACK_0(Introduction::scheduleUpdate, this))));
        }
        clickedButton->removeFromParent();
    }
}

void Introduction::introduceDrag() {
    _anim->stop();
    Size visibleSize = Director::getInstance()->getVisibleSize();
    auto basket = Sprite::create("introduction/basket.png");
    basket->setPosition(Vec2(visibleSize.width * 3 / 4, visibleSize.height * 1 / 4));
    basket->setScale(0.1);
    auto scaleTo = ScaleTo::create(1.0f, 0.5f);
    auto elastic = EaseBackOut::create(scaleTo);
    auto callFunc = CallFuncN::create([=](Node *b) {
        auto scaleBy = ScaleBy::create(1.0f, 1.1f);
        auto seq = Sequence::create(EaseBackOut::create(scaleBy), DelayTime::create(1.0), EaseBackOut::create(scaleBy->reverse()), NULL);
        b->runAction(RepeatForever::create(seq));
    });
    basket->runAction(Sequence::createWithTwoActions(elastic, callFunc));
    addChild(basket);
    
    auto button = createButton(0.5f, Vec2(visibleSize.width * 1 / 4, visibleSize.height * 1 / 4));
    button->addTouchEventListener(CC_CALLBACK_2(Introduction::dragButton, this));
    addChild(button);
}

void Introduction::dragButton(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        Button* clickedButton = dynamic_cast<Button *>(pSender);
        _anim->play("talk", true);
        _currentStep++;
        CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic((LangUtil::getInstance()->getDir() + "/help/introduction/introduction_4.wav").c_str());
        runAction(Sequence::createWithTwoActions(DelayTime::create(2.0f), CallFunc::create(CC_CALLBACK_0(Introduction::scheduleUpdate, this))));
        clickedButton->removeFromParent();
    }
}

void Introduction::playVideo() {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    auto tv = Sprite::create("TV.png");
    tv->setScaleX(0.73);
    tv->setScaleY(0.70);
    tv->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
    tv->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
    tv->setName("tv");
    experimental::ui::VideoPlayer* vp = experimental::ui::VideoPlayer::create();
    this->addChild(tv, 2);
    vp->setContentSize(cocos2d::Size((tv->getContentSize().width *0.73)-200, (tv->getContentSize().height*0.7) - 180 ));
    vp->setFileName(LangUtil::getInstance()->getDir() + "/help/introduction/introduction.webm");
    vp->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
    vp->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
    vp->play();
    vp->setName("video");
    this->addChild(vp, 2);
    vp->addEventListener(CC_CALLBACK_2(Introduction::videoEventCallback, this));
#else
    videoPlayOverCallback();
#endif
}

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
void Introduction::videoEventCallback(Ref* sender, cocos2d::experimental::ui::VideoPlayer::EventType eventType) {
    switch (eventType) {
        case cocos2d::experimental::ui::VideoPlayer::EventType::PLAYING:
            break;
        case cocos2d::experimental::ui::VideoPlayer::EventType::PAUSED:
            break;
        case cocos2d::experimental::ui::VideoPlayer::EventType::STOPPED:
            break;
        case cocos2d::experimental::ui::VideoPlayer::EventType::COMPLETED:
            videoPlayOverCallback();
            break;
        default:
            break;
    }
}
#endif  

void Introduction::videoPlayOverCallback() {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    this->removeChildByName("video");
    this->removeChildByName("tv");
#endif
    Director::getInstance()->replaceScene(TransitionFade::create(2.0, ScrollableGameMapScene::createScene()));
}

void Introduction::update(float dt) {
    if(!CocosDenshion::SimpleAudioEngine::getInstance()->isBackgroundMusicPlaying()) {
        unscheduleUpdate();
        switch (_currentStep) {
            case 1:
                introduceTouch();
                break;
            case 2:
                practiceTouch();
                break;
            case 3:
                introduceDrag();
                break;
            case 4:
                playVideo();
                break;
            default:
                playVideo();
                break;
        }
    }
}

