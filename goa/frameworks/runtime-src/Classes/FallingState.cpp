//
//  FallingState.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 11/07/16.
//
//

#include "FallingState.h"

FallingState::FallingState() {};
FallingState::~FallingState() {};


void FallingState::enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand)  {
    CCLOG("%s", "Enter Falling State on object");
    assert (this->getTarget() != NULL);
    assert (this->getTarget()->getSkeletonNode() != NULL);
    this->getTarget()->isFalling = true;
    this->getTarget()->isWalking = false;
    this->getTarget()->isRunning = false;
    this->getTarget()->isJumpingAttemptedWhileDragging = false;
    //start animation
    
    assert (this->getTarget()->getSkeletonActionTimeLine() != NULL);
    this->getTarget()->changeSkinForMouthBone("mouth", "mouth", "hero/mouth/o.png");
    this->getTarget()->getSkeletonActionTimeLine()->play(JUMP_END, false);
}

void FallingState::exit()  {
    CCLOG("%s", "Exit Falling State");
    this->getTarget()->isFalling = false;
    CCLOG("pausing all animation on node in falling");
    this->getTarget()->getSkeletonActionTimeLine()->pause();
}

SkeletonCharacterState FallingState::handleInput(SkeletonCharacterState command)  {
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

SkeletonCharacterState FallingState::getState()  {
    return this->characterState;
}
