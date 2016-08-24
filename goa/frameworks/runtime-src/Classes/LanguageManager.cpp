//
//  LanguageManager.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 24/07/16.
//
//

#include "LanguageManager.h"

LanguageManager* LanguageManager::_instance = 0;


LanguageManager::LanguageManager()
{
    I18N::I18nUtils::getInstance();
}

LanguageManager::~LanguageManager()
{
    I18N::I18nUtils::destroyInstance();
}


LanguageManager* LanguageManager::getInstance()

{
    if(!_instance)
        
        _instance = new LanguageManager();
    
    return _instance;
    
}

std::string LanguageManager::translateString(std::string input) {
    return I18N::__(input);
}

void LanguageManager::changeLanguage(SupportedLanguages lang) {
    switch (lang) {
        case SupportedLanguages::ENGLISH:
        {
            break;
        }
            
        case SupportedLanguages::KANNADA:
        {
            Data kannadaMoData = FileUtils::getInstance()->getDataFromFile("res/de.mo");
            I18N::I18nUtils::getInstance()->addMO(kannadaMoData.getBytes());
            break;
        }
            
        case SupportedLanguages::GERMAN:
        {
            Data germanMoData = FileUtils::getInstance()->getDataFromFile("res/de.mo");
            I18N::I18nUtils::getInstance()->addMO(germanMoData.getBytes());
            break;
        }
            
            
        default:
            break;
    }
}


//"You have chosen the %s1 hat.
std::string LanguageManager::translateParameterizedString(std::string parameterizedString, std::string substituteString) {
    return I18N::i18nFormatStr(translateString(parameterizedString),translateString(substituteString).c_str());
}

//"There are birds %s1 in the %s2."
std::string LanguageManager::translateTwoParameterizedString(std::string parameterizedString, std::string substituteString1, std::string substituteString2) {
    
    return I18N::i18nFormatStr(translateString(parameterizedString), translateString(substituteString1).c_str(), translateString(substituteString2).c_str());
}

