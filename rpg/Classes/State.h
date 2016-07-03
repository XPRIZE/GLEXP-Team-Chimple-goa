//
//  State.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 25/06/16.
//
//

class StateMachine;
class SkeletonCharacter;

#ifndef State_h
#define State_h


class State {

public:
    
    State() {
        
    };
    
    ~State() {};
    
    SkeletonCharacter* getTarget() {
        return this->skeletonNode;
    }
    

    void setTarget(SkeletonCharacterState state, SkeletonCharacter*  target) {
        this->characterState = state;
        this->skeletonNode = target;

    }
    
    virtual void enter(cocos2d::Vec2 forceVector, SkeletonCharacterState previousStateCommand) = 0;
    
    virtual void exit() = 0;
    
    virtual SkeletonCharacterState handleInput(SkeletonCharacterState command) = 0;
    
    void setStateMachine(StateMachine* stateMachine) {
        this->stateMachine = stateMachine;
    }
    
    virtual SkeletonCharacterState getState() = 0;
    
    StateMachine* getStateMachine() {
        return this->stateMachine;
    }
    
protected:
    SkeletonCharacterState characterState;
    StateMachine* stateMachine;
    SkeletonCharacter* skeletonNode;    
};

#endif /* State_h */
