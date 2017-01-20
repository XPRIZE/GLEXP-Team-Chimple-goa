//
//  StateMachine.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 25/06/16.
//
//

#include <unordered_map>
#include "../RPGConfig.h"
#include "State.h"

#ifndef StateMachine_h
#define StateMachine_h


class StateMachine {
public:
    
    static StateMachine* getInstance();
    ~StateMachine();
    
    virtual void setInitialState(SkeletonCharacterState initialState);
    virtual void addState(SkeletonCharacterState characterState, SkeletonCharacter* target);
    virtual void handleInput(SkeletonCharacterState characterState, const cocos2d::Vec2 forceVector);
    virtual State* getCurrentState();
    
    inline const char* enumToString(SkeletonCharacterState v)
    {
        switch (v)
        {
            case S_STANDING_STATE:  return "Standing";
            case S_WALKING_STATE:   return "Walking";
            case S_RUNNING_STATE:   return "Running";
            case S_JUMPING_STATE:   return "Jumping";
            case S_FALLING_STATE:   return "Falling";
            case S_NONE_STATE:      return "None";
            default:                return "None";
        }
    }

    
protected:
    std::unordered_map<std::string, State*> states;
    State* currentState;
    
private:
    StateMachine();    
    static StateMachine *single;
    static bool instanceFlag;
};

#endif /* StateMachine_h */
