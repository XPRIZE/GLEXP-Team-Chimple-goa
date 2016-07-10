//
//  StandingState.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 25/06/16.
//
//

#include <iostream>
#include "State.h"
#include "SkeletonCharacter.h"

#ifndef StandingState_h
#define StandingState_h
class StandingState :  public State {
    
public:
    StandingState() {};
    ~StandingState() {};
    
    void enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand)  {
        CCLOG("%s", "Enter Standing State on object");
        assert (this->getTarget() != NULL);
        assert (this->getTarget()->getSkeletonNode() != NULL);
        
        this->getTarget()->getSkeletonNode()->getPhysicsBody()->resetForces();
        this->getTarget()->getSkeletonNode()->getPhysicsBody()->setVelocity(cocos2d::Vec2(0,0));
        
        this->getTarget()->isWalking = false;
        this->getTarget()->isRunning = false;
        this->getTarget()->isJumpingAttemptedWhileDragging = false;
        this->getTarget()->isJumping = false;
        
        //NOTIFY
        
        cocos2d::Director::getInstance()->getEventDispatcher()->dispatchCustomEvent( RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION, this->getTarget());
        
        //start animation
      
        assert (this->getTarget()->getSkeletonActionTimeLine() != NULL);
        
        if(previousStateCommand == S_RUNNING_STATE)
        {
            this->getTarget()->getSkeletonActionTimeLine()->setLastFrameCallFunc([=]() {
                this->getTarget()->getSkeletonActionTimeLine()->clearLastFrameCallFunc();
                assert (this->getTarget()->getSkeletonActionTimeLine() != NULL);
                this->getTarget()->getSkeletonActionTimeLine()->play("idle", true);
            });
            
            
            this->getTarget()->getSkeletonActionTimeLine()->play("stop", false);
   
        } else {
            this->getTarget()->getSkeletonActionTimeLine()->play("idle", true);
        }        
    }
    
    void exit()  {
        CCLOG("%s", "Exit Standing State");        
    }
    
    SkeletonCharacterState handleInput(SkeletonCharacterState command)  {
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
    
    SkeletonCharacterState getState()  {
        return characterState;
    }    
};




#endif /* StandingState_h */
