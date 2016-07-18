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
    };
    
    ADD_VICINITY_NOTIFICATION(this, RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, checkVicinityWithMainCharacter);
    
    
    auto tapOnClickableObjectEvent = [=] (EventCustom * event) {
        std::vector<std::string>*messages = static_cast<std::vector<std::string>*>(event->getUserData());
        std::string nextScene = "";
        std::string skeletonX = "";
        std::string skeletonY = "";
        std::string showSprite = "";
        
        if(this->getSprite()->isVisible() && this->vicinityToMainCharacter == true && messages != NULL && messages->size() == 4)
        {
            nextScene = messages->at(0);
            skeletonX = messages->at(1);
            skeletonY = messages->at(2);
            showSprite = messages->at(3);
            
            if(!nextScene.empty()) {
                if(!this->defaultAnimationName.empty()) {
                    auto timeline =  CSLoader::createTimeline(this->getDefaultAnimationName());
                    this->getSprite()->runAction(timeline);
                    timeline->gotoFrameAndPlay(0, false);
                    EVENT_DISPATCHER->dispatchCustomEvent (RPGConfig::DISPATCH_CLEANUP_AND_SCENE_TRANSITION_NOTIFICATION);

                    Director::getInstance()->replaceScene(TransitionFade::create(1, HelloWorld::createScene(nextScene, skeletonX, skeletonY), cocos2d::Color3B::WHITE));
                    
                } else {
                    EVENT_DISPATCHER->dispatchCustomEvent (RPGConfig::DISPATCH_CLEANUP_AND_SCENE_TRANSITION_NOTIFICATION);

                    Director::getInstance()->replaceScene(TransitionFade::create(1, HelloWorld::createScene(nextScene, skeletonX, skeletonY), cocos2d::Color3B::WHITE));
                }
            } else {
                //find children by name showSprite
                std::string otherSprite (showSprite);
                this->getSprite()->setVisible(false);
                EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::ON_TAP_VISIBLE_SPRITE_NOTIFICATION, static_cast<void*>(&otherSprite));
            }
            
        }
    };
    
    SEND_MESSAGE_FOR_TAP_ON_SPEAKABLE(this, RPGConfig::TAP_ON_CLICKABLE_OBJECT_NOTIFICATION, tapOnClickableObjectEvent);
    

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
    
    it = this->attributes.find("posX");
    if ( it != this->attributes.end() ) {
        this->setPosX(it->second);
    }

    
    it = this->attributes.find("posY");
    if ( it != this->attributes.end() ) {
        this->setPosY(it->second);
    }

    it = this->attributes.find("show");
    if ( it != this->attributes.end() ) {
        this->setShow(it->second);        
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


    return isNear;

}

SkeletonCharacter* RPGSprite::getMainSkeleton() {
    return this->mainSkeleton;
}