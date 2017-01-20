//
//  FallingState.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 29/06/16.
//
//

#include <stdio.h>
#include "State.h"
#include "StateMachine.h"
#include "../character/SkeletonCharacter.h"

#ifndef FallingState_h
#define FallingState_h

class FallingState :  public State {
    
public:
    FallingState();
    ~FallingState();
    
    virtual void enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand);
    
    virtual void exit();
    
    virtual SkeletonCharacterState handleInput(SkeletonCharacterState command);
    
    virtual SkeletonCharacterState getState();
};

#endif /* FallingState_h */
