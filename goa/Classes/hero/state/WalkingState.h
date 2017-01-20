//
//  WalkingState.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 26/06/16.
//
//

#include <stdio.h>
#include "State.h"
#include "StateMachine.h"
#include "../character/SkeletonCharacter.h"


#ifndef WalkingState_h
#define WalkingState_h

class WalkingState :  public State {
    
public:
    WalkingState();
    ~WalkingState();
    
        
    virtual void enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand);
    
    void exit();
    
    SkeletonCharacterState handleInput(SkeletonCharacterState command);
    
    SkeletonCharacterState getState();
};

#endif /* WalkingState_h */
