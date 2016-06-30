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
    
    void enter(cocos2d::Vec2 forceVector, const std::map<std::string, std::string>& the_map = std::map<std::string, std::string>())  {
        CCLOG("%s", "Enter Standing State on object");
        assert (this->getTarget() != NULL);
        assert (this->getTarget()->getSkeletonNode() != NULL);
        
        this->getTarget()->getSkeletonNode()->getPhysicsBody()->resetForces();
        this->getTarget()->getSkeletonNode()->getPhysicsBody()->setVelocity(cocos2d::Vec2(0,0));
        
        this->getTarget()->isWalking = false;
        this->getTarget()->isRunning = false;

        //start animation
      
        assert (this->getTarget()->getSkeletonActionTimeLine() != NULL);
        
        if (!the_map.empty()) {
            for (std::map<std::string,std::string>::const_iterator it=the_map.begin(); it!=the_map.end(); ++it) {
                this->getTarget()->getSkeletonActionTimeLine()->play(it->first, false);
                this->getTarget()->getSkeletonActionTimeLine()->setLastFrameCallFunc([=](){
                    this->getTarget()->getSkeletonActionTimeLine()->clearLastFrameCallFunc();
                    this->getTarget()->getSkeletonActionTimeLine()->play(it->second, true);
                });
            }
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
                
        };
        
        return command;
    }
    
    SkeletonCharacterState getState()  {
        return characterState;
    }    
};




#endif /* StandingState_h */
