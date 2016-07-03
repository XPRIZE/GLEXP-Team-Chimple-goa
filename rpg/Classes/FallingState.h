//
//  FallingState.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 29/06/16.
//
//

#ifndef FallingState_h
#define FallingState_h

class FallingState :  public State {
    
public:
    FallingState() {};
    ~FallingState() {};
    
    void enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand)  {
        CCLOG("%s", "Enter Falling State on object");
        assert (this->getTarget() != NULL);
        assert (this->getTarget()->getSkeletonNode() != NULL);
        
        this->getTarget()->isWalking = false;
        this->getTarget()->isRunning = false;
        this->getTarget()->isJumpingAttemptedWhileDragging = false;
        //start animation
        
        assert (this->getTarget()->getSkeletonActionTimeLine() != NULL);
        
        this->getTarget()->getSkeletonActionTimeLine()->play("idle", true);
    }
    
    void exit()  {
        CCLOG("%s", "Exit Falling State");
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

#endif /* FallingState_h */
