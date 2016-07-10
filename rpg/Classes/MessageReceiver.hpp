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

class MessageContent;

class MessageReceiver : public cocos2d::Node {
    
protected:
    MessageReceiver();
    
    static bool instanceFlag;
    static MessageReceiver *shared;
    
public:
    
    virtual bool initialize();
    
    static MessageReceiver* getInstance();
    ~MessageReceiver();
};


#endif /* MessageReceiver_hpp */
