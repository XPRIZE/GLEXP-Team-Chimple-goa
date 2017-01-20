//
//  State.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 11/07/16.
//
//

#include "State.h"
#include "../character/SkeletonCharacter.h"

State::State() {};

State::~State() {};

SkeletonCharacter* State::getTarget() {
    return this->skeletonNode;
}

void State::setTarget(SkeletonCharacterState state, SkeletonCharacter*  target) {
    this->characterState = state;
    this->skeletonNode = target;
}


void State::setStateMachine(StateMachine* stateMachine) {
    this->stateMachine = stateMachine;
}

StateMachine* State::getStateMachine() {
    return this->stateMachine;
}
