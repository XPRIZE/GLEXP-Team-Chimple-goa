//
//  StateMachine.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 25/06/16.
//
//

#include "RPGConfig.h"
#include "State.h"
#include <unordered_map>

#ifndef StateMachine_h
#define StateMachine_h


class StateMachine {
public:
    
    static StateMachine* getInstance();
    ~StateMachine();
    
    virtual void setInitialState(SkeletonCharacterState initialState);
    virtual void addState(SkeletonCharacterState characterState, SkeletonCharacter* target);
    virtual void handleInput(SkeletonCharacterState characterState, const cocos2d::Vec2 forceVector, const std::map<std::string, std::string>& the_map = std::map<std::string, std::string>());
    virtual State* getCurrentState();
    
    
protected:
    std::unordered_map<std::string, State*> states;
    State* currentState;
    
private:
    StateMachine();
    static bool instanceFlag;
    static StateMachine *single;
    
};

#endif /* StateMachine_h */
