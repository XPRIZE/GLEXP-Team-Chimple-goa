//
//  State.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 25/06/16.
//
//

#include <stdio.h>
#include "../RPGConfig.h"

class StateMachine;
class SkeletonCharacter;

#ifndef State_h
#define State_h


class State {

public:
    
    State();
    
    ~State();
    
    virtual SkeletonCharacter* getTarget();

    virtual void setTarget(SkeletonCharacterState state, SkeletonCharacter*  target);
    
    virtual void enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand) = 0;
    
    virtual void exit() = 0;
    
    virtual SkeletonCharacterState handleInput(SkeletonCharacterState command) = 0;
    
    virtual void setStateMachine(StateMachine* stateMachine);
    
    virtual SkeletonCharacterState getState() = 0;
    
    virtual StateMachine* getStateMachine();
    
protected:
    SkeletonCharacterState characterState;
    StateMachine* stateMachine;
    SkeletonCharacter* skeletonNode;    
};

#endif /* State_h */
