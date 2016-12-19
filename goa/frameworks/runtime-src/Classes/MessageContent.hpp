//
//  MessageContent.hpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 10/07/16.
//
//

#ifndef MessageContent_hpp
#define MessageContent_hpp

#include <stdio.h>
#include "cocos2d.h"

class MessageContent {
public:
    MessageContent();
    ~MessageContent();
    CC_SYNTHESIZE(int, eventId, EventId);
    CC_SYNTHESIZE(int, preConditionEventId, PreConditionEventId);
    CC_SYNTHESIZE(std::string, condition, Condition);
    CC_SYNTHESIZE(std::string, action, Action);
    CC_SYNTHESIZE(std::string, dialog, Dialog);
    CC_SYNTHESIZE(std::string, owner, Owner);
    CC_SYNTHESIZE(int, conditionSatisfied, ConditionSatisfied);
    CC_SYNTHESIZE(int, playAnimationInLoop, PlayAnimationInLoop);
    CC_SYNTHESIZE(std::string, preOutComeAction, PreOutComeAction);
    CC_SYNTHESIZE(std::string, postOutComeAction, PostOutComeAction);
    CC_SYNTHESIZE(int, shouldDisplayInBag, ShouldDisplayInBag);
    CC_SYNTHESIZE(std::string, sceneName, SceneName);
        
};

#endif /* MessageContent_hpp */
