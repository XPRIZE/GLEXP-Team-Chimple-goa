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

USING_NS_CC;

RPGSprite::RPGSprite():
vicinityToMainCharacter(false),
posX(""),
posY(""),
nextScene(""),
interAct(""),
fileName(""),
defaultAnimationName(""),
key(""),
show(""),
transitToGameScene(""),
actionTimeLine(NULL)
{
    this->touchPointerNode = NULL;
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
    sprite->removeFromParent();
    this->sprite = sprite;
    this->setName(sprite->getName());
    this->setAttributes(attributes);
    this->addChild(this->sprite);
    
    auto listenerTouches = EventListenerTouchOneByOne::create();
    listenerTouches->setSwallowTouches(true);
    listenerTouches->onTouchBegan = CC_CALLBACK_2(RPGSprite::onTouchBegan, this);
    listenerTouches->onTouchEnded = CC_CALLBACK_2(RPGSprite::touchEnded, this);
    this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listenerTouches, this);
    
    auto checkVicinityWithMainCharacter = [=] (EventCustom * event) {
        this->mainSkeleton = static_cast<SkeletonCharacter*>(event->getUserData());
        this->checkVicinityToMainSkeleton(this->mainSkeleton);
        
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
    
    it = this->attributes.find("key");
    if ( it != this->attributes.end() ) {
        this->setKey(it->second);
    }

    it = this->attributes.find("transitToGameScene");
    if ( it != this->attributes.end() ) {
        this->setTransitToGameScene(it->second);
    }
}

std::unordered_map<std::string, std::string> RPGSprite::getAttributes() {
    return this->attributes;
}

void RPGSprite::update(float dt) {
    if(!this->getVicinityToMainCharacter() && this->mainSkeleton != NULL && !this->mainSkeleton->isStanding) {
        this->checkVicinityToMainSkeleton(this->mainSkeleton);
    }
}

void RPGSprite::checkVicinityToMainSkeleton(SkeletonCharacter* skeletonCharacter) {
    Vec2 mainSkeletonPositionFromBottom = Point(skeletonCharacter->getSkeletonNode()->getPosition().x, skeletonCharacter->getSkeletonNode()->getPosition().y);
    Vec2 mainSkeletonPositionFromTop = Point(skeletonCharacter->getSkeletonNode()->getPosition().x, skeletonCharacter->getSkeletonNode()->getPosition().y + skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height);
    
    float distanceFromTop= mainSkeletonPositionFromTop.getDistance(this->getSprite()->getPosition());
    float distanceFromBottom = mainSkeletonPositionFromBottom.getDistance(this->getSprite()->getPosition());
    
    if((distanceFromTop >= -OBJECT_TAP_BOUNDING_BOX_WIDTH && distanceFromTop <= OBJECT_TAP_BOUNDING_BOX_WIDTH) || (distanceFromBottom >= -OBJECT_TAP_BOUNDING_BOX_WIDTH && distanceFromBottom <= OBJECT_TAP_BOUNDING_BOX_WIDTH)) {
        this->setVicinityToMainCharacter(true);
        this->showTouchPointer();
    } else {
        this->setVicinityToMainCharacter(false);
    }

    
    if((distanceFromTop >= -OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH && distanceFromTop <= OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH) || (distanceFromBottom >= -OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH && distanceFromBottom <= OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH)) {
        if(!this->vicinityToMainCharacter) {
            this->showTouchPointer();
        }
    }
}


void RPGSprite::destroyTouchPointer() {
    if(this->touchPointerNode != NULL) {
        this->touchPointerNode->removeFromParent();
        this->touchPointerNode = NULL;
    }
}

void RPGSprite::showTouchPointer() {
    if(this->sprite && this->sprite->isVisible() && this->touchPointerNode == NULL)
    {
        this->touchPointerNode =  Sprite::create(TOUCH_POINTER_IMG);
        this->touchPointerNode->setScale(0.5f, 0.5f);
        this->touchPointerNode->setPosition(this->sprite->getPosition());
        this->addChild(this->touchPointerNode);
        this->touchPointerNode->setVisible(true);
        
        auto scaleBy = ScaleBy::create(0.5, 1.2);
        auto sequenceScale = Sequence::create(scaleBy, scaleBy->reverse(), nullptr);
        auto repeatScaleAction = Repeat::create(sequenceScale, 5);
        auto callbackStart = CallFunc::create(CC_CALLBACK_0(RPGSprite::destroyTouchPointer, this));
        auto sequence = Sequence::create(repeatScaleAction, callbackStart, nullptr);
        this->touchPointerNode->runAction(sequence);        
    }
}

SkeletonCharacter* RPGSprite::getMainSkeleton() {
    return this->mainSkeleton;
}

void RPGSprite::setActionTimeLine(cocostudio::timeline::ActionTimeline* timeline) {
    this->actionTimeLine = timeline;
}

cocostudio::timeline::ActionTimeline* RPGSprite::getActionTimeLine() {
    return this->actionTimeLine;
}

bool RPGSprite::onTouchBegan(Touch *touch, Event *event)
{
    auto n = this->convertTouchToNodeSpace(touch);
    Rect boundingBoxRect = Rect::ZERO;
    
    if(this->getSprite()->getBoundingBox().size.width == 0 && this->getSprite()->getBoundingBox().size.height == 0)
    {
        if(this->getSprite()->getChildren().size() == 1) {
            n = this->getSprite()->convertTouchToNodeSpace(touch);
            boundingBoxRect = this->getSprite()->getChildren().at(0)->getBoundingBox();
        }
    } else {
        boundingBoxRect = this->getSprite()->getBoundingBox();
    }
    CCLOG("boundingBoxRect.1 %f", boundingBoxRect.getMinX());
    CCLOG("boundingBoxRect.2 %f", boundingBoxRect.getMaxX());
    CCLOG("boundingBoxRect.3 %f", boundingBoxRect.getMinY());
    CCLOG("boundingBoxRect.4 %f", boundingBoxRect.getMaxY());
    CCLOG("boundingBoxRect.containsPoint(n) %d", boundingBoxRect.containsPoint(n));
    if(this->getSprite()->isVisible() && this->getInterAct() == "true" && this->getVicinityToMainCharacter() == true && boundingBoxRect.containsPoint(n)) {

        return true;
    }
    
    return false;
}

void RPGSprite::touchEnded(Touch *touch, Event *event)
{
    std::string s(!this->getKey().empty() ? this->getKey() : this->getName());
    EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_MESSAGE_ON_TAP_NOTIFICATION, static_cast<void*>(&s));
    if(this->touchPointerNode != NULL) {
        this->touchPointerNode->setVisible(false);
    }
    

}