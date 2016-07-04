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
    this->isJumpingAttemptedWhileDragging = false;
    this->isPlayingContinousRotationWhileJumping = false;
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
    this->getSkeletonActionTimeLine()->setAnimationEndCallFunc(JUMP_START, func);
    this->getSkeletonActionTimeLine()->play(JUMP_START, false);
}


void SkeletonCharacter::playStartingJumpUpWithRotationAnimation(std::function<void ()> func) {
    this->getSkeletonActionTimeLine()->setAnimationEndCallFunc(JUMP_START, func);
    this->getSkeletonActionTimeLine()->play(JUMP_START, false);
}


void SkeletonCharacter::playJumpingUpEndingAnimation() {    
    this->getSkeletonActionTimeLine()->play(JUMP_MID, false);
}


void SkeletonCharacter::playJumpingContinuousRotationAnimation() {
    this->getSkeletonActionTimeLine()->play(ROTATE_SKELETON, false);
}

StateMachine* SkeletonCharacter::getStateMachine() {
    return this->stateMachine;
}


void SkeletonCharacter::HandlePostJumpDownEndingAnimation() {
                    this->getSkeletonActionTimeLine()->clearFrameEventCallFunc();
                    this->getSkeletonActionTimeLine()->setTimeSpeed(1.0f);
                    this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
                    this->isRunning = false;
                    this->isWalking = false;
}


bool SkeletonCharacter::didSkeletonContactBeginDuringJumpingUp(PhysicsContact &contact, SkeletonCharacterState currentStateCommand) {
    cocos2d::Node* nodeA = contact.getShapeA()->getBody()->getNode();
    cocos2d::Node* nodeB = contact.getShapeB()->getBody()->getNode();
    if((nodeA->getName() == HUMAN_SKELETON_NAME && contact.getShapeA()->getBody()->getVelocity().y > -GRAVITY_VELOCITY_TO_STICK_TO_GROUND) ||
       (nodeB->getName() == HUMAN_SKELETON_NAME && contact.getShapeB()->getBody()->getVelocity().y > -GRAVITY_VELOCITY_TO_STICK_TO_GROUND))
    {
        return true;
    }
    
    CCLOG("Shape A category bit %d", contact.getShapeA()->getCategoryBitmask());
    CCLOG("Shape B category bit %d", contact.getShapeB()->getCategoryBitmask());
    

    if((nodeA->getName() == HUMAN_SKELETON_NAME && (currentStateCommand == S_WALKING_STATE || currentStateCommand == S_RUNNING_STATE)))
    {
        if(contact.getShapeA()->getCategoryBitmask() == MAIN_CHARACTER_MASS_CATEGORY_MASK && contact.getShapeB()->getCategoryBitmask() == 3) {
            return false;
        }
        CCLOG("CONTACT BEGin check on State Command =>  %d", currentStateCommand);
        return true;
    }
    
    
    if((nodeB->getName() == HUMAN_SKELETON_NAME && (currentStateCommand == S_WALKING_STATE || currentStateCommand == S_RUNNING_STATE)))
    {
        if(contact.getShapeB()->getCategoryBitmask() == MAIN_CHARACTER_MASS_CATEGORY_MASK && contact.getShapeA()->getCategoryBitmask() == 3) {
            return false;
        }
        
        CCLOG("CONTACT BEGin check on State Command =>  %d", currentStateCommand);
        return true;
    }


    return false;
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
    
    
    //create Physics body
    
    //auto physicsBody = PhysicsBody::createBox(this->skeletonNode->getBoundingBox().size, PHYSICSBODY_MATERIAL_DEFAULT, Vec2(0,this->skeletonNode->getBoundingBox().size.height/2));
        
    
    auto physicsBody = PhysicsBody::createBox(Size(HUMAN_SKELETON_COLLISION_BOX_WIDTH, this->skeletonNode->getBoundingBox().size.height), PhysicsMaterial(0.1f, 0.0f, 1.0f), Vec2(0,this->skeletonNode->getBoundingBox().size.height/2));
    
    //set as dynamic
    physicsBody->setDynamic(DYNAMIC_BODY);
    physicsBody->setMass(MAIN_CHARACTER_MASS);    
    
    this->skeletonNode->setPhysicsBody(physicsBody);
    this->skeletonNode->getPhysicsBody()->setRotationEnable(false);
    this->skeletonNode->getPhysicsBody()->setCollisionBitmask(MAIN_CHARACTER_MASS_COLLISION_MASK);
    this->skeletonNode->getPhysicsBody()->setCategoryBitmask(MAIN_CHARACTER_MASS_CATEGORY_MASK);
    this->skeletonNode->getPhysicsBody()->setContactTestBitmask(MAIN_CHARACTER_MASS_CONTACT_MASK);
    this->skeletonNode->getPhysicsBody()->setLinearDamping(MAIN_CHARACTER_MASS_DAMPING);
    
    this->skeletonNode->setScale(MAIN_CHARACTER_SCALE);
    
    auto contactListener = EventListenerPhysicsContact::create();
    contactListener->onContactBegin = [=](PhysicsContact &contact) -> bool
    {
        // We we handle what happen when character collide with something else
        // if we return true, we say: collision happen please. => Top-Down Char Jump
        // otherwise, we say the engine to ignore this collision => Bottom-Up Char Jump
        CCLOG("contact BEGAN!!! %d", this->stateMachine->getCurrentState()->getState());
//        cocos2d::Node* nodeA = contact.getShapeA()->getBody()->getNode();
//        cocos2d::Node* nodeB = contact.getShapeB()->getBody()->getNode();
//        
        
        if(this->didSkeletonContactBeginDuringJumpingUp(contact, this->stateMachine->getCurrentState()->getState())) {
            return false;
        }
        
        if(this->stateMachine != NULL && this->stateMachine->getCurrentState() != NULL)
        {
            if(this->stateMachine->getCurrentState()->getState() == S_JUMPING_STATE)
            {
                //made contact with ground - assumption this point
                
                if(this->isJumpingAttemptedWhileDragging && this->isPlayingContinousRotationWhileJumping) {
                    CCLOG("%s", "contact began after jump => while dragging");
                    
//                    this->getSkeletonActionTimeLine()->setTimeSpeed(2.0f);
//                    std::function<void(void)> jumpEndingAnimation = std::bind(&SkeletonCharacter::HandlePostJumpDownEndingAnimation, this);
//                    
//                    this->getSkeletonActionTimeLine()->setAnimationEndCallFunc(ROTATE_SKELETON, jumpEndingAnimation);

                    this->getSkeletonActionTimeLine()->play(ROTATE_SKELETON, false);                    
                    
                    this->isPlayingContinousRotationWhileJumping = false;
                    
                    this->stateMachine->handleInput(S_STANDING_STATE, cocos2d::Vec2(0,0));
                    this->isRunning = false;
                    this->isWalking = false;
                    
                    
                } else {
                    CCLOG("%s", "contact began after jump => NOOOOOOO dragging");
                    
                    std::function<void(void)> jumpEndingAnimation = std::bind(&SkeletonCharacter::HandlePostJumpDownEndingAnimation, this);
                    
                            this->getSkeletonActionTimeLine()->setAnimationEndCallFunc(JUMP_END, jumpEndingAnimation);
                            this->getSkeletonActionTimeLine()->play(JUMP_END, false);

                }
                
            }
        }
        


        return true;
    };
    
    
    contactListener->onContactPreSolve = [=](PhysicsContact &contact, PhysicsContactPreSolve& solve) -> bool
    {
        solve.setRestitution(0); //stop bounce
        return true;
    };
    
    contactListener->onContactSeparate = [=](PhysicsContact &contact) -> bool
    {
        // We we handle what happen when character collide with something else
        // if we return true, we say: collision happen please. => Top-Down Char Jump
        // otherwise, we say the engine to ignore this collision => Bottom-Up Char Jump
        auto nodeA = contact.getShapeA()->getBody()->getNode();
        auto nodeB = contact.getShapeB()->getBody()->getNode();
        CCLOG("velocity before falling %f", this->getSkeletonNode()->getPhysicsBody()->getVelocity().y);
        CCLOG("%s", "contact ENDED!!!");
        
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
    
    if(this->getSkeletonNode()->getPhysicsBody()->getVelocity().y < GRAVITY_VELOCITY_TO_STICK_TO_GROUND ||
       this->getSkeletonNode()->getPhysicsBody()->getVelocity().y > -GRAVITY_VELOCITY_TO_STICK_TO_GROUND)
    {
        return false;
    } else {
        return true;
    }
}
