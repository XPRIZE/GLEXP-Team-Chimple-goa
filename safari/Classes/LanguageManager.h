//
//  LanguageManager.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 24/07/16.
//
//

#include <stdio.h>
#include "cocos2d.h"
#include "RPGConfig.h"
#include "lang/LangUtil.h"
#include "I18nUtils.h"

USING_NS_CC;

#ifndef LanguageManager_h
#define LanguageManager_h

class LanguageManager {
private:
    LanguageManager(); // constructor is private
public:
    ~LanguageManager();
    static LanguageManager* _instance;
    static LanguageManager* getInstance();
    std::string translateString(std::string input);
    void changeLanguage(SupportedLanguages lang);
    std::string translateParameterizedString(std::string input, std::string param);
    std::string translateTwoParameterizedString(std::string parameterizedString, std::string substituteString1, std::string substituteString2);
};


#endif /* LanguageManager_h */
