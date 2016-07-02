//
//  JumpingState.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 26/06/16.
//
//

#ifndef JumpingState_h
#define JumpingState_h

USING_NS_CC;

class JumpingState :  public State {
    
public:
    JumpingState() {};
    ~JumpingState() {};
        
    void enter(cocos2d::Vec2 forceVector, const std::map<std::string, std::string>& the_map = std::map<std::string, std::string>())  {
        CCLOG("%s", "Enter Jumping State");

        assert (this->getTarget() != NULL);
        assert (this->getTarget()->getSkeletonNode() != NULL);
        assert (this->getTarget()->getSkeletonActionTimeLine() != NULL);
        
        
        //start Jumping Animation
        //apply impulse on target Object
        
        this->getTarget()->getSkeletonNode()->getPhysicsBody()->setVelocity(forceVector);
        
        this->getTarget()->isJumping = true;
        
    }
    
    void exit()  {
        CCLOG("%s", "Exit Jumping State");
        this->getTarget()->isJumping = false;
        this->getTarget()->isJumpingAttemptedWhileDragging = false;
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




#endif /* JumpingState_h */
