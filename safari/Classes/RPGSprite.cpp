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

RPGSprite::RPGSprite():
shouldSendShowTouchSign(false),
showTouchSignNotificationSent(false),
vicinityToMainCharacter(false),
posX(""),
posY(""),
nextScene(""),
interAct(""),
fileName(""),
defaultAnimationName(""),
key(""),
show("")
{
    this->sprite = NULL;
    this->mainSkeleton = NULL;
}


RPGSprite::~RPGSprite() {
    
}


RPGSprite* RPGSprite::create(cocos2d::Node* sprite, std::unordered_map<std::string, std::string> attributes)
{
    auto rpgSprite = new RPGSprite();
    if (rpgSprite && rpgSprite->initialize(sprite, attributes)) {
        rpgSprite->autorelease();
        return rpgSprite;
    }
    CC_SAFE_DELETE(rpgSprite);
    return nullptr;
}


bool RPGSprite::initialize(cocos2d::Node* sprite, std::unordered_map<std::string,std::string> attributes) {
    this->sprite = sprite;
    this->setAttributes(attributes);
    this->addChild(this->sprite);
    
    
    auto checkVicinityWithMainCharacter = [=] (EventCustom * event) {
        this->mainSkeleton = static_cast<SkeletonCharacter*>(event->getUserData());
        this->checkVicinityToMainSkeleton(this->mainSkeleton);
        
        if(this->getVicinityToMainCharacter() && !this->getShowTouchSignNotificationSent()) {
            this->setShowTouchSignNotificationSent(true);
            EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SEND_SHOW_TOUCH_POINT_SIGN_NOTIFICATION, static_cast<void*>(this->getSprite()));
            
        }
    };
    
    ADD_VICINITY_NOTIFICATION(this, RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, checkVicinityWithMainCharacter);
    
    this->scheduleUpdate();
    
    return true;

}

cocos2d::Node* RPGSprite::getSprite() {
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
    
    it = this->attributes.find("canInteract");
    if ( it != this->attributes.end() ) {
        this->setInterAct(it->second);
    }    
    
    it = this->attributes.find("nextScene");
    if ( it != this->attributes.end() ) {
        this->setNextScene(it->second);
    }
    
    it = this->attributes.find("posX");
    if ( it != this->attributes.end() ) {
        this->setPosX(it->second);
    }

    
    it = this->attributes.find("posY");
    if ( it != this->attributes.end() ) {
        this->setPosY(it->second);
    }
}

std::unordered_map<std::string, std::string> RPGSprite::getAttributes() {
    return this->attributes;
}

void RPGSprite::update(float dt) {
    if(!this->vicinityToMainCharacter && this->mainSkeleton != NULL) {
        
        EVENT_DISPATCHER->dispatchCustomEvent( RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, this->mainSkeleton);
    }
}

bool RPGSprite::checkVicinityToMainSkeleton(SkeletonCharacter* skeletonCharacter) {
    bool isNear = false;
    Vec2 mainSkeletonPositionFromBottom = Point(skeletonCharacter->getSkeletonNode()->getPosition().x, skeletonCharacter->getSkeletonNode()->getPosition().y);
    Vec2 mainSkeletonPositionFromTop = Point(skeletonCharacter->getSkeletonNode()->getPosition().x, skeletonCharacter->getSkeletonNode()->getPosition().y + skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height);
    
    float distanceFromTop= mainSkeletonPositionFromTop.getDistance(this->getSprite()->getPosition());
    float distanceFromBottom = mainSkeletonPositionFromBottom.getDistance(this->getSprite()->getPosition());
    
    if((distanceFromTop >= -OBJECT_TAP_BOUNDING_BOX_WIDTH && distanceFromTop <= OBJECT_TAP_BOUNDING_BOX_WIDTH) || (distanceFromBottom >= -OBJECT_TAP_BOUNDING_BOX_WIDTH && distanceFromBottom <= OBJECT_TAP_BOUNDING_BOX_WIDTH)) {
        this->setVicinityToMainCharacter(true);
        isNear = true;

    } else {
        this->setVicinityToMainCharacter(false);
        isNear = false;
    }

    
    if((distanceFromTop >= -OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH && distanceFromTop <= OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH) || (distanceFromBottom >= -OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH && distanceFromBottom <= OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH)) {
        this->setShouldSendShowTouchSign(true);
        
    } else {
        this->setShouldSendShowTouchSign(false);
        this->setShowTouchSignNotificationSent(false);
    }


    return isNear;

}

SkeletonCharacter* RPGSprite::getMainSkeleton() {
    return this->mainSkeleton;
}