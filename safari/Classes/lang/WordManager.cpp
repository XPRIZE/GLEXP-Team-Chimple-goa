//
//  WordManager.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 06/08/16.
//
//

#include "WordManager.h"
#include "LangUtil.h"


USING_NS_CC;


static WordManager* _instance = 0;


WordManager::WordManager() {
    
}

void WordManager::destroyInstance() {
    _instance = 0;
}

WordManager* WordManager::getInstance()
{
    if (!_instance)
    {
        _instance = new (std::nothrow) WordManager();
        CCASSERT(_instance, "FATAL: Error Creating Word Manager");
        _instance->init();
    }
    
    return _instance;
}


WordManager::~WordManager() {
    this->closeConnection();
}

bool WordManager::init()
{
    std::string fileName = "res/" + LangUtil::getInstance()->getDir() + "/words.db3";
    std::string pathToSQLConnection = FileUtils::getInstance()->fullPathForFilename(fileName);
    assert(!pathToSQLConnection.empty());
    CCLOG("pathToSQLConnection to database %s", pathToSQLConnection.c_str());
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    std::string dbPath = FileUtils::getInstance()->getWritablePath() + LangUtil::getInstance()->getLang()  + "_words.db3";
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


bool WordManager::openConnection(std::string pathToSQLConnection) {
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

bool WordManager::closeConnection() {
    //close connection
    sqlite3_close(this->dataBaseConnection);
    return true;
}
