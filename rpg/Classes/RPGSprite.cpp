//
//  RPGSprite.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 12/07/16.
//
//

#include "RPGSprite.h"
#include "RPGConfig.h"
#include "SkeletonCharacter.h"
#include "HelloWorldScene.h"

USING_NS_CC;

RPGSprite::RPGSprite() {
    this->sprite = NULL;
}


RPGSprite::~RPGSprite() {
    
}


RPGSprite* RPGSprite::create(cocos2d::Sprite* sprite, std::unordered_map<std::string, std::string> attributes)
{
    auto rpgSprite = new RPGSprite();
    if (rpgSprite && rpgSprite->initialize(sprite, attributes)) {
        rpgSprite->autorelease();
        return rpgSprite;
    }
    CC_SAFE_DELETE(rpgSprite);
    return nullptr;
}


bool RPGSprite::initialize(cocos2d::Sprite* sprite, std::unordered_map<std::string, std::string> attributes) {
    this->sprite = sprite;
    this->setAttributes(attributes);
    this->addChild(this->sprite);
    
    
    auto checkVicinityWithMainCharacter = [=] (EventCustom * event) {
        SkeletonCharacter* mainSkeleton =  (SkeletonCharacter* )event->getUserData();
        if(this->checkVicinityToMainSkeleton(mainSkeleton))
        {
            this->setVicinityToMainCharacter(true);
        } else {
            this->setVicinityToMainCharacter(false);
        }
    };
    
    ADD_VICINITY_NOTIFICATION(this, RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, checkVicinityWithMainCharacter);
    
    
    auto tapOnClickableObjectEvent = [=] (EventCustom * event) {
        EVENT_DISPATCHER->dispatchCustomEvent (RPGConfig::DISPATCH_CLEANUP_AND_SCENE_TRANSITION_NOTIFICATION);
        
        CCLOG("Received Tap on clickable object %s", event->getUserData());
        Director::getInstance()->replaceScene(TransitionFade::create(1, HelloWorld::createScene("farmhouse"), cocos2d::Color3B::WHITE));

    };
    
    SEND_MESSAGE_FOR_TAP_ON_SPEAKABLE(this, RPGConfig::TAP_ON_CLICKABLE_OBJECT_NOTIFICATION, tapOnClickableObjectEvent);

    this->scheduleUpdate();
    
    return true;

}

cocos2d::Sprite* RPGSprite::getSprite() {
    return this->sprite;
}

void RPGSprite::setAttributes(std::unordered_map<std::string, std::string> attributes) {
    this->attributes = attributes;
    //process it
    
    std::unordered_map<std::string,std::string>::const_iterator it = this->attributes.find("filename");
    if ( it != this->attributes.end() ) {
        this->setFileName(it->second);
    }
    
    it = this->attributes.find("key");
    if ( it != this->attributes.end() ) {
        this->setKey(it->second);
        this->setName(it->second);
    }
    
    it = this->attributes.find("animation");
    if ( it != this->attributes.end() ) {
        this->setDefaultAnimationName(it->second);
    }
    
    it = this->attributes.find("canSpeak");
    if ( it != this->attributes.end() ) {
        this->setCanSpeak(it->second);
    }
    
    it = this->attributes.find("clickable");
    if ( it != this->attributes.end() ) {
        this->setClickable(it->second);
    }

    it = this->attributes.find("nextScene");
    if ( it != this->attributes.end() ) {
        this->setNextScene(it->second);
    }

}

std::unordered_map<std::string, std::string> RPGSprite::getAttributes() {
    return this->attributes;
}

void RPGSprite::update(float dt) {
    if(!this->vicinityToMainCharacter) {
        
        cocos2d::Director::getInstance()->getEventDispatcher()->dispatchCustomEvent( RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, this);
    }
}

bool RPGSprite::checkVicinityToMainSkeleton(SkeletonCharacter* skeletonCharacter) {
    Vec2 mainSkeletonPosition = skeletonCharacter->getSkeletonNode()->getPosition();
    
    float distance = mainSkeletonPosition.getDistance(this->getSprite()->getPosition());
    
    if(distance >= -300 && distance <= 300) {
        return true;
    }
    return false;

}