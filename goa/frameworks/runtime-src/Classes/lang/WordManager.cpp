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


WordManager::WordManager(): pathToSQLConnection("") {
    
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
    this->pathToSQLConnection = pathToSQLConnection;
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


WordInfo* WordManager::loadLanguageSpecificWordMappingForAWord(const char* word) {
    
    /* Create SQL statement */
    
    sqlite3_stmt *res;
    int rc = 0;
    CCLOG("this->pathToSQLConnection %s", this->pathToSQLConnection.c_str());
    const char* querySQL =  "SELECT WORD_IN_ENGLISH, UTF_CONVERSION FROM LANG_SPECIFIC_WORD_MAPPINGS WHERE WORD_IN_ENGLISH = @wordName COLLATE NOCASE";
    
    
    /* Execute SQL statement */
    
    rc = sqlite3_prepare_v2(this->dataBaseConnection, querySQL, -1, &res, 0);
    
    if (rc == SQLITE_OK) {
        
        int wordName_Index = sqlite3_bind_parameter_index(res, "@wordName");
        sqlite3_bind_text(res, wordName_Index, word,-1, SQLITE_TRANSIENT);
        
    } else {
        fprintf(stderr, "Failed to execute statement: %s\n", sqlite3_errmsg(this->dataBaseConnection));
    }
    
    WordInfo* wordInfo = NULL;
    
    while(sqlite3_step(res) == SQLITE_ROW)
    {
        wordInfo = new WordInfo();
        std::string wordInEnglish( reinterpret_cast< char const* >(sqlite3_column_text(res, 0))) ;
        wordInfo->setWordInEnglish(wordInEnglish);
        
        
        std::string utfConversion( reinterpret_cast< char const* >(sqlite3_column_text(res, 1))) ;
        wordInfo->setUtfConversion(utfConversion);
        
    }
    
    sqlite3_finalize(res);
    
    return wordInfo;
}


bool WordManager::closeConnection() {
    //close connection
    sqlite3_close(this->dataBaseConnection);
    return true;
}
