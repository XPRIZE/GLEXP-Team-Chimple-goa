//
//  LangUtil.h
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#ifndef LangUtil_h
#define LangUtil_h
#include "cocos2d.h"
#include "../hero/RPGConfig.h"
#include "../i18n/I18nUtils.h"
#include "WordInfo.h"

class WordManager;
class LangUtil {
public:
    static LangUtil* _instance;
    static std::string convertUTF16CharToString(wchar_t alpha);
    static wchar_t convertStringToUTF16Char(std::string alphaString);
    static LangUtil* getInstance();
    
    virtual ~LangUtil();
    virtual const wchar_t* getAllCharacters() = 0;
    virtual int getNumberOfCharacters() = 0;
    virtual const wchar_t* getAllLowerCaseCharacters() = 0;
    virtual const wchar_t* getAllNumbers() = 0;
    virtual const std::vector<int> getNumCharsInRows() = 0;
    virtual std::string getMonsterAnimationFileName(std::string alpha) = 0;
    virtual std::string getSpecialAnimationFileName(wchar_t alpha, std::string suffix) =0;
    virtual std::string getBMFontFileName() = 0;
    virtual std::string getAlphabetSoundFileName(wchar_t alpha) = 0;
    virtual std::string getPhoneticSoundFileName(wchar_t alpha) = 0;
    virtual std::string getAlphabetSoundFileNameForString(std::string alpha) = 0;
    virtual std::string getPhoneticSoundFileNameForString(std::string alpha) = 0;
    virtual std::string getLang() = 0;
    virtual std::string getDir() = 0;
    virtual void initializeWordManager() = 0;
    virtual WordInfo* loadLanguageSpecificWordMappingForAWord(const char* word);
    virtual bool isGraphemeStart(uint32_t prevCodePoint, uint32_t currentCodePoint) = 0;
    std::string translateString(std::string input);
    void changeLanguage(SupportedLanguages lang);
    std::string translateParameterizedString(std::string input, std::string param);
    std::string translateTwoParameterizedString(std::string parameterizedString, std::string substituteString1, std::string substituteString2);
    
    virtual std::string getPronounciationFileNameForWord(std::string word) = 0;
    virtual bool isTextToSpeechSupported() = 0;
    virtual std::string getFontFile();
    
protected:
    LangUtil();
    WordManager* wordManager;
    SupportedLanguages currentLanguage;
};

#endif /* LangUtil_h */
