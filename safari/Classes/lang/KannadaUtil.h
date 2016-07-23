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

class KannadaUtil : public LangUtil {
public:
    virtual const wchar_t* getAllCharacters() override;
    virtual int getNumberOfCharacters() override;
    virtual std::string getMonsterAnimationFileName(wchar_t alpha) override;
    virtual std::string getBMFontFileName() override;
    virtual ~KannadaUtil();
    KannadaUtil();
};

#endif /* KannadaUtil_h */
