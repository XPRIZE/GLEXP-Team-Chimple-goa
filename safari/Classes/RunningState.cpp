//
//  RunningState.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 12/07/16.
//
//

#include "RunningState.h"

RunningState::RunningState() {};
RunningState::~RunningState() {};



void RunningState::enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand)  {
    CCLOG("%s", "Enter Running State");
    assert (this->getTarget() != NULL);
    assert (this->getTarget()->getSkeletonNode() != NULL);
    assert (this->getTarget()->getSkeletonActionTimeLine() != NULL);
    
    this->getTarget()->getSkeletonNode()->getPhysicsBody()->setVelocity(forceVector);
    
    this->getTarget()->changeSkinForMouthBone("mouth", "mouth","hero/mouth/normal.png");
    this->getTarget()->getSkeletonActionTimeLine()->play(RUN, true);
    this->getTarget()->getSkeletonActionTimeLine()->setTimeSpeed(1.0f);
}

void RunningState::exit()  {
    CCLOG("%s", "Exit Running State");
    this->getTarget()->isRunning = false;
    this->getTarget()->getSkeletonActionTimeLine()->setTimeSpeed(1.0f);
}

SkeletonCharacterState RunningState::handleInput(SkeletonCharacterState command)  {
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

SkeletonCharacterState RunningState::getState()  {
    return characterState;
}

