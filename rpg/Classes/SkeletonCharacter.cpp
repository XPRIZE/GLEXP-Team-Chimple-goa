//
//  SkeletonCharacter.cpp
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 24/06/16.
//
//

#include <stdio.h>
#include "RPGConfig.h"
#include "HelloWorldScene.h"
#include "SkeletonCharacter.h"

USING_NS_CC;

SkeletonCharacter::SkeletonCharacter()
{
    this->skeletonNode = NULL;
    this->isWalking = false;
    this->isRunning = false;
    this->isJumpingUp = false;
    this->isJumping = false;
}

SkeletonCharacter::~SkeletonCharacter()
{
    this->skeletonNode->release();
    delete stateMachine;
}

void SkeletonCharacter::setStateMachine(StateMachine* stateMachine) {
    this->stateMachine = stateMachine;
}


void SkeletonCharacter::playStartingJumpUpAnimation(std::function<void ()> func) {
    this->getSkeletonActionTimeLine()->setAnimationEndCallFunc("starting_jump", func);
    this->getSkeletonActionTimeLine()->play("starting_jump", false);
}


void SkeletonCharacter::playJumpingUpEndingAnimation(std::function<void ()> func) {
    this->getSkeletonActionTimeLine()->setAnimationEndCallFunc("jumpmid", func);
    this->getSkeletonActionTimeLine()->play("jumpmid", false);
}

StateMachine* SkeletonCharacter::getStateMachine() {
    return this->stateMachine;
}

void SkeletonCharacter::HandleJumpDownStartingAnimation() {
//    this->isJumpingUp = false;
//    this->getSkeletonActionTimeLine()->play("jumpdownair", false);
}


void SkeletonCharacter::HandlePostJumpDownEndingAnimation() {
                    this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
                    CCLOG("Contact began with ground");
//                    this->skeletonNode->getPhysicsBody()->resetForces();
//                    this->skeletonNode->getPhysicsBody()->setVelocity(Vec2(0,0));
                    this->isRunning = false;
                    this->isWalking = false;

}

void SkeletonCharacter::createSkeletonNode(const std::string& filename) {
    //get Origin and VisibleSize
    
    //create Skeleton
    this->skeletonNode = (cocostudio::timeline::SkeletonNode*) CSLoader::createNode(filename);
    this->skeletonActionTime = (cocostudio::timeline::ActionTimeline*) CSLoader::createTimeline(filename);
    this->skeletonNode->runAction(this->skeletonActionTime);
    this->skeletonActionTime->gotoFrameAndPause(0);
    
    //attach skins
    auto bone = this->skeletonNode->getBoneNode("body");
    bone->displaySkin("watchman_shirt", false);
    
    //position skeleton
    //skeletonNode->setPosition(Vec2(origin.x + visibleSize.width/2, origin.y + visibleSize.height/2));
    
    //game_world->addChild(skeletonNode);
    
    //create Physics body
    auto physicsBody = PhysicsBody::createBox(this->skeletonNode->getBoundingBox().size, PHYSICSBODY_MATERIAL_DEFAULT, Vec2(0,this->skeletonNode->getBoundingBox().size.height/2));
    
    //set as dynamic
    physicsBody->setDynamic(DYNAMIC_BODY);
    physicsBody->setMass(1.0f);
    
    this->skeletonNode->setPhysicsBody(physicsBody);
    this->skeletonNode->getPhysicsBody()->setRotationEnable(false);
    this->skeletonNode->getPhysicsBody()->setCollisionBitmask(MAIN_CHARACTER_MASS_COLLISION_MASK);
    this->skeletonNode->getPhysicsBody()->setCategoryBitmask(MAIN_CHARACTER_MASS_CATEGORY_MASK);
    this->skeletonNode->getPhysicsBody()->setContactTestBitmask(MAIN_CHARACTER_MASS_CONTACT_MASK);
    this->skeletonNode->getPhysicsBody()->setLinearDamping(0.05f);
    //        skeletonNode->getPhysicsBody()->setAngularDamping(0.05f);
    this->skeletonNode->setScale(0.3f);
    //auto followAction = Follow::create(skeletonNode, Rect(0,0,10240, 1800));
    //game_world->runAction(followAction);
    
    auto contactListener = EventListenerPhysicsContact::create();
    contactListener->onContactBegin = [=](PhysicsContact &contact) -> bool
    {
        // We we handle what happen when character collide with something else
        // if we return true, we say: collision happen please. => Top-Down Char Jump
        // otherwise, we say the engine to ignore this collision => Bottom-Up Char Jump
//        auto nodeA = contact.getShapeA()->getBody()->getNode();
//        auto nodeB = contact.getShapeB()->getBody()->getNode();
        this->setSkeletonInContactWithGround(true);
        if(this->stateMachine != NULL && this->stateMachine->getCurrentState() != NULL)
        {
            if(this->stateMachine->getCurrentState()->getState() == S_JUMPING_STATE)
            {
                //made contact with ground - assumption this point
                
                std::function<void(void)> jumpEndingAnimation = std::bind(&SkeletonCharacter::HandlePostJumpDownEndingAnimation, this);
                
                this->getSkeletonActionTimeLine()->setAnimationEndCallFunc("jumptonormal", jumpEndingAnimation);
                this->getSkeletonActionTimeLine()->play("jumptonormal", false);
                
                this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
                CCLOG("Contact began with ground");
//                this->skeletonNode->getPhysicsBody()->resetForces();
//                this->skeletonNode->getPhysicsBody()->setVelocity(Vec2(0,0));
//                this->isRunning = false;
//                this->isWalking = false;
            }
        }

        return true;
    };
    
    contactListener->onContactSeparate = [=](PhysicsContact &contact) -> bool
    {
        // We we handle what happen when character collide with something else
        // if we return true, we say: collision happen please. => Top-Down Char Jump
        // otherwise, we say the engine to ignore this collision => Bottom-Up Char Jump
//        auto nodeA = contact.getShapeA()->getBody()->getNode();
//        auto nodeB = contact.getShapeB()->getBody()->getNode();
        
        this->setSkeletonInContactWithGround(false);
        
        if(this->stateMachine != NULL && this->stateMachine->getCurrentState() != NULL)
        {}
        
        return true;
    };

    
    Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(contactListener, this->skeletonNode);
    
    
    this->skeletonNode->retain();
}

cocostudio::timeline::SkeletonNode* SkeletonCharacter::getSkeletonNode() {
    return this->skeletonNode;
}

cocostudio::timeline::ActionTimeline* SkeletonCharacter::getSkeletonActionTimeLine() {
    return this->skeletonActionTime;
}


bool SkeletonCharacter::getSkeletonInContactWithGround() {
    return this->skeletonInContactWithGround;
}

void SkeletonCharacter::setSkeletonInContactWithGround(bool skeletonInContactWithGround) {
    this->skeletonInContactWithGround = skeletonInContactWithGround;
}
