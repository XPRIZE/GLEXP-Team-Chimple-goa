//
//  Sqlite3Helper.hpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 09/07/16.
//
//

#include "sqlite3.h"

#ifndef Sqlite3Helper_hpp
#define Sqlite3Helper_hpp

#include <stdio.h>

class MessageContent;

class Sqlite3Helper {
public:
    static Sqlite3Helper* getInstance(std::string connectionUrl);    
    ~Sqlite3Helper();
    virtual std::vector<MessageContent*> findEventsByOwner(const char* owner);
    virtual std::vector<MessageContent*> findEventsByPreConditionEventId(int preConditionEventId);
    
protected:
    Sqlite3Helper(std::string connectionUrl);
    static bool instanceFlag;
    static Sqlite3Helper *shared;
    
    sqlite3 *dataBaseConnection=NULL;
    std::string connectionUrl;
    
    virtual void initializeConnection();
};

#endif /* Sqlite3Helper_hpp */
