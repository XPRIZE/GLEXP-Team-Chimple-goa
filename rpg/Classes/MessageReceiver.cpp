//
//  MessageReceiver.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 09/07/16.
//
//


#include "MessageReceiver.hpp"
#include "cocos2d.h"
#include "RPGConfig.h"
#include "MessageContent.hpp"


USING_NS_CC;

bool MessageReceiver::instanceFlag = false;
MessageReceiver* MessageReceiver::shared = NULL;


MessageReceiver::MessageReceiver() {
    
}


MessageReceiver::~MessageReceiver() {
    
}

MessageReceiver* MessageReceiver::getInstance() {
    
    if(! instanceFlag)
    {
        shared = new MessageReceiver();
        instanceFlag = true;
        if(shared && shared->initialize())
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


bool MessageReceiver::initialize() {
    
    auto receiveMessageEvent = [=] (EventCustom * event) {
        EVENT_DISPATCHER->dispatchCustomEvent(RPGConfig::PROCESS_CUSTOM_MESSAGE_AND_CREATE_UI_NOTIFICATION, event->getUserData());
        //std::vector<MessageContent*>*messages = reinterpret_cast<std::vector<MessageContent*>*>(event->getUserData());
    };
    
    RECEIVE_MESSAGE_FOR_TAP_ON_SPEAKABLE(this, RPGConfig::RECEIVE_CUSTOM_MESSAGE_NOTIFICATION, receiveMessageEvent);
    
    return true;
}
