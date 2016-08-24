//
//  JumpingState.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 11/07/16.
//
//


#include "JumpingState.h"

JumpingState::JumpingState() {};
JumpingState::~JumpingState() {};

void JumpingState::enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand)  {
    CCLOG("%s", "Enter Jumping State");
    
    assert (this->getTarget() != NULL);
    assert (this->getTarget()->getSkeletonNode() != NULL);
    assert (this->getTarget()->getSkeletonActionTimeLine() != NULL);
    
    
    //start Jumping Animation
    //apply impulse on target Object
    
    this->getTarget()->getSkeletonNode()->getPhysicsBody()->setVelocity(forceVector);
    
    this->getTarget()->isJumping = true;
 
    this->getTarget()->changeSkinForMouthBone("mouth", "mouth","hero/mouth/happy.png");

}

void JumpingState::exit()  {
    CCLOG("%s", "Exit Jumping State");
    this->getTarget()->isJumping = false;
    this->getTarget()->isJumpingAttemptedWhileDragging = false;
    CCLOG("pausing all animation on node in jumping");
    this->getTarget()->getSkeletonActionTimeLine()->pause();
    //this->getTarget()->getSkeletonActionTimeLine()->gotoFrameAndPause(0);
}

SkeletonCharacterState JumpingState::handleInput(SkeletonCharacterState command)  {
    switch(command) {
        case S_WALKING_STATE:
        {
            return S_WALKING_STATE;
        }
        case S_RUNNING_STATE:
        {
            return S_RUNNING_STATE;
        }
        case S_JUMPING_STATE:
        {
            return S_JUMPING_STATE;
        }
        case S_STANDING_STATE:
        {
            return S_STANDING_STATE;
        }
        case S_FALLING_STATE:
        {
            return S_FALLING_STATE;
        }
        default:
            return S_NONE_STATE;
            
    };
    
    return command;
}

SkeletonCharacterState JumpingState::getState()  {
    return characterState;
}