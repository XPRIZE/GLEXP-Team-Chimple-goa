//
//  EnglishUtil.cpp
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#include "EnglishUtil.h"


static const wchar_t* const allCharacters = L"ABCDEFGHIJKLMNOPQRSTUVWXYZ" ;

const wchar_t* EnglishUtil::getAllCharacters() {
    return allCharacters;
}

int EnglishUtil::getNumberOfCharacters() {
    return 26;
}

std::string EnglishUtil::getMonsterAnimationFileName(wchar_t alpha) {
    return std::string("english/")+ convertUTF16CharToString(alpha) +".csb";
}

std::string EnglishUtil::getBMFontFileName() {
    return "english/baloo_bhai_hdr.fnt";
}

EnglishUtil::EnglishUtil() {
    
}

EnglishUtil::~EnglishUtil() {
    
}