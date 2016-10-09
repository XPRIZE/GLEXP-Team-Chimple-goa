//
//  SafariAnalyticsManager.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 28/07/16.
//
//

#include "SafariAnalyticsManager.h"
#include "LangUtil.h"


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

void SafariAnalyticsManager::insertAlphabet(wchar_t alphabet) {
    sqlite3_stmt *res;
    std::string alphaString = LangUtil::convertUTF16CharToString(alphabet);
    const char* alphaStr = alphaString.c_str();
    const char* querySQL = " INSERT INTO ALPHABET_LEARNT (ALPHABET) VALUES (?)";
    
    int rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, strlen(querySQL), &res, NULL);
    
    if( rc == SQLITE_OK ) {
        // bind the value
        
        sqlite3_bind_text(res, 1, alphaStr, strlen(alphaStr), SQLITE_TRANSIENT);
        
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

std::vector<wchar_t> SafariAnalyticsManager::getAlphabets() {
    sqlite3_stmt *res;
    int rc = 0;
    const char* querySQL = "SELECT ALPHABET FROM ALPHABET_LEARNT";
    
    rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, -1, &res, 0);
    std::vector<wchar_t> alphabets = std::vector<wchar_t>();
    while(sqlite3_step(res) == SQLITE_ROW) {
        std::string alphabetString( reinterpret_cast< char const* >(sqlite3_column_text(res, 0))) ;
        alphabets.push_back(LangUtil::convertStringToUTF16Char(alphabetString));
    }
    return alphabets;
}

bool SafariAnalyticsManager::doesAlphabetExist(wchar_t alphabet) {
    sqlite3_stmt *res;
    int rc = 0;
    std::string alphaString = LangUtil::convertUTF16CharToString(alphabet);
    const char* alphaStr = alphaString.c_str();

    const char* querySQL = "SELECT ALPHABET FROM ALPHABET_LEARNT WHERE ALPHABET = @alpha";
    rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, -1, &res, 0);

    if (rc == SQLITE_OK) {
        int index = sqlite3_bind_parameter_index(res, "@alpha");
        sqlite3_bind_text(res, index, alphaStr, strlen(alphaStr), SQLITE_TRANSIENT);
    } else {
        fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
    }
    if(sqlite3_step(res) == SQLITE_ROW) {
        return true;
    }
    return false;
    
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

void SafariAnalyticsManager::addPhoto(const char* url) {
    sqlite3_stmt *res;
    const char* querySQL = " INSERT INTO LOGIN_PHOTOS (PHOTO_URL) VALUES (?)";
    
    int rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, strlen(querySQL), &res, NULL);
    if( rc == SQLITE_OK ) {
        // bind the value
        
        sqlite3_bind_text(res, 1, url, strlen(url), SQLITE_TRANSIENT);
        
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

std::string SafariAnalyticsManager::getLatestUserPhoto() {
    std::string photoUrl = "";
    sqlite3_stmt *res;
    int rc = 0;
    const char* querySQL = "SELECT PHOTO_URL FROM LOGIN_PHOTOS ORDER BY ROWID DESC LIMIT 1";
    
    rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, -1, &res, 0);
    
    if(sqlite3_step(res) == SQLITE_ROW) {
        photoUrl =  reinterpret_cast< char const* >(sqlite3_column_text(res, 0));
    }
    
    CCLOG("Received latest photo %s", photoUrl.c_str());
    
    return photoUrl;
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

