//
//  Sqlite3Helper.cpp
//  rpg
//
//  Created by Shyamal  Upadhyaya on 09/07/16.
//
//

#include "Sqlite3Helper.hpp"
#include "cocos2d.h"
#include "MessageContent.hpp"
USING_NS_CC;


bool Sqlite3Helper::instanceFlag = false;
Sqlite3Helper* Sqlite3Helper::shared = NULL;


Sqlite3Helper::Sqlite3Helper(std::string connectionUrl, std::string dbName) {
    //this->getBaseDir()+"/"+this->getDialogFile();
    
    assert (!connectionUrl.empty());
    
    this->dataBaseConnection = NULL;
    
    this->connectionUrl = connectionUrl;
    this->dbName = dbName;
    
    this->initializeConnection();
}


Sqlite3Helper* Sqlite3Helper::getInstance(std::string connectionUrl, std::string dbName) {
    
    if(! instanceFlag)
    {
        shared = new Sqlite3Helper(connectionUrl, dbName);
        instanceFlag = true;
        return shared;
    }
    else
    {
        return shared;
    }
    
}


void Sqlite3Helper::initializeConnection() {
    std::string pathToSQLConnection = FileUtils::getInstance()->fullPathForFilename(this->connectionUrl);
    
    assert(!pathToSQLConnection.empty());
    CCLOG("pathToSQLConnection to android %s", pathToSQLConnection.c_str());
    CCLOG("writable path to android %s", FileUtils::getInstance()->getWritablePath().c_str());
    int result = 0;
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        std::string dbPath = FileUtils::getInstance()->getWritablePath() + this->dbName;
        FILE* file = fopen(dbPath.c_str(), "r");
        if (file == nullptr)
        {
            ssize_t size;
            const char* data = (char*) FileUtils::getInstance()->getFileData(pathToSQLConnection, "rb", &size);
            file = fopen(dbPath.c_str(), "wb");
            fwrite(data, size, 1, file);
            CC_SAFE_DELETE_ARRAY(data);
        }
        fclose(file);
    

        result=sqlite3_open(dbPath.c_str(),&this->dataBaseConnection);
    
    #else
        
       result=sqlite3_open(pathToSQLConnection.c_str(),&this->dataBaseConnection);
    
    #endif
    
    
    
    if(result == SQLITE_OK)
    {
        CCLOG("open database success, number %d",result);
    }
    else
    {
        CCLOG("open database failed, %s",sqlite3_errmsg(this->dataBaseConnection));
    }

}

std::vector<MessageContent*> Sqlite3Helper::findEventsByOwner(const char* owner) {
    /* Create SQL statement */
    
    sqlite3_stmt *res;
    int rc = 0;

    const char* querySQL =  "SELECT EVENT_ID, PRE_CONDITION_EVENT_ID, CONDITION, ACTION, DIALOG, OWNER FROM DIALOGS WHERE OWNER = @owner COLLATE NOCASE";

    
    /* Execute SQL statement */
    
    rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, -1, &res, 0);
    
    if (rc == SQLITE_OK) {
        
        int idx = sqlite3_bind_parameter_index(res, "@owner");
        sqlite3_bind_text(res, idx, owner,-1, SQLITE_TRANSIENT);

    } else {
        fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
    }
    
    std::vector<MessageContent*> messages;
    while(sqlite3_step(res) == SQLITE_ROW)
    {
        MessageContent* content = new MessageContent();
        CCLOG("sqlite3_column_int(res, 0) %d", sqlite3_column_int(res, 0));
        int event_id = sqlite3_column_int(res, 0);
        content->setEventId(event_id);
        content->setPreConditionEventId(sqlite3_column_int(res,1));
        
        std::string condition( reinterpret_cast< char const* >(sqlite3_column_text(res, 2))) ;
        content->setCondition(condition);
        
        std::string action( reinterpret_cast< char const* >(sqlite3_column_text(res, 3))) ;
        content->setAction(action);

        std::string dialog( reinterpret_cast< char const* >(sqlite3_column_text(res, 4))) ;
        content->setDialog(dialog);

        
        std::string owner( reinterpret_cast< char const* >(sqlite3_column_text(res, 5))) ;
        content->setOwner(owner);
        
        messages.push_back(content);
        
    }
    
    
    sqlite3_finalize(res);
    
    return messages;

}


std::vector<MessageContent*> Sqlite3Helper::findEventsByPreConditionEventId(int preConditionEventId) {
    /* Create SQL statement */
    
    sqlite3_stmt *res;
    int rc = 0;
    
    const char* querySQL =  "SELECT EVENT_ID, PRE_CONDITION_EVENT_ID, CONDITION, ACTION, DIALOG, OWNER FROM DIALOGS WHERE PRE_CONDITION_EVENT_ID = @preConditionEventId COLLATE NOCASE";
    
    
    /* Execute SQL statement */
    
    rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, -1, &res, 0);
    
    if (rc == SQLITE_OK) {
        
        int idx = sqlite3_bind_parameter_index(res, "@preConditionEventId");
        sqlite3_bind_int(res, idx, preConditionEventId);
        
    } else {
        fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
    }
    
    std::vector<MessageContent*> messages;
    while(sqlite3_step(res) == SQLITE_ROW)
    {
        MessageContent* content = new MessageContent();
        CCLOG("sqlite3_column_int(res, 0) %d", sqlite3_column_int(res, 0));
        int event_id = sqlite3_column_int(res, 0);
        content->setEventId(event_id);
        content->setPreConditionEventId(sqlite3_column_int(res,1));
        
        std::string condition( reinterpret_cast< char const* >(sqlite3_column_text(res, 2))) ;
        content->setCondition(condition);
        
        std::string action( reinterpret_cast< char const* >(sqlite3_column_text(res, 3))) ;
        content->setAction(action);
        
        std::string dialog( reinterpret_cast< char const* >(sqlite3_column_text(res, 4))) ;
        content->setDialog(dialog);
        
        
        std::string owner( reinterpret_cast< char const* >(sqlite3_column_text(res, 5))) ;
        content->setOwner(owner);
        
        messages.push_back(content);
        
    }
    
    
    sqlite3_finalize(res);
    
    return messages;
    
}


Sqlite3Helper::~Sqlite3Helper() {
    //close connection
    if(!this->connectionUrl.empty() && this->dataBaseConnection != nullptr && !this->dbName.empty()) {
        sqlite3_close(this->dataBaseConnection);
    }    
}