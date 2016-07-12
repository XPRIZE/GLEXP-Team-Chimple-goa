//
//  MessageSender.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 09/07/16.
//
//

#include "MessageSender.hpp"
#include "RPGConfig.h"

bool MessageSender::instanceFlag = false;
MessageSender* MessageSender::shared = NULL;


MessageSender::MessageSender(Sqlite3Helper* sqlite3Helper) {
    
}


MessageSender::~MessageSender() {
    
}

MessageSender* MessageSender::getInstance(Sqlite3Helper* sqlite3Helper) {
    
    if(! instanceFlag)
    {
        shared = new MessageSender(sqlite3Helper);
        instanceFlag = true;
        if(shared && shared->initialize(sqlite3Helper))
        {
            shared->autorelease();
            return shared;
        }
    }
    else
    {
        return shared;
    }
    CC_SAFE_DELETE(shared);
    return nullptr;

}

           
bool MessageSender::initialize(Sqlite3Helper* sqlite3Helper) {
    this->sqlite3Helper = sqlite3Helper;
    
    auto sendMessageEvent = [=] (EventCustom * event) {
        std::string &key = *(static_cast<std::string*>(event->getUserData()));
        this->createMessagesForNodeWithKey(key);
    };
    
    SEND_MESSAGE_FOR_TAP_ON_SPEAKABLE(this, RPGConfig::SPEECH_MESSAGE_ON_TAP_NOTIFICATION, sendMessageEvent);

    auto sendTextOnTapMessageEvent = [=] (EventCustom * event) {
        int preConditionId = (int)(size_t)event->getUserData();
        this->createMessagesForPreconditionId(preConditionId);
    };
    
    SEND_MESSAGE_FOR_TAP_ON_TEXT(this, RPGConfig::SPEECH_MESSAGE_ON_TEXT_TAP_NOTIFICATION, sendTextOnTapMessageEvent);

    
    
    return true;
}

void MessageSender::createMessagesForNodeWithKey(std::string key) {
    CCLOG("creating message for %s", key.c_str());
    std::vector<MessageContent *> messages = this->sqlite3Helper->findEventsByOwner(key.c_str());
    assert(!key.empty());
    CCLOG("query Key is %s", key.c_str());
    assert(messages.size() != 0);
    
    EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::RECEIVE_CUSTOM_MESSAGE_NOTIFICATION, static_cast<void*>(&messages));
}

void MessageSender::createMessagesForPreconditionId(int preConditionId) {
    CCLOG("call came with precondition %d", preConditionId);
    std::vector<MessageContent *> messages = this->sqlite3Helper->findEventsByPreConditionEventId(preConditionId);
    if(messages.size() != 0) {
        EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::RECEIVE_CUSTOM_MESSAGE_NOTIFICATION, static_cast<void*>(&messages));    
    } else {
        EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_BUBBLE_DESTROYED_NOTIFICATION);
    }
    
    
}

