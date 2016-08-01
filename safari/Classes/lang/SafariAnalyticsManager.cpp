//
//  SafariAnalyticsManager.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 28/07/16.
//
//

#include "SafariAnalyticsManager.h"



USING_NS_CC;


static SafariAnalyticsManager* safariAnalyticsManager = nullptr;


SafariAnalyticsManager::SafariAnalyticsManager() {
    
}


SafariAnalyticsManager* SafariAnalyticsManager::getInstance()
{
    if (!safariAnalyticsManager)
    {
        safariAnalyticsManager = new (std::nothrow) SafariAnalyticsManager();
        CCASSERT(safariAnalyticsManager, "FATAL: Error Creating Analytics Manager");
        safariAnalyticsManager->init();
    }
    
    return safariAnalyticsManager;
}


void SafariAnalyticsManager::insertAnalyticsInfo(const char* targetAlphabet, const char* chosenAlphabet, const char* appName) {
    sqlite3_stmt *res;
    const char* querySQL = " INSERT INTO ANALYTICS_INFO (TARGET_ALPHABET, CHOSEN_ALPHABET, APP_NAME) VALUES (?,?,?)";
    
    int rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, strlen(querySQL), &res, NULL);
    
    if( rc == SQLITE_OK ) {
        // bind the value
        
        sqlite3_bind_text(res, 1, targetAlphabet, strlen(targetAlphabet), SQLITE_TRANSIENT);
        sqlite3_bind_text(res, 2, chosenAlphabet, strlen(chosenAlphabet), SQLITE_TRANSIENT);
        sqlite3_bind_text(res, 3, appName, strlen(appName), SQLITE_TRANSIENT);
        
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

bool SafariAnalyticsManager::wasGamePlayedBefore(const char* appName) {
    sqlite3_stmt *res;
    int rc = 0;
    const char* querySQL = "SELECT APP_NAME FROM ANALYTICS_INFO WHERE APP_NAME = @app_name";
    
    rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, -1, &res, 0);
    
    if (rc == SQLITE_OK) {
        int index = sqlite3_bind_parameter_index(res, "@app_name");
        sqlite3_bind_text(res, index, appName, -1, SQLITE_TRANSIENT);
    } else {
        fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
    }
    if(sqlite3_step(res) == SQLITE_ROW) {
        return true;
    }
    return false;
}


SafariAnalyticsManager::~SafariAnalyticsManager() {
    this->closeConnection();
}

bool SafariAnalyticsManager::init()
{
    std::string pathToSQLConnection = FileUtils::getInstance()->fullPathForFilename(ANALYTICS_CONNECTION_URL);
    assert(!pathToSQLConnection.empty());
    CCLOG("pathToSQLConnection to database %s", pathToSQLConnection.c_str());
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    std::string dbPath = FileUtils::getInstance()->getWritablePath() + ANALYTICS_DATABASE_NAME;
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
    pathToSQLConnection = dbPath;
    CCLOG("ANDROID pathToSQLConnection to database %s", pathToSQLConnection.c_str());
#else
    pathToSQLConnection = pathToSQLConnection;
    
#endif
    
    this->openConnection(pathToSQLConnection);
    return true;
}


bool SafariAnalyticsManager::openConnection(std::string pathToSQLConnection) {
    bool isConnectionOpenSuccessfully = false;
    int result=sqlite3_open(pathToSQLConnection.c_str(),&this->dataBaseConnection);
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

bool SafariAnalyticsManager::closeConnection() {
    //close connection
    sqlite3_close(this->dataBaseConnection);
    return true;
}