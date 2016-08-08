//
//  WordManager.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 06/08/16.
//
//

#include <stdio.h>
#include <time.h>
#include "sqlite3.h"
#include "cocos2d.h"
#include "LangUtil.h"

#ifndef WordManager_h
#define WordManager_h


class WordManager {
public:
    static void destroyInstance();
    static WordManager* getInstance();
    virtual ~WordManager();
    virtual bool init();
private:
    WordManager();
    bool openConnection(std::string pathToSQLConnection);
    bool closeConnection();
    
    sqlite3 *dataBaseConnection;
};

#endif /* WordManager_h */
