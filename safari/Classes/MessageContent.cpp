//
//  MessageContent.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 10/07/16.
//
//

#include "MessageContent.hpp"

MessageContent::MessageContent() {
    this->eventId = 0;
    this->preConditionEventId = 0;
    this->condition = "";
    this->action = "";
    this->dialog = "";
    this->owner = "";    
    
}


MessageContent::~MessageContent() {
    
}