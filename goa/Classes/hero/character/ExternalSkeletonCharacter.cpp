//
//  ExternalSkeletonCharacter.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 05/07/16.
//
//

#include <stdio.h>
#include <cmath>
#include "../RPGConfig.h"
#include "ExternalSkeletonCharacter.h"
#include "SkeletonCharacter.h"


USING_NS_CC;

ExternalSkeletonCharacter::ExternalSkeletonCharacter() {
    this->externalSkeletonNode = NULL;
    this->touchPointerNode = NULL;
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
    this->posX = node->getPosition().x;
    this->posY = node->getPosition().y;
    node->removeFromParent();
    this->setName(node->getName());
    this->setAttributes(attributes);
    this->createExternalSkeletonNode(node, this->getFileName());
    this->addChild(this->externalSkeletonNode);
    this->externalSkeletonNode->setPosition(node->getPosition());
    this->showTouchPointer();
    
    return true;
}

void ExternalSkeletonCharacter::onEnterTransitionDidFinish() {
    Node::onEnterTransitionDidFinish();
    //bind listeners
    auto listenerTouches = EventListenerTouchOneByOne::create();
    
    listenerTouches->setSwallowTouches(true);
    listenerTouches->onTouchBegan = CC_CALLBACK_2(ExternalSkeletonCharacter::onTouchBegan, this);
    listenerTouches->onTouchEnded = CC_CALLBACK_2(ExternalSkeletonCharacter::touchEnded, this);
    this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listenerTouches, this);
    
}


void ExternalSkeletonCharacter::showTouchPointer() {
    if(this->touchPointerNode == NULL)
    {
        this->touchPointerNode =  Sprite::create(TOUCH_POINTER_IMG);
        if(this->touchPointerNode)
        {
            //this->touchPointerNode->setScale(0.75f, 0.75f);
//            this->touchPointerNode->setFlippedX(true);
//            this->touchPointerNode->setFlippedY(true);
            this->touchPointerNode->setPosition(Vec2(this->externalSkeletonNode->getPosition().x, this->externalSkeletonNode->getPosition().y + 100));
            this->touchPointerNode->setVisible(true);
            this->externalSkeletonNode->getParent()->addChild(this->touchPointerNode, 1);
        }
    }
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
    this->externalSkeletonActionTime->retain();
    
    if(this->externalSkeletonActionTime != NULL) {
        this->externalSkeletonNode->runAction(this->externalSkeletonActionTime);
        this->externalSkeletonActionTime->gotoFrameAndPause(0);
        if(this->externalSkeletonActionTime != NULL) {
            this->externalSkeletonActionTime->play(IDLE, true);
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


bool ExternalSkeletonCharacter::onTouchBegan(Touch *touch, Event *event)
{
    auto n = convertTouchToNodeSpace(touch);
    if(this->getInterAct() == "true" && this->getExternalSkeletonNode()->getBoundingBox().containsPoint(n)) {
        
        //check position of main character
        Node* heroNode = this->getParent()->getChildByName(HUMAN_SKELETON_NAME);
        if(heroNode != NULL) {
            SkeletonCharacter* heroSkeleton = dynamic_cast<SkeletonCharacter *>(heroNode);
            if(heroSkeleton != NULL) {
                if(heroSkeleton->getSkeletonNode()->getPosition().x > this->getExternalSkeletonNode()->getPosition().x) {
                    this->getExternalSkeletonNode()->setScaleX(-1.0);
                    heroSkeleton->getSkeletonNode()->setScaleX(1.0);
                } else {
                    this->getExternalSkeletonNode()->setScaleX(1.0);
                    heroSkeleton->getSkeletonNode()->setScaleX(-1.0);
                }
            }
        }
        return true;
    }
    return false;
}


void ExternalSkeletonCharacter::touchEnded(Touch *touch, Event *event)
{
    
    std::string s(this->getName());
    CCLOG("CLICKED ON Spekable External Skeleton dispatching speech message with Key %s", s.c_str());
    EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_MESSAGE_ON_TAP_NOTIFICATION, static_cast<void*>(&s));
}
