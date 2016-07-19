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


Sqlite3Helper::Sqlite3Helper(std::string connectionUrl, std::string dbName):
dataBaseConnection(nullptr),
connectionUrl(""),
dbName("")
{
    assert (!connectionUrl.empty());
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
    CCLOG("pathToSQLConnection to database %s", pathToSQLConnection.c_str());
    
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
        this->pathToSQLConnection = dbPath;
    
    #else
        
       this->pathToSQLConnection = pathToSQLConnection;
    
    #endif
    
    this->openConnection();
}

bool Sqlite3Helper::openConnection() {
    bool isConnectionOpenSuccessfully = false;
    int result=sqlite3_open(this->pathToSQLConnection.c_str(),&this->dataBaseConnection);
    if(result == SQLITE_OK)
    {
        CCLOG("open database success, number %d",result);
        isConnectionOpenSuccessfully = true;
    }
    else
    {
        CCLOG("open database failed, %s",sqlite3_errmsg(this->dataBaseConnection));
    }
    return isConnectionOpenSuccessfully;
}

bool Sqlite3Helper::closeConnection() {
    //close connection
    sqlite3_close(this->dataBaseConnection);
    return true;
}

void Sqlite3Helper::insertItemToMyBag(const char* island, const char* item) {
    sqlite3_stmt *res;
    const char* querySQL = " INSERT INTO MY_BAG (ISLAND_NAME, ITEM) SELECT ?,? WHERE NOT EXISTS (SELECT 1 FROM MY_BAG WHERE ISLAND_NAME = ? AND ITEM = ?) ";
    
    int rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, strlen(querySQL), &res, NULL);
    
    if( rc == SQLITE_OK ) {
        // bind the value        
        sqlite3_bind_text(res, 1, island, strlen(island), SQLITE_TRANSIENT);
        sqlite3_bind_text(res, 2, item, strlen(item), SQLITE_TRANSIENT);
        sqlite3_bind_text(res, 3, island, strlen(island), SQLITE_TRANSIENT);
        sqlite3_bind_text(res, 4, item, strlen(item), SQLITE_TRANSIENT);

        // commit
        int m = sqlite3_step(res);
        if(m == SQLITE_BUSY)
        {
            fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
        }
        
        if(m == SQLITE_ERROR) {
            fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
        }
        
        if(m == SQLITE_MISUSE) {
            fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
        }
        sqlite3_finalize(res);
    }
    else {
        fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
    }

}

void Sqlite3Helper::deleteItemFromMyBag(const char* island, const char* item) {
    sqlite3_stmt *res;
    const char* querySQL = "DELETE FROM MY_BAG WHERE ISLAND_NAME = @islandName AND ITEM = @itemName";
    int rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, strlen(querySQL), &res, 0);
    if( rc == SQLITE_OK ) {
        // bind the value
        int islandNameIndex = sqlite3_bind_parameter_index(res , "@islandName");
        sqlite3_bind_text(res, islandNameIndex, island, -1, SQLITE_STATIC);
        
        int itemIndex = sqlite3_bind_parameter_index(res, "@itemName");
        sqlite3_bind_text(res, itemIndex, item,-1, SQLITE_STATIC);

        if(SQLITE_DONE == sqlite3_step(res)) {
            fprintf(stderr, "Successfully deleted record: %s\n", sqlite3_errmsg(this->dataBaseConnection));
        }
        sqlite3_finalize(res);
    }
    else {
        fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
    }
}


void Sqlite3Helper::recordMainCharacterPositionInScene(const char* island, const char* sceneName, float xPos, float yPos)
{
    sqlite3_stmt *res;
    const char* queryUpdateSQL = "UPDATE OR IGNORE SKELETON_POSITIONS SET SCENE_NAME=?, X_POSITION=?, Y_POSITION= ? WHERE ISLAND_NAME = ?";
    
    int rc = sqlite3_prepare(this->dataBaseConnection, queryUpdateSQL, strlen(queryUpdateSQL), &res, 0);
    int rowsAffected = 0;
    if( rc == SQLITE_OK ) {
        // bind the value
        sqlite3_bind_text(res, 1, sceneName, strlen(sceneName), 0);
        sqlite3_bind_double(res, 2, xPos);
        sqlite3_bind_double(res, 3, yPos);
        sqlite3_bind_text(res, 4, island, strlen(island), 0);
        
        // commit
        if(sqlite3_step(res) == SQLITE_DONE) {
            rowsAffected = sqlite3_changes(this->dataBaseConnection);
        }
        sqlite3_finalize(res);
        
    }
    else {
        fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
    }

    CCLOG("rowsAffected %d", rowsAffected);
    
    if(rowsAffected == 0) {
        const char* queryInsertSQL = "INSERT OR IGNORE INTO SKELETON_POSITIONS (ISLAND_NAME, SCENE_NAME, X_POSITION,Y_POSITION) VALUES (?, ?, ?, ?)";
        
        rc = sqlite3_prepare_v2(this->dataBaseConnection, queryInsertSQL, strlen(queryInsertSQL), &res, 0);
        
        if( rc == SQLITE_OK ) {
            // bind the value
            sqlite3_bind_text(res, 1, island, strlen(island), 0);
            sqlite3_bind_text(res, 2, sceneName, strlen(sceneName), 0);
            sqlite3_bind_double(res, 3, xPos);
            sqlite3_bind_double(res, 4, yPos);
            
            // commit
            sqlite3_step(res);
            sqlite3_finalize(res);
        }
        else {
            fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
        }
    } 
}


std::vector<MessageContent*> Sqlite3Helper::findEventsByOwnerInScene(const char* owner, const char* sceneName) {
    /* Create SQL statement */
    
    sqlite3_stmt *res;
    int rc = 0;

    const char* querySQL = "SELECT EVENT_ID, PRE_CONDITION_EVENT_ID, CONDITION, CONDITION_RESULT, ACTION, DIALOG, OWNER, PLAY_ANIMATION_IN_LOOP, PRE_OUTCOME_ACTION, POST_OUTCOME_ACTION, SCENE_NAME, SHOULD_DISPLAY_IN_BAG FROM EVENTS WHERE OWNER=@owner_1 AND SCENE_NAME = @sceneName_1 AND CONDITION = '' UNION SELECT EVENT_ID, PRE_CONDITION_EVENT_ID, CONDITION, CONDITION_RESULT, ACTION, DIALOG, OWNER, PLAY_ANIMATION_IN_LOOP, PRE_OUTCOME_ACTION, POST_OUTCOME_ACTION, SCENE_NAME, SHOULD_DISPLAY_IN_BAG FROM EVENTS E INNER JOIN MY_BAG B ON E.CONDITION = B.ITEM AND E.OWNER = @owner_2 AND SCENE_NAME = @sceneName_2 AND E.CONDITION_RESULT = 1 UNION SELECT EVENT_ID, PRE_CONDITION_EVENT_ID, CONDITION, CONDITION_RESULT, ACTION, DIALOG, OWNER, PLAY_ANIMATION_IN_LOOP, PRE_OUTCOME_ACTION, POST_OUTCOME_ACTION, SCENE_NAME, SHOULD_DISPLAY_IN_BAG FROM EVENTS WHERE OWNER=@owner_3 AND SCENE_NAME = @sceneName_3 AND CONDITION_RESULT= 0 AND CONDITION IS NOT NULL AND CONDITION NOT IN (SELECT ITEM FROM MY_BAG) ORDER BY EVENT_ID ASC";
    
    
    /* Execute SQL statement */
    
    rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, -1, &res, 0);
    
    if (rc == SQLITE_OK) {
        
        int owner_1Index = sqlite3_bind_parameter_index(res, "@owner_1");
        sqlite3_bind_text(res, owner_1Index, owner,-1, SQLITE_TRANSIENT);
        
        int sceneName_1Index = sqlite3_bind_parameter_index(res, "@sceneName_1");
        sqlite3_bind_text(res, sceneName_1Index, sceneName,-1, SQLITE_TRANSIENT);
        
        int owner_2Index = sqlite3_bind_parameter_index(res, "@owner_2");
        sqlite3_bind_text(res, owner_2Index, owner,-1, SQLITE_TRANSIENT);
        
        int sceneName_2Index = sqlite3_bind_parameter_index(res, "@sceneName_2");
        sqlite3_bind_text(res, sceneName_2Index, sceneName,-1, SQLITE_TRANSIENT);

        
        int owner_3Index = sqlite3_bind_parameter_index(res, "@owner_3");
        sqlite3_bind_text(res, owner_3Index, owner,-1, SQLITE_TRANSIENT);
        
        int sceneName_3Index = sqlite3_bind_parameter_index(res, "@sceneName_3");
        sqlite3_bind_text(res, sceneName_3Index, sceneName,-1, SQLITE_TRANSIENT);


    } else {
        fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
    }
    
    std::vector<MessageContent*> messages;
    while(sqlite3_step(res) == SQLITE_ROW)
    {
        MessageContent* content = new MessageContent();
        content->setEventId(sqlite3_column_int(res, 0));
        content->setPreConditionEventId(sqlite3_column_int(res,1));
        
        std::string condition( reinterpret_cast< char const* >(sqlite3_column_text(res, 2))) ;
        content->setCondition(condition);
        
        content->setConditionSatisfied(sqlite3_column_int(res,3));
        
        std::string action( reinterpret_cast< char const* >(sqlite3_column_text(res, 4))) ;
        content->setAction(action);

        std::string dialog( reinterpret_cast< char const* >(sqlite3_column_text(res, 5))) ;
        content->setDialog(dialog);

        
        std::string owner( reinterpret_cast< char const* >(sqlite3_column_text(res, 6))) ;
        content->setOwner(owner);
        
        content->setPlayAnimationInLoop(sqlite3_column_int(res,7));
        
        std::string preOutComeAction ( reinterpret_cast< char const* >(sqlite3_column_text(res, 8))) ;
        content->setPreOutComeAction(preOutComeAction);

        std::string postOutComeAction ( reinterpret_cast< char const* >(sqlite3_column_text(res, 9))) ;
        content->setPostOutComeAction(postOutComeAction);

        std::string sceneName ( reinterpret_cast< char const* >(sqlite3_column_text(res, 10))) ;
        content->setSceneName(sceneName);

        content->setShouldDisplayInBag(sqlite3_column_int(res,11));
        
        messages.push_back(content);
    }
    
    
    sqlite3_finalize(res);
    
    return messages;

}


std::vector<MessageContent*> Sqlite3Helper::findEventsByPreConditionEventIdInScene(int preConditionEventId, const char *sceneName) {
    /* Create SQL statement */
    
    sqlite3_stmt *res;
    int rc = 0;
    
    const char* querySQL =  "SELECT EVENT_ID, PRE_CONDITION_EVENT_ID, CONDITION, CONDITION_RESULT, ACTION, DIALOG, OWNER, PLAY_ANIMATION_IN_LOOP, PRE_OUTCOME_ACTION, POST_OUTCOME_ACTION, SCENE_NAME, SHOULD_DISPLAY_IN_BAG FROM EVENTS WHERE PRE_CONDITION_EVENT_ID = @preConditionEventId AND SCENE_NAME = @sceneName COLLATE NOCASE";
    
    
    /* Execute SQL statement */
    
    rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, -1, &res, 0);
    
    if (rc == SQLITE_OK) {
        
        int idx = sqlite3_bind_parameter_index(res, "@preConditionEventId");
        sqlite3_bind_int(res, idx, preConditionEventId);
        
        int sceneName_Index = sqlite3_bind_parameter_index(res, "@sceneName");
        sqlite3_bind_text(res, sceneName_Index, sceneName,-1, SQLITE_TRANSIENT);

        
    } else {
        fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
    }
    
    std::vector<MessageContent*> messages;
    while(sqlite3_step(res) == SQLITE_ROW)
    {
        MessageContent* content = new MessageContent();
        content->setEventId(sqlite3_column_int(res, 0));
        content->setPreConditionEventId(sqlite3_column_int(res,1));
        
        std::string condition( reinterpret_cast< char const* >(sqlite3_column_text(res, 2))) ;
        content->setCondition(condition);
        
        content->setConditionSatisfied(sqlite3_column_int(res,3));
        
        std::string action( reinterpret_cast< char const* >(sqlite3_column_text(res, 4))) ;
        content->setAction(action);
        
        std::string dialog( reinterpret_cast< char const* >(sqlite3_column_text(res, 5))) ;
        content->setDialog(dialog);
        
        
        std::string owner( reinterpret_cast< char const* >(sqlite3_column_text(res, 6))) ;
        content->setOwner(owner);
        
        content->setPlayAnimationInLoop(sqlite3_column_int(res,7));
        
        std::string preOutComeAction ( reinterpret_cast< char const* >(sqlite3_column_text(res, 8))) ;
        content->setPreOutComeAction(preOutComeAction);
        
        std::string postOutComeAction ( reinterpret_cast< char const* >(sqlite3_column_text(res, 9))) ;
        content->setPostOutComeAction(postOutComeAction);
        
        std::string sceneName ( reinterpret_cast< char const* >(sqlite3_column_text(res, 10))) ;
        content->setSceneName(sceneName);
        
        content->setShouldDisplayInBag(sqlite3_column_int(res,11));
    }
    
    
    sqlite3_finalize(res);
    
    return messages;
    
}


Sqlite3Helper::~Sqlite3Helper() {
    this->closeConnection();
}