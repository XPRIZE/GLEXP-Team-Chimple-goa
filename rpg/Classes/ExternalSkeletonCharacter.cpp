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
#include "HelloWorldScene.h"
#include "ExternalSkeletonCharacter.h"
#include "SkeletonCharacter.h"


USING_NS_CC;

ExternalSkeletonCharacter::ExternalSkeletonCharacter() {
    this->externalSkeletonNode = NULL;
    this->externalSkeletonActionTime = NULL;
    this->vicinityToMainCharacter = false;
}

ExternalSkeletonCharacter::~ExternalSkeletonCharacter() {
}


ExternalSkeletonCharacter* ExternalSkeletonCharacter::create(cocostudio::timeline::SkeletonNode* skeletonNode, std::unordered_map<std::string, std::string> attributes) {
    auto externalSkeletonCharacter = new ExternalSkeletonCharacter();
    if (externalSkeletonCharacter && externalSkeletonCharacter->initializeExternalSkeletonCharacter(skeletonNode, attributes)) {
        externalSkeletonCharacter->autorelease();
        return externalSkeletonCharacter;
    }
    CC_SAFE_DELETE(externalSkeletonCharacter);
    return nullptr;
}


bool ExternalSkeletonCharacter::initializeExternalSkeletonCharacter(cocostudio::timeline::SkeletonNode* skeletonNode, std::unordered_map<std::string, std::string> attributes) {
    this->externalSkeletonNode = skeletonNode;
    this->setAttributes(attributes);
    this->addChild(this->externalSkeletonNode);
    this->createAnimationAndPhysicsSupportForExternalSkeletonNode();
    
    auto checkVicinityWithMainCharacter = [=] (EventCustom * event) {
       SkeletonCharacter* mainSkeleton =  (SkeletonCharacter* )event->getUserData();
        if(this->checkVicinityToMainSkeleton(mainSkeleton))
        {
            this->setVicinityToMainCharacter(true);
            this->externalSkeletonActionTime->play("idle", true);
        } else {
            this->setVicinityToMainCharacter(false);
            this->externalSkeletonActionTime->play(this->getDefaultAnimationName(), true);
        }
        
    };
    
    
    ADD_VICINITY_NOTIFICATION(this, RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, checkVicinityWithMainCharacter);

    this->scheduleUpdate();
    
    return true;
}

bool ExternalSkeletonCharacter::checkVicinityToMainSkeleton(SkeletonCharacter* skeletonCharacter) {
    Vec2 mainSkeletonPosition = skeletonCharacter->getSkeletonNode()->getPosition();

    float distance = mainSkeletonPosition.getDistance(this->getExternalSkeletonNode()->getPosition());    
    
    if(distance >= -300 && distance <= 300) {
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

void ExternalSkeletonCharacter::createAnimationAndPhysicsSupportForExternalSkeletonNode() {
    
    //create Skeleton
    if(!this->getFileName().empty()) {
        this->externalSkeletonActionTime = (cocostudio::timeline::ActionTimeline*) CSLoader::createTimeline(this->getFileName());
        if(this->externalSkeletonActionTime != NULL) {
            this->externalSkeletonNode->runAction(this->externalSkeletonActionTime);
            this->externalSkeletonActionTime->gotoFrameAndPause(0);
            if(!this->getDefaultAnimationName().empty()) {
                this->externalSkeletonActionTime->play(this->getDefaultAnimationName(), true);
            }
        }
    }
    
    
    //enable physics and collisions
    
    
    auto physicsBody = PhysicsBody::createBox(Size(HUMAN_SKELETON_COLLISION_BOX_WIDTH, HUMAN_SKELETON_COLLISION_BOX_WIDTH), PHYSICSBODY_MATERIAL_DEFAULT, Vec2(0,HUMAN_SKELETON_COLLISION_BOX_WIDTH/2));
    
    //set as dynamic
    physicsBody->setDynamic(DYNAMIC_BODY);
    physicsBody->setMass(MAIN_CHARACTER_MASS);
    this->externalSkeletonNode->setName(this->getName());
    this->externalSkeletonNode->setPhysicsBody(physicsBody);
    this->externalSkeletonNode->getPhysicsBody()->setRotationEnable(false);
    this->externalSkeletonNode->getPhysicsBody()->setCollisionBitmask(MAIN_CHARACTER_MASS_CATEGORY_MASK);
    this->externalSkeletonNode->getPhysicsBody()->setCategoryBitmask(MAIN_CHARACTER_MASS_COLLISION_MASK);
    this->externalSkeletonNode->getPhysicsBody()->setContactTestBitmask(MAIN_CHARACTER_MASS_CONTACT_MASK);
    this->externalSkeletonNode->getPhysicsBody()->setLinearDamping(MAIN_CHARACTER_MASS_DAMPING);
    this->externalSkeletonNode->getPhysicsBody()->setGroup(MAIN_CHARACTER_GROUP);
    
    this->externalSkeletonNode->setScale(MAIN_CHARACTER_SCALE);
}

void ExternalSkeletonCharacter::setAttributes(std::unordered_map<std::string, std::string> attributes) {
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

}

std::unordered_map<std::string, std::string> ExternalSkeletonCharacter::getAttributes() {
    return this->attributes;
}


void ExternalSkeletonCharacter::update(float dt) {
    if(!this->vicinityToMainCharacter) {
        this->getExternalSkeletonNode()->setPosition(this->getExternalSkeletonNode()->getPosition().x + RPGConfig::externalSkeletonMoveDelta, this->getExternalSkeletonNode()->getPosition().y);
        
        cocos2d::Director::getInstance()->getEventDispatcher()->dispatchCustomEvent( RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, this);

    }    
}





