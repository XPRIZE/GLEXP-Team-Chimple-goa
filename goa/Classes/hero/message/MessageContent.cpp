//
//  MessageContent.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 10/07/16.
//
//

#include "MessageContent.hpp"

MessageContent::MessageContent() :
eventId(0),
preConditionEventId(0),
condition(""),
action(""),
dialog(""),
owner(""),
preOutComeAction(""),
postOutComeAction(""),
shouldDisplayInBag(0),
playAnimationInLoop(0) {    
}


MessageContent::~MessageContent() {
    
}