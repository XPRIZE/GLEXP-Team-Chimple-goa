//
//  KannadaUtil.h
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#ifndef KannadaUtil_h
#define KannadaUtil_h

#include "LangUtil.h"
#include "WordManager.h"

class KannadaUtil : public LangUtil {
public:
    virtual const wchar_t* getAllCharacters() override;
    virtual int getNumberOfCharacters() override;
    virtual const std::vector<int> getNumCharsInRows() override;
    virtual std::string getMonsterAnimationFileName(wchar_t alpha) override;
    virtual std::string getSpecialAnimationFileName(wchar_t alpha, std::string suffix) override;
    virtual std::string getBMFontFileName() override;
    virtual std::string getAlphabetSoundFileName(wchar_t alpha) override;
    virtual std::string getPhoneticSoundFileName(wchar_t alpha) override;
    virtual std::string getDir() override;
    virtual std::string getLang() override;
    virtual void initializeWordManager() override;
    virtual ~KannadaUtil();
    KannadaUtil();    
};

#endif /* KannadaUtil_h */
