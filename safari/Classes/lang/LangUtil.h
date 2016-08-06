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
#include "RPGConfig.h"
#include "I18nUtils.h"

class LangUtil {
public:
    static LangUtil* _instance;
    static std::string convertUTF16CharToString(wchar_t alpha);
    static wchar_t convertStringToUTF16Char(std::string alphaString);
    static LangUtil* getInstance();
    
    virtual ~LangUtil();
    virtual const wchar_t* getAllCharacters() = 0;
    virtual int getNumberOfCharacters() = 0;
    virtual const std::vector<int> getNumCharsInRows() = 0;
    virtual std::string getMonsterAnimationFileName(wchar_t alpha) = 0;
    virtual std::string getSpecialAnimationFileName(wchar_t alpha, std::string suffix) =0;
    virtual std::string getBMFontFileName() = 0;
    virtual std::string getAlphabetSoundFileName(wchar_t alpha) = 0;
    virtual std::string getPhoneticSoundFileName(wchar_t alpha) = 0;
    virtual std::string getLang() = 0;
    virtual std::string getDir() = 0;
    
    
    std::string translateString(std::string input);
    void changeLanguage(SupportedLanguages lang);
    std::string translateParameterizedString(std::string input, std::string param);
    std::string translateTwoParameterizedString(std::string parameterizedString, std::string substituteString1, std::string substituteString2);

    
protected:
    LangUtil();
    
    SupportedLanguages currentLanguage;
};

#endif /* LangUtil_h */
