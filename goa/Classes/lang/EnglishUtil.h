//
//  EnglishUtil.h
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#ifndef EnglishUtil_h
#define EnglishUtil_h

#include "LangUtil.h"
#include "WordManager.h"

class EnglishUtil : public LangUtil {
public:
    virtual const wchar_t* getAllCharacters() override;
    virtual int getNumberOfCharacters() override;
    virtual const wchar_t* getAllLowerCaseCharacters() override;
    virtual const wchar_t* getAllNumbers() override;
    virtual const std::vector<int> getNumCharsInRows() override;
    virtual std::string getMonsterAnimationFileName(std::string alpha) override;
    virtual std::string getSpecialAnimationFileName(wchar_t alpha, std::string suffix) override;    
    virtual std::string getBMFontFileName() override;
    virtual std::string getAlphabetSoundFileName(wchar_t alpha) override;
    virtual std::string getPhoneticSoundFileName(wchar_t alpha) override;
    virtual std::string getPhoneticSoundFileNameForString(std::string alpha) override;
    virtual std::string getAlphabetSoundFileNameForString(std::string alpha) override;
    virtual std::string getLang() override;
    virtual std::string getDir() override;
    virtual void initializeWordManager() override;
    virtual bool isGraphemeStart(uint32_t prevCodePoint, uint32_t currentCodePoint)override;
    
    virtual std::string getPronounciationFileNameForWord(std::string word) override;
    virtual bool isTextToSpeechSupported() override;

    virtual ~EnglishUtil();
    EnglishUtil();
};

#endif /* EnglishUtil_h */
