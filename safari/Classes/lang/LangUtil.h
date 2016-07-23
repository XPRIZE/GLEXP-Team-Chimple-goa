//
//  LangUtil.h
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#ifndef LangUtil_h
#define LangUtil_h

class LangUtil {
public:
    static std::string convertUTF16CharToString(wchar_t alpha);
    static LangUtil* getInstance();
    virtual ~LangUtil();
    virtual const wchar_t* getAllCharacters() = 0;
    virtual int getNumberOfCharacters() = 0;
    virtual std::string getMonsterAnimationFileName(wchar_t alpha) = 0;
    virtual std::string getBMFontFileName() = 0;
protected:
    LangUtil();

};

#endif /* LangUtil_h */
