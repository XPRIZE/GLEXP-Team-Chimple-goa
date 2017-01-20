//
//  StandingState.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 25/06/16.
//
//

#include <iostream>
#include "State.h"
#include "../character/SkeletonCharacter.h"
#include "StateMachine.h"

#ifndef StandingState_h
#define StandingState_h
class StandingState :  public State {
    
public:
    StandingState();
    ~StandingState();
    
    void enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand);
    
    void exit();
    SkeletonCharacterState handleInput(SkeletonCharacterState command);
    SkeletonCharacterState getState();
    
};




#endif /* StandingState_h */
