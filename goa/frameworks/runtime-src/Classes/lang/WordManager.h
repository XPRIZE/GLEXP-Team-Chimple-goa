//
//  WordManager.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 06/08/16.
//
//

#include <stdio.h>
#include <time.h>
#include "../sqlite3/sqlite3.h"
#include "cocos2d.h"
#include "LangUtil.h"
#include "WordInfo.h"

#ifndef WordManager_h
#define WordManager_h


class WordManager {
public:
    static void destroyInstance();
    static WordManager* getInstance();
    virtual ~WordManager();
    virtual bool init();    
    virtual WordInfo* loadLanguageSpecificWordMappingForAWord(const char* word);
    
private:
    WordManager();
    bool openConnection(std::string pathToSQLConnection);
    bool closeConnection();
    std::string pathToSQLConnection;
    sqlite3 *dataBaseConnection;
};

#endif /* WordManager_h */
