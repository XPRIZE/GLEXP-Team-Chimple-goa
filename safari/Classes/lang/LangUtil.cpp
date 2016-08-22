//
//  LangUtil.cpp
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#include "LangUtil.h"
#include "EnglishUtil.h"
#include "KannadaUtil.h"
#include "cocos2d.h"

USING_NS_CC;
LangUtil* LangUtil::_instance = 0;

LangUtil::LangUtil() {
    I18N::I18nUtils::getInstance();
}

LangUtil::~LangUtil() {
    
}

LangUtil* LangUtil::getInstance() {
    if(!_instance) {
        _instance = new KannadaUtil();
        auto ss = FileUtils::getInstance()->getStringFromFile(_instance->getDir() + "/words.txt");
        std::stringstream stream(ss);
        std::string line;
        while (std::getline(stream, line)) {
            _instance->_wordList.push_back(line);
        }
    }
    return _instance;
}

std::string LangUtil::convertUTF16CharToString(wchar_t alpha) {
    std::u16string u16s = std::u16string(1, alpha);
    std::string u8;
    cocos2d::StringUtils::UTF16ToUTF8(u16s, u8);
    return u8;
}

wchar_t LangUtil::convertStringToUTF16Char(std::string alphaString) {
    return alphaString.c_str()[0];
}

std::string LangUtil::getAWord() {
    return _wordList.at(rand() % _wordList.size());
}


std::string LangUtil::translateString(std::string input) {
    return I18N::__(input);
}

void LangUtil::changeLanguage(SupportedLanguages lang) {
    
    if(this->wordManager != NULL) {
        delete this->wordManager;
        WordManager::destroyInstance();
    }
    
    switch (lang) {
        case SupportedLanguages::ENGLISH:
        {
            LangUtil::_instance = new EnglishUtil();
            break;
        }
            
        case SupportedLanguages::KANNADA:
        {
            LangUtil::_instance = new KannadaUtil();
            Data kannadaMoData = FileUtils::getInstance()->getDataFromFile("res/de.mo");
            I18N::I18nUtils::getInstance()->addMO(kannadaMoData.getBytes());
            break;
        }
        case SupportedLanguages::GERMAN:
        {
            LangUtil::_instance = new KannadaUtil();
            Data germanMoData = FileUtils::getInstance()->getDataFromFile("res/de.mo");
            I18N::I18nUtils::getInstance()->addMO(germanMoData.getBytes());
            break;
        }

            
        default:
            break;
    }
}


//"You have chosen the %s1 hat.
std::string LangUtil::translateParameterizedString(std::string parameterizedString, std::string substituteString) {
    return I18N::i18nFormatStr(translateString(parameterizedString),translateString(substituteString).c_str());
}

//"There are birds %s1 in the %s2."
std::string LangUtil::translateTwoParameterizedString(std::string parameterizedString, std::string substituteString1, std::string substituteString2) {
    
    return I18N::i18nFormatStr(translateString(parameterizedString), translateString(substituteString1).c_str(), translateString(substituteString2).c_str());
}


WordInfo* LangUtil::loadLanguageSpecificWordMappingForAWord(const char* word) {
    return this->wordManager->loadLanguageSpecificWordMappingForAWord(word);
}

