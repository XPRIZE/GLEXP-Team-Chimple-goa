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
#include "storage/local-storage/LocalStorage.h"

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
actionTimeLine(NULL),
sprite(NULL),
eventProcessed(false)
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
    
    
    return true;

}

void RPGSprite::onEnterTransitionDidFinish() {
    Node::onEnterTransitionDidFinish();
    
    auto listenerTouches = EventListenerTouchOneByOne::create();
    listenerTouches->setSwallowTouches(true);
    listenerTouches->onTouchBegan = CC_CALLBACK_2(RPGSprite::onTouchBegan, this);
    listenerTouches->onTouchEnded = CC_CALLBACK_2(RPGSprite::touchEnded, this);
    this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listenerTouches, this);
    
    this->getEventDispatcher()->addCustomEventListener(RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, CC_CALLBACK_1(RPGSprite::checkVicinityWithMainCharacter, this));
    
    
    this->scheduleUpdate();

}

void RPGSprite::checkVicinityWithMainCharacter(cocos2d::EventCustom * event) {
    this->mainSkeleton = static_cast<SkeletonCharacter*>(event->getUserData());
    this->checkVicinityToMainSkeleton(this->mainSkeleton);
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
        if(this->getSprite() == NULL) {
            return;
        }
        Vec2 point = Vec2(skeletonCharacter->getSkeletonNode()->getPosition().x, skeletonCharacter->getSkeletonNode()->getPosition().y);
        Vec2 mainSkeletonPositionFromBottom = point;
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
        if(this->touchPointerNode)
        {
            this->touchPointerNode->setScale(1.0f, 1.0f);
            float xPos = 0.0f;
            float yPos = 0.0f;
            
            if(this->sprite->getAnchorPoint().x == 0) {
                xPos = this->sprite->getPosition().x + this->sprite->getBoundingBox().size.width/2;
            } else if(this->sprite->getAnchorPoint().x == 1) {
                xPos = this->sprite->getPosition().x - this->sprite->getBoundingBox().size.width/2;
            } else {
                xPos = this->sprite->getPosition().x;
            }
            
            if(this->sprite->getAnchorPoint().y == 0) {
                yPos = this->sprite->getPosition().y + this->sprite->getBoundingBox().size.height/2;
            } else if(this->sprite->getAnchorPoint().y == 1) {
                yPos = this->sprite->getPosition().y - this->sprite->getBoundingBox().size.height/2;
            } else {
                yPos = this->sprite->getPosition().y;
            }
            
            this->touchPointerNode->setPosition(Vec2(xPos, yPos));
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
    CCLOG("this->getSprite()->getName() %s", this->getSprite()->getName().c_str());
    Rect boundingBoxRect = Rect::ZERO;
    
    if(this->getSprite()->getBoundingBox().size.width == 0 && this->getSprite()->getBoundingBox().size.height == 0)
    {
        if(this->getSprite()->getChildren().size() >= 1) {
            n = this->getSprite()->convertTouchToNodeSpace(touch);
            boundingBoxRect = this->getSprite()->getChildren().at(0)->getBoundingBox();
        }
    } else {
        boundingBoxRect = this->getSprite()->getBoundingBox();
        if(this->getSprite()->getName().compare("cookies") == 0) {
            boundingBoxRect = Rect(this->getSprite()->getBoundingBox().origin.x, this->getSprite()->getBoundingBox().origin.y, this->getSprite()->getBoundingBox().size.width * 2, this->getSprite()->getBoundingBox().size.height * 2);
        }
        
    }
    
    
    if(this->getSprite()->isVisible() && this->getInterAct() == "true" && this->getVicinityToMainCharacter() == true && boundingBoxRect.containsPoint(n)) {

        if(getEventProcessed()) {
            return false;
        } else {
            return true;
        }

//        return true;
    }
    return false;
}

void RPGSprite::touchEnded(Touch *touch, Event *event)
{
    setEventProcessed(true);
    std::string s(!this->getKey().empty() ? this->getKey() : this->getName());
    EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_MESSAGE_ON_TAP_NOTIFICATION, static_cast<void*>(&s));
    if(this->touchPointerNode != NULL) {
        this->touchPointerNode->setVisible(false);
    }
    

}
