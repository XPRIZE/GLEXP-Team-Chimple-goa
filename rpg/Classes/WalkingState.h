//
//  WalkingState.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 26/06/16.
//
//

#ifndef WalkingState_h
#define WalkingState_h

class WalkingState :  public State {
    
public:
    WalkingState() {};
    ~WalkingState() {};
    
        
    void enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand)  {
        CCLOG("%s", "Enter Walking State");
        assert (this->getTarget() != NULL);
        assert (this->getTarget()->getSkeletonNode() != NULL);
        assert (this->getTarget()->getSkeletonActionTimeLine() != NULL);
        
        this->getTarget()->getSkeletonNode()->getPhysicsBody()->setVelocity(forceVector);

        //start walking animation        
        this->getTarget()->getSkeletonActionTimeLine()->play("walk", true);
    }
    
    void exit()  {
        CCLOG("%s", "Exit Walking State");
        this->getTarget()->isWalking = false;
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
        return this->characterState;
    }
    
};

#endif /* WalkingState_h */
