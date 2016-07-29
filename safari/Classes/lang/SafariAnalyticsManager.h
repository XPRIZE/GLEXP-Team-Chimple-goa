//
//  SafariAnalyticsManager.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 28/07/16.
//
//

#include <stdio.h>
#include <time.h>
#include "sqlite3.h"
#include "cocos2d.h"

#define ANALYTICS_CONNECTION_URL "res/analytics.db3"
#define ANALYTICS_DATABASE_NAME "analytics.db3"


#ifndef SafariAnalyticsManager_h
#define SafariAnalyticsManager_h

class SafariAnalyticsManager {
public:
    static SafariAnalyticsManager* getInstance();
    virtual ~SafariAnalyticsManager();
    virtual bool init();
    void insertAnalyticsInfo(const char* targetAlphabet, const char* chosenAlphabet, const char* appName);
    
private:
    SafariAnalyticsManager();
    bool openConnection(std::string pathToSQLConnection);
    bool closeConnection();
    
    sqlite3 *dataBaseConnection;

#endif /* SafariAnalyticsManager_h */

};