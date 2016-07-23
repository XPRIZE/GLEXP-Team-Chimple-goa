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

LangUtil::LangUtil() {
    
}

LangUtil::~LangUtil() {
    
}

LangUtil* LangUtil::getInstance() {
    static LangUtil* instance = new KannadaUtil();
    return instance;
}

std::string LangUtil::convertUTF16CharToString(wchar_t alpha) {
    std::u16string u16s = std::u16string(1, alpha);
    std::string u8;
    cocos2d::StringUtils::UTF16ToUTF8(u16s, u8);
    return u8;
}
