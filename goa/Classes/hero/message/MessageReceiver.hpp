//
//  MessageReceiver.hpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 09/07/16.
//
//

#ifndef MessageReceiver_hpp
#define MessageReceiver_hpp

#include <stdio.h>
#include "cocos2d.h"

class MessageContent;

class MessageReceiver : public cocos2d::Node {
    
protected:
    MessageReceiver();
public:
    
    virtual bool initialize();
    void receiveMessageEvent(cocos2d::EventCustom * event);
    static MessageReceiver* getInstance();
    ~MessageReceiver();
};


#endif /* MessageReceiver_hpp */
