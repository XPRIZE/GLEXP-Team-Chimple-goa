//
//  StandingState.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 11/07/16.
//
//

#include <stdio.h>
#include "StandingState.h"

StandingState::StandingState() {};
StandingState::~StandingState() {};

void StandingState::enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand)  {
    CCLOG("%s", "Enter Standing State on object");
    assert (this->getTarget() != NULL);
    assert (this->getTarget()->getSkeletonNode() != NULL);
    
    this->getTarget()->getSkeletonNode()->getPhysicsBody()->resetForces();
    this->getTarget()->getSkeletonNode()->getPhysicsBody()->setVelocity(cocos2d::Vec2(0,0));
    
    this->getTarget()->isWalking = false;
    this->getTarget()->isRunning = false;
    this->getTarget()->isJumpingAttemptedWhileDragging = false;
    this->getTarget()->isJumping = false;
    this->getTarget()->isStanding = true;
    
    //NOTIFY
    
    cocos2d::Director::getInstance()->getEventDispatcher()->dispatchCustomEvent( RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, this->getTarget());
    
    //start animation
    
    assert (this->getTarget()->getSkeletonActionTimeLine() != NULL);
    
    if(previousStateCommand == S_RUNNING_STATE)
    {
        this->getTarget()->getSkeletonActionTimeLine()->setLastFrameCallFunc([=]() {            
            if(this->getTarget()->getSkeletonActionTimeLine() && this->getTarget()->isStanding) {
                this->getTarget()->getSkeletonActionTimeLine()->play(IDLE, true);
            }
            this->getTarget()->getSkeletonActionTimeLine()->clearLastFrameCallFunc();
        });
        
        
        this->getTarget()->getSkeletonActionTimeLine()->play(BREAK_ANIM, false);
        
    } else {
        this->getTarget()->getSkeletonActionTimeLine()->play(IDLE, true);
    }
    
    this->getTarget()->changeSkinForMouthBone("mouth", "mouth","hero/mouth/normal.png");
    this->getTarget()->getSkeletonActionTimeLine()->setTimeSpeed(1.0f);
    
    cocos2d::Director::getInstance()->getEventDispatcher()->dispatchCustomEvent(RPGConfig::WORD_BUBBLE_SHOW_NOTIFICATION);
    
}

void StandingState::exit()  {
    CCLOG("%s", "Exit Standing State");
    this->getTarget()->isStanding = false;
    CCLOG("pausing all animation on node in standing");
    this->getTarget()->getSkeletonActionTimeLine()->pause();
    cocos2d::Director::getInstance()->getEventDispatcher()->dispatchCustomEvent(RPGConfig::WORD_BUBBLE_HIDE_NOTIFICATION);
}

SkeletonCharacterState StandingState::handleInput(SkeletonCharacterState command)  {
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

SkeletonCharacterState StandingState::getState()  {
    return characterState;
}
