//
//  StateMachine.cpp
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 25/06/16.
//
//

#include <stdio.h>
#include "StateMachine.h"
#include "StandingState.h"
#include "RunningState.h"
#include "WalkingState.h"
#include "JumpingState.h"
#include "FallingState.h"

bool StateMachine::instanceFlag = false;
StateMachine* StateMachine::single = NULL;


StateMachine::StateMachine():
currentState(nullptr)
{
    
}


StateMachine* StateMachine:: getInstance() {
    
    if(! instanceFlag)
    {
        single = new StateMachine();
        instanceFlag = true;
        return single;
    }
    else
    {
        return single;
    }

}

StateMachine::~StateMachine() {
    StateMachine::instanceFlag = false;
    StateMachine::single = NULL;
}

void StateMachine::setInitialState(SkeletonCharacterState initialState) {
    currentState = states.at(enumToString(initialState));
    currentState->enter(cocos2d::Vec2(0,0), S_NONE_STATE);
}



void StateMachine::addState(SkeletonCharacterState characterState, SkeletonCharacter* target)
{
    switch (characterState) {
        case S_STANDING_STATE:
        {
            auto standingState = new StandingState();
            assert (target != NULL);
            standingState->setTarget(characterState, target);
            standingState->setStateMachine(this);
            states.insert({enumToString(characterState), standingState});
            break;
            
        }
        case S_RUNNING_STATE:
        {
            auto runningState = new RunningState();
            runningState->setTarget(characterState, target);
            runningState->setStateMachine(this);
            states.insert({enumToString(characterState), runningState});
            break;
            
        }
        case S_WALKING_STATE:
        {
            auto walkingState = new WalkingState();
            walkingState->setTarget(characterState, target);
            walkingState->setStateMachine(this);
            states.insert({enumToString(characterState), walkingState});
            break;
            
        }

        case S_JUMPING_STATE:
        {
            auto jumpingState = new JumpingState();
            jumpingState->setTarget(characterState, target);
            jumpingState->setStateMachine(this);
            states.insert({enumToString(characterState), jumpingState});
            break;
            
        }
            
            
        case S_FALLING_STATE:
        {
            auto fallingState = new FallingState();
            fallingState->setTarget(characterState, target);
            fallingState->setStateMachine(this);
            states.insert({enumToString(characterState), fallingState});
            break;
            
        }
        
        case S_NONE_STATE:
        {
            break;
        }
            
    }
    
    
}

State* StateMachine::getCurrentState() {
    return currentState;
}

void StateMachine::handleInput(SkeletonCharacterState command, const cocos2d::Vec2 forceVector) {
    SkeletonCharacterState newCommand = currentState->handleInput(command);
    SkeletonCharacterState curCommand = currentState->getState();
    CCLOG("current command %s", enumToString(curCommand));
    CCLOG("new next command %s", enumToString(newCommand));
    
    if(newCommand != curCommand) {
        currentState->exit();
        CCLOG("starting %s", enumToString(newCommand));
        if(states.count(enumToString(newCommand))) {
            currentState = states.at(enumToString(newCommand));
            if(currentState != NULL) {
                currentState->enter(forceVector, curCommand);
            }            
        }
        
    }
}
