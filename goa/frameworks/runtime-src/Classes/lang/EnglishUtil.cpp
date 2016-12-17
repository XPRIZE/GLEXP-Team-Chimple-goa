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

static const char* pronounciationAudioExt = ".ogg";

static const wchar_t* const allCharacters = L"ABCDEFGHIJKLMNOPQRSTUVWXYZ" ;

const wchar_t* EnglishUtil::getAllCharacters() {
    return allCharacters;
}

int EnglishUtil::getNumberOfCharacters() {
    return 26;
}

const std::vector<int> EnglishUtil::getNumCharsInRows() {
    static const int en[] = {26};
    static const std::vector<int> englishNumCharsInRows(en, en + 1);
    return englishNumCharsInRows;
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

std::string EnglishUtil::getAlphabetSoundFileNameForString(std::string alpha) {
    std::transform(alpha.begin(), alpha.end(), alpha.begin(), ::tolower);
    auto fileName = std::string("english/sounds/") + alpha + audioExt;
    return fileName;
}

std::string EnglishUtil::getPhoneticSoundFileNameForString(std::string alpha) {
    std::transform(alpha.begin(), alpha.end(), alpha.begin(), ::tolower);
    auto fileName = std::string("english/sounds/") + alpha + audioExt;
    return fileName;
}

bool EnglishUtil::isGraphemeStart(uint32_t prevCodePoint, uint32_t currentCodePoint) {
    return true;
}


std::string EnglishUtil::getPronounciationFileNameForWord(std::string word) {
    std::transform(word.begin(), word.end(), word.begin(), ::tolower);
    auto fileName = std::string("english/audio/words/") + word + pronounciationAudioExt;
    return fileName;
}


bool EnglishUtil::isTextToSpeechSupported() {
    return true;
}

std::string EnglishUtil::getDir() {
    return "english";
}

std::string EnglishUtil::getLang() {
    return "eng";
}

EnglishUtil::EnglishUtil() {
    this->initializeWordManager();
}

EnglishUtil::~EnglishUtil() {    
}


void EnglishUtil::initializeWordManager() {
    this->wordManager = WordManager::getInstance();
}
