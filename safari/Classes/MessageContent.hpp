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
};

#endif /* MessageContent_hpp */
