//
//  EnglishUtil.cpp
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#include "EnglishUtil.h"
#include "ctype.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
static const char* audioExt = ".wav";
#else
static const char* audioExt = ".m4a";
#endif

static const wchar_t* const allCharacters = L"ABCDEFGHIJKLMNOPQRSTUVWXYZ" ;

const wchar_t* EnglishUtil::getAllCharacters() {
    return allCharacters;
}

int EnglishUtil::getNumberOfCharacters() {
    return 26;
}

std::string EnglishUtil::getMonsterAnimationFileName(wchar_t alpha) {
    return std::string("english/") + convertUTF16CharToString(alpha) +".csb";
}

std::string EnglishUtil::getSpecialAnimationFileName(wchar_t alpha, std::string suffix) {
    return std::string("english/") + suffix + "/" + convertUTF16CharToString(alpha) +".csb";
}

std::string EnglishUtil::getBMFontFileName() {
    return "english/baloo_bhai_hdr.fnt";
}

std::string EnglishUtil::getAlphabetSoundFileName(wchar_t alpha) {
	auto lowerCase = tolower(alpha);
	auto someString = convertUTF16CharToString(lowerCase);
    auto fileName = std::string("english/sounds/") + someString + audioExt;
	return fileName;
}

std::string EnglishUtil::getPhoneticSoundFileName(wchar_t alpha) {
    auto fileName = std::string("english/sounds/") + convertUTF16CharToString(tolower(alpha)) + audioExt;
    return fileName;
}


EnglishUtil::EnglishUtil() {
    
}

EnglishUtil::~EnglishUtil() {
    
}