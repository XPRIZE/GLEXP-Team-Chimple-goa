//
//  RunningState.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 26/06/16.
//
//

#ifndef RunningState_h
#define RunningState_h

class RunningState :  public State {
    
public:
    RunningState() {};
    ~RunningState() {};
    
    
    
    void enter(cocos2d::Vec2 forceVector, const std::map<std::string, std::string>& the_map = std::map<std::string, std::string>())  {
        CCLOG("%s", "Enter Running State");
        assert (this->getTarget() != NULL);
        assert (this->getTarget()->getSkeletonNode() != NULL);
        assert (this->getTarget()->getSkeletonActionTimeLine() != NULL);
        
        this->getTarget()->getSkeletonNode()->getPhysicsBody()->setVelocity(forceVector);
        
        this->getTarget()->getSkeletonActionTimeLine()->play("run", true);
    }
    
    void exit()  {
        CCLOG("%s", "Exit Running State");
        this->getTarget()->isRunning = false;
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

#endif /* RunningState_h */
