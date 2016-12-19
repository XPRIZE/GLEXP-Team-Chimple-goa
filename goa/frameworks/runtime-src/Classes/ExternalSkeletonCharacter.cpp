//
//  ExternalSkeletonCharacter.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 05/07/16.
//
//

#include <stdio.h>
#include <cmath>
#include "RPGConfig.h"
#include "ExternalSkeletonCharacter.h"
#include "SkeletonCharacter.h"


USING_NS_CC;

ExternalSkeletonCharacter::ExternalSkeletonCharacter() {
    this->externalSkeletonNode = NULL;
    this->mainSkeleton = NULL;
    this->externalSkeletonActionTime = NULL;
    this->vicinityToMainCharacter = false;
}

ExternalSkeletonCharacter::~ExternalSkeletonCharacter() {
}


ExternalSkeletonCharacter* ExternalSkeletonCharacter::create(cocos2d::Node* node, std::unordered_map<std::string, std::string> attributes) {
    auto externalSkeletonCharacter = new ExternalSkeletonCharacter();
    if (externalSkeletonCharacter && externalSkeletonCharacter->initializeExternalSkeletonCharacter(node, attributes)) {
        externalSkeletonCharacter->autorelease();
        return externalSkeletonCharacter;
    }
    CC_SAFE_DELETE(externalSkeletonCharacter);
    return nullptr;
}


bool ExternalSkeletonCharacter::initializeExternalSkeletonCharacter(cocos2d::Node* node, std::unordered_map<std::string, std::string> attributes) {
    node->removeFromParent();
    this->setName(node->getName());
    this->setAttributes(attributes);
    this->createExternalSkeletonNode(node, this->getFileName());
    this->addChild(this->externalSkeletonNode);
    this->externalSkeletonNode->setPosition(node->getPosition());
    
    //bind listeners
    auto listenerTouches = EventListenerTouchOneByOne::create();
    
    listenerTouches->setSwallowTouches(true);
    listenerTouches->onTouchBegan = CC_CALLBACK_2(ExternalSkeletonCharacter::onTouchBegan, this);
    listenerTouches->onTouchEnded = CC_CALLBACK_2(ExternalSkeletonCharacter::touchEnded, this);
    this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listenerTouches, this);

    
    this->getEventDispatcher()->addCustomEventListener(RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, CC_CALLBACK_1(ExternalSkeletonCharacter::checkVicinityWithMainCharacter, this));
    

    this->scheduleUpdate();
    
    return true;
}


void ExternalSkeletonCharacter::checkVicinityWithMainCharacter(cocos2d::EventCustom * event) {
    this->mainSkeleton = static_cast<SkeletonCharacter*>(event->getUserData());
    
    if(this->checkVicinityToMainSkeleton(this->mainSkeleton))
    {
        this->setVicinityToMainCharacter(true);
        if(this->externalSkeletonActionTime != NULL) {
            this->externalSkeletonActionTime->play(IDLE, true);
        }
    } else {
        this->setVicinityToMainCharacter(false);
        if(this->externalSkeletonActionTime != NULL && !this->getDefaultAnimationName().empty()) {
            this->externalSkeletonActionTime->play(this->getDefaultAnimationName(), true);
        }
    }
   
}

bool ExternalSkeletonCharacter::checkVicinityToMainSkeleton(SkeletonCharacter* skeletonCharacter) {
    Vec2 mainSkeletonPositionBottom = Point(skeletonCharacter->getSkeletonNode()->getPosition().x, skeletonCharacter->getSkeletonNode()->getPosition().y);
    Vec2 mainSkeletonPositionTop = Point(skeletonCharacter->getSkeletonNode()->getPosition().x, skeletonCharacter->getSkeletonNode()->getPosition().y + skeletonCharacter->getSkeletonNode()->getBoundingBox().size.height);

    float distanceFromBottom = mainSkeletonPositionBottom.getDistance(this->getExternalSkeletonNode()->getPosition());
    float distanceFromTop = mainSkeletonPositionTop.getDistance(this->getExternalSkeletonNode()->getPosition());
    
    if((distanceFromTop >= -OBJECT_TAP_BOUNDING_BOX_WIDTH && distanceFromTop <= OBJECT_TAP_BOUNDING_BOX_WIDTH) || (distanceFromBottom >= -OBJECT_TAP_BOUNDING_BOX_WIDTH && distanceFromBottom <= OBJECT_TAP_BOUNDING_BOX_WIDTH)) {
        return true;
    }
    return false;    
}

cocostudio::timeline::SkeletonNode* ExternalSkeletonCharacter::getExternalSkeletonNode() {
    return this->externalSkeletonNode;
}

cocostudio::timeline::ActionTimeline* ExternalSkeletonCharacter::getExternalSkeletonActionTimeLine() {
    return this->externalSkeletonActionTime;
}

void ExternalSkeletonCharacter::createExternalSkeletonNode(cocos2d::Node* node, const std::string& filename) {
    
    node->removeFromParent();
    //create Skeleton
    this->externalSkeletonNode = (cocostudio::timeline::SkeletonNode*) CSLoader::createNode(filename);
    this->externalSkeletonActionTime = (cocostudio::timeline::ActionTimeline*) CSLoader::createTimeline(filename);
    
    if(this->externalSkeletonActionTime != NULL) {
        this->externalSkeletonNode->runAction(this->externalSkeletonActionTime);
        this->externalSkeletonActionTime->gotoFrameAndPause(0);
        if(this->externalSkeletonActionTime && !this->getDefaultAnimationName().empty()) {
            this->externalSkeletonActionTime->play(this->getDefaultAnimationName(), true);
        }
    }
    
    //enable physics and collisions
    
    
    auto physicsBody = PhysicsBody::createBox(Size(HUMAN_SKELETON_COLLISION_BOX_WIDTH, HUMAN_SKELETON_COLLISION_BOX_WIDTH), PHYSICSBODY_MATERIAL_DEFAULT, Vec2(0,HUMAN_SKELETON_COLLISION_BOX_WIDTH/2));
    
    //set as dynamic
    physicsBody->setDynamic(DYNAMIC_BODY);
    physicsBody->setMass(MAIN_CHARACTER_MASS);
    this->externalSkeletonNode->setName(node->getName());
    this->externalSkeletonNode->setPhysicsBody(physicsBody);
    this->externalSkeletonNode->getPhysicsBody()->setRotationEnable(false);
    this->externalSkeletonNode->getPhysicsBody()->setCollisionBitmask(MAIN_CHARACTER_MASS_CATEGORY_MASK);
    this->externalSkeletonNode->getPhysicsBody()->setCategoryBitmask(MAIN_CHARACTER_MASS_COLLISION_MASK);
    this->externalSkeletonNode->getPhysicsBody()->setContactTestBitmask(MAIN_CHARACTER_MASS_CONTACT_MASK);
    this->externalSkeletonNode->getPhysicsBody()->setLinearDamping(MAIN_CHARACTER_MASS_DAMPING);
    this->externalSkeletonNode->getPhysicsBody()->setGroup(MAIN_CHARACTER_GROUP);
    
    this->externalSkeletonNode->setScale(EXTERNAL_CHARACTER_SCALE);
}

void ExternalSkeletonCharacter::setAttributes(std::unordered_map<std::string, std::string> attributes) {
    this->attributes = attributes;
    //process it
    
    std::unordered_map<std::string,std::string>::const_iterator it = this->attributes.find("fileName");
    if ( it != this->attributes.end() ) {
        this->setFileName(it->second);
    }
    
    it = this->attributes.find("animation");
    if ( it != this->attributes.end() ) {
        this->setDefaultAnimationName(it->second);
    }
    
    it = this->attributes.find("canInteract");
    if ( it != this->attributes.end() ) {
        this->setInterAct(it->second);
    }

}

std::unordered_map<std::string, std::string> ExternalSkeletonCharacter::getAttributes() {
    return this->attributes;
}


void ExternalSkeletonCharacter::update(float dt) {
    if(!this->vicinityToMainCharacter && this->mainSkeleton != NULL) {
        this->getExternalSkeletonNode()->setPosition(this->getExternalSkeletonNode()->getPosition().x + RPGConfig::externalSkeletonMoveDelta, this->getExternalSkeletonNode()->getPosition().y);
        
        cocos2d::Director::getInstance()->getEventDispatcher()->dispatchCustomEvent( RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, this->mainSkeleton);

    }    
}



bool ExternalSkeletonCharacter::onTouchBegan(Touch *touch, Event *event)
{
    auto n = convertTouchToNodeSpace(touch);
    if(this->getInterAct() == "true" && this->getExternalSkeletonNode()->getBoundingBox().containsPoint(n)) {
        return true;
    }
    return false;
}


void ExternalSkeletonCharacter::touchEnded(Touch *touch, Event *event)
{
    CCLOG("%s", "CLICKED ON Spekable External Skeleton dispatching speech message");
    std::string s(this->getName());
    EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_MESSAGE_ON_TAP_NOTIFICATION, static_cast<void*>(&s));
}
