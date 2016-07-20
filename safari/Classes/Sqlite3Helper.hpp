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
#include "SkeletonPosition.h"
#include "RPGConfig.h"


#ifndef Sqlite3Helper_hpp
#define Sqlite3Helper_hpp


class Sqlite3Helper {
public:
    static Sqlite3Helper* getInstance(std::string connectionUrl);
    ~Sqlite3Helper();
    
    //select queries
    virtual std::vector<MessageContent*> findEventsByOwnerInScene(const char* owner, const char* sceneName);
    virtual std::vector<MessageContent*> findEventsByPreConditionEventIdInScene(int preConditionEventId, const char* sceneName);
    
    virtual bool openConnection();
    virtual bool closeConnection();
    
    //insert/update/delete queries
    virtual void insertItemToMyBag(const char* island, const char* item);

    virtual void deleteItemFromMyBag(const char* island, const char* item);
    
    
    virtual void recordMainCharacterPositionInScene(const char* island, const char* sceneName, float xPos, float yPos);
    
    virtual SkeletonPosition* findLastVisitedSceneInIsland(const char* island);
    
    static bool instanceFlag;
    static Sqlite3Helper *shared;

protected:
    Sqlite3Helper(std::string connectionUrl);
    
    sqlite3 *dataBaseConnection;
    std::string connectionUrl;
    std::string pathToSQLConnection;
    
    virtual void initializeConnection();
};

#endif /* Sqlite3Helper_hpp */
