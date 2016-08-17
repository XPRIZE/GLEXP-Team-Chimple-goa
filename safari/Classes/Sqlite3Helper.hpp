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
#include "SkeletonConfiguration.h"

#ifndef Sqlite3Helper_hpp
#define Sqlite3Helper_hpp


class Sqlite3Helper {
public:
    static Sqlite3Helper* getInstance(std::string connectionUrl, std::string dbName);
    ~Sqlite3Helper();
    
    //select queries
    virtual std::vector<MessageContent*> findEventsByOwnerInScene(const char* owner, const char* sceneName);
    virtual std::vector<MessageContent*> findEventsByPreConditionEventIdInScene(int preConditionEventId, const char* sceneName);
    
    virtual std::vector<SkeletonConfiguration*> loadSkeletonConfigurationInScene(const char* island, const char* sceneName, const char* skeletonName);
    
    
    virtual bool openConnection();
    virtual bool closeConnection();
    
    //insert/update/delete queries
    virtual void insertItemToMyBag(const char* island, const char* item);
    
    virtual void insertSkinForBoneForSkeletonInScene(const char* island, const char* sceneName, const char* skeletonName, const char* boneName, const char* skinName, const char* imageName, const char* skinAnchorX, const char* skinAnchorY);

    virtual void deleteItemFromMyBag(const char* island, const char* item);
    
    
    virtual void recordMainCharacterPositionInScene(const char* island, const char* sceneName, float xPos, float yPos);
    
    virtual SkeletonPosition* findLastVisitedSceneInIsland(const char* island, const char* sceneName);
    
    virtual std::map<std::string,std::string> loadNodeWordMapping(const char* sceneName);
    
    static bool instanceFlag;
    static Sqlite3Helper *shared;

protected:
    Sqlite3Helper(std::string connectionUrl, std::string dbName);
    
    sqlite3 *dataBaseConnection;
    std::string connectionUrl;
    std::string dbName;
    std::string pathToSQLConnection;
    
    virtual void initializeConnection();
};

#endif /* Sqlite3Helper_hpp */
