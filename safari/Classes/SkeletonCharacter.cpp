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

SkeletonCharacter* SkeletonCharacter::create(const std::string& filename) {
    auto skeletonCharacter = new SkeletonCharacter();
    if (skeletonCharacter && skeletonCharacter->initializeSkeletonCharacter(filename)) {
        skeletonCharacter->autorelease();
        return skeletonCharacter;
    }
    CC_SAFE_DELETE(skeletonCharacter);
    return nullptr;
}

bool SkeletonCharacter::initializeSkeletonCharacter(const std::string& filename) {
    this->createSkeletonNode(filename);
    this->setName(MAIN_SKELETON_KEY);
    this->setfileName(filename);
    this->addChild(this->skeletonNode);
    
    return true;
}

SkeletonCharacter::SkeletonCharacter()
{
    this->skeletonNode = NULL;
    this->isWalking = false;
    this->isRunning = false;
    this->isJumpingUp = false;
    this->isJumping = false;
    this->isJumpingAttemptedWhileDragging = false;
    this->isPlayingContinousRotationWhileJumping = false;
    this->isFalling = false;
}

SkeletonCharacter::~SkeletonCharacter()
{
}

void SkeletonCharacter::setStateMachine(StateMachine* stateMachine) {
    this->stateMachine = stateMachine;
}


void SkeletonCharacter::playStartingJumpUpAnimation(std::function<void ()> func) {
    this->getSkeletonActionTimeLine()->setAnimationEndCallFunc(JUMP_START, func);
    this->getSkeletonActionTimeLine()->setTimeSpeed(4.0);
    this->getSkeletonActionTimeLine()->play(JUMP_START, false);
}


void SkeletonCharacter::playStartingJumpUpWithRotationAnimation(std::function<void ()> func) {
    this->getSkeletonActionTimeLine()->setAnimationEndCallFunc(JUMP_START, func);
    this->getSkeletonActionTimeLine()->setTimeSpeed(4.0);
    this->getSkeletonActionTimeLine()->play(JUMP_START, false);
}


void SkeletonCharacter::playJumpingUpEndingAnimation() {    
    this->getSkeletonActionTimeLine()->play(JUMP_MID, false);
}


void SkeletonCharacter::playJumpingContinuousRotationAnimation() {
    this->getSkeletonActionTimeLine()->play(ROTATE_SKELETON, true);
}

StateMachine* SkeletonCharacter::getStateMachine() {
    return this->stateMachine;
}

void SkeletonCharacter::HandlePostJumpDownWithDragEndingAnimation() {
    this->getSkeletonActionTimeLine()->clearFrameEventCallFunc();
    this->getSkeletonActionTimeLine()->setTimeSpeed(1.0f);
    this->stateMachine->handleInput(S_WALKING_STATE, cocos2d::Vec2(0,0));
    this->isRunning = false;
    this->isWalking = false;
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
    //auto bone = this->skeletonNode->getBoneNode("body");
    //bone->displaySkin("watchman_shirt", false);
    
    
    auto physicsBody = PhysicsBody::createBox(Size(HUMAN_SKELETON_COLLISION_BOX_WIDTH, HUMAN_SKELETON_COLLISION_BOX_WIDTH), PHYSICSBODY_MATERIAL_DEFAULT, Vec2(0,HUMAN_SKELETON_COLLISION_BOX_WIDTH/2));
    
    //set as dynamic
    physicsBody->setDynamic(DYNAMIC_BODY);
    physicsBody->setMass(MAIN_CHARACTER_MASS);    
    this->skeletonNode->setPhysicsBody(physicsBody);
    this->skeletonNode->getPhysicsBody()->setRotationEnable(false);
    this->skeletonNode->getPhysicsBody()->setCollisionBitmask(MAIN_CHARACTER_MASS_COLLISION_MASK);
    this->skeletonNode->getPhysicsBody()->setContactTestBitmask(MAIN_CHARACTER_MASS_CONTACT_MASK);
    this->skeletonNode->getPhysicsBody()->setLinearDamping(MAIN_CHARACTER_MASS_DAMPING);
    this->skeletonNode->getPhysicsBody()->setGroup(MAIN_CHARACTER_GROUP);
    
    this->skeletonNode->setScale(MAIN_CHARACTER_SCALE);    
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

void SkeletonCharacter::setSkeletonActionTimeLine(cocostudio::timeline::ActionTimeline* timeline) {
    this->skeletonActionTime = timeline;    
}


void SkeletonCharacter::changeSkinForMouthBone(std::string bone, std::string skinName) {
    cocostudio::timeline::BoneNode* mouth = this->getSkeletonNode()->getBoneNode(bone);
    
    bool isSkinExists = false;
    cocostudio::timeline::SkinNode* referenceToSkin = nullptr;
    for (std::vector<Node*>::iterator it = mouth->getSkins().begin() ; it != mouth->getSkins().end(); ++it) {
        cocostudio::timeline::SkinNode* skin = *it;
        if(skin->getName() == skinName) {
            isSkinExists = true;
            referenceToSkin = skin;
            break;
        }
    }
    
    if(!isSkinExists) {
        cocos2d::Sprite* mouthSkin = cocos2d::Sprite::createWithSpriteFrameName(skinName);
        mouthSkin->setName(skinName);
        mouthSkin->setAnchorPoint(Vec2(0,0));
        mouth->addSkin(mouthSkin, true);
        mouth->displaySkin(mouthSkin, true);
    } else {
        mouth->displaySkin(referenceToSkin, true);
    }
}


void SkeletonCharacter::configureCharacter() {
    
}