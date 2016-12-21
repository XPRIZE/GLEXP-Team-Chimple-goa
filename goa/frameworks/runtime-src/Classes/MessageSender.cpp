//
//  MessageSender.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 09/07/16.
//
//

#include "MessageSender.hpp"
#include "RPGConfig.h"
#include <string.h>


MessageSender::MessageSender(Sqlite3Helper* sqlite3Helper) {
}


MessageSender::~MessageSender() {
}

MessageSender* MessageSender::getInstance(Sqlite3Helper* sqlite3Helper,std::string sceneName) {
    auto messageSender = new MessageSender(sqlite3Helper);
    if (messageSender && messageSender->initialize(sqlite3Helper, sceneName)) {
        messageSender->autorelease();
        return messageSender;
    }
    CC_SAFE_DELETE(messageSender);
    return nullptr;
}

           
bool MessageSender::initialize(Sqlite3Helper* sqlite3Helper, std::string sceneName) {
    this->sqlite3Helper = sqlite3Helper;
    this->sceneName = sceneName;
    
    this->getEventDispatcher()->addCustomEventListener(RPGConfig::SPEECH_MESSAGE_ON_TAP_NOTIFICATION, CC_CALLBACK_1(MessageSender::sendMessageEvent, this));

    
    this->getEventDispatcher()->addCustomEventListener(RPGConfig::SPEECH_MESSAGE_ON_TEXT_TAP_NOTIFICATION, CC_CALLBACK_1(MessageSender::sendTextOnTapMessageEvent, this));


    return true;
}

void MessageSender::sendMessageEvent(EventCustom * event) {
    std::string &key = *(static_cast<std::string*>(event->getUserData()));
    this->createMessagesForNodeWithKey(key);
}

void MessageSender::sendTextOnTapMessageEvent(EventCustom * event) {
    int preConditionId = (int)(size_t)event->getUserData();
    this->createMessagesForPreconditionId(preConditionId);

}

void MessageSender::createMessagesForNodeWithKey(std::string key) {
    CCLOG("creating message for %s", key.c_str());
    assert(this->sqlite3Helper != NULL);
    assert(!key.empty());

    std::vector<MessageContent *> messages = this->sqlite3Helper->findEventsByOwnerInScene(key.c_str(), this->sceneName.c_str());
    
    CCLOG("query Key is %s", key.c_str());

    if(messages.size() != 0) {
        CCLOG("message found for query key %s", key.c_str());
        EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::RECEIVE_CUSTOM_MESSAGE_NOTIFICATION, static_cast<void*>(&messages));        
    } else {
        CCLOG("NO message found for query key !!! ALERT %s", key.c_str());
    }
}

void MessageSender::createMessagesForPreconditionId(int preConditionId) {
    CCLOG("call came with precondition %d", preConditionId);
    assert(this->sqlite3Helper != NULL);
    
    std::vector<MessageContent *> messages = this->sqlite3Helper->findEventsByPreConditionEventIdInScene(preConditionId, this->sceneName.c_str());
    EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::SPEECH_BUBBLE_DESTROYED_NOTIFICATION);
    if(messages.size() != 0) {
        EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::RECEIVE_CUSTOM_MESSAGE_NOTIFICATION, static_cast<void*>(&messages));    
    }
}

