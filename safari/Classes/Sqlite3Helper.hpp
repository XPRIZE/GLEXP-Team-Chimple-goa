//
//  Sqlite3Helper.hpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 09/07/16.
//
//

#include <stdio.h>
#include "sqlite3.h"
#include "MessageContent.hpp"

#ifndef Sqlite3Helper_hpp
#define Sqlite3Helper_hpp


class Sqlite3Helper {
public:
    static Sqlite3Helper* getInstance(std::string connectionUrl, std::string dbName);
    ~Sqlite3Helper();
    virtual std::vector<MessageContent*> findEventsByOwner(const char* owner);
    virtual std::vector<MessageContent*> findEventsByPreConditionEventId(int preConditionEventId);

    static bool instanceFlag;
    static Sqlite3Helper *shared;

protected:
    Sqlite3Helper(std::string connectionUrl, std::string dbName);
    
    sqlite3 *dataBaseConnection;
    std::string connectionUrl;
    std::string dbName;
    
    virtual void initializeConnection();
};

#endif /* Sqlite3Helper_hpp */
