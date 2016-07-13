//
//  MessageSender.hpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 09/07/16.
//
//

#ifndef MessageSender_hpp
#define MessageSender_hpp

#include <stdio.h>
#include "Sqlite3Helper.hpp"
#include "cocos2d.h"

USING_NS_CC;

class MessageContent;

typedef std::vector<MessageContent*> messages;

class MessageSender : public cocos2d::Node {
protected:
    MessageSender(Sqlite3Helper* sqlite3Helper);    
    Sqlite3Helper* sqlite3Helper;
    
public:
    
    virtual bool initialize(Sqlite3Helper* sqlite3Helper);
    
    static MessageSender* getInstance(Sqlite3Helper* sqlite3Helper);
    ~MessageSender();
        
    virtual void createMessagesForNodeWithKey(std::string key);
    
    virtual void createMessagesForPreconditionId(int preConditionId);

};

#endif /* MessageSender_hpp */
