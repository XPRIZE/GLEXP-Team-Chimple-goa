//
//  SwahiliUtil.cpp
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#include "SwahiliUtil.h"
#include "ctype.h"

USING_NS_CC;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
static const char* audioExt = ".wav";
#else
static const char* audioExt = ".m4a";
#endif

static const char* pronounciationAudioExt = ".ogg";

static const wchar_t* const allCharacters = L"ABCDEFGHIJKLMNOPRSTUVWYZ" ;

const wchar_t* SwahiliUtil::getAllCharacters() {
    return allCharacters;
}

int SwahiliUtil::getNumberOfCharacters() {
    return 24;
}

const std::vector<int> SwahiliUtil::getNumCharsInRows() {
    static const int en[] = {24};
    static const std::vector<int> SwahiliNumCharsInRows(en, en + 1);
    return SwahiliNumCharsInRows;
}

std::string SwahiliUtil::getMonsterAnimationFileName(wchar_t alpha) {
    return std::string("english/") + convertUTF16CharToString(alpha) +".csb";
}

std::string SwahiliUtil::getSpecialAnimationFileName(wchar_t alpha, std::string suffix) {
    return std::string("english/") + suffix + "/" + convertUTF16CharToString(alpha) +".csb";
}

std::string SwahiliUtil::getBMFontFileName() {
    return "english/baloo_bhai_hdr.fnt";
}

std::string SwahiliUtil::getAlphabetSoundFileName(wchar_t alpha) {
    auto lowerCase = tolower(alpha);
    auto someString = convertUTF16CharToString(lowerCase);
    auto fileName = std::string("swahili/sounds/") + someString + audioExt;
    return fileName;
}

std::string SwahiliUtil::getPhoneticSoundFileName(wchar_t alpha) {
    auto fileName = std::string("swahili/sounds/") + convertUTF16CharToString(tolower(alpha)) + audioExt;
    return fileName;
}

std::string SwahiliUtil::getAlphabetSoundFileNameForString(std::string alpha) {
    std::transform(alpha.begin(), alpha.end(), alpha.begin(), ::tolower);
    auto fileName = std::string("swahili/sounds/") + alpha + audioExt;
    return fileName;
}

std::string SwahiliUtil::getPhoneticSoundFileNameForString(std::string alpha) {
    std::transform(alpha.begin(), alpha.end(), alpha.begin(), ::tolower);
    auto fileName = std::string("swahili/sounds/") + alpha + audioExt;
    return fileName;
}

bool SwahiliUtil::isGraphemeStart(uint32_t prevCodePoint, uint32_t currentCodePoint) {
    return true;
}


std::string SwahiliUtil::getPronounciationFileNameForWord(std::string word) {
    std::transform(word.begin(), word.end(), word.begin(), ::tolower);
    auto fileName = std::string("swahili/audio/words/") + word + pronounciationAudioExt;
    return fileName;
}


bool SwahiliUtil::isTextToSpeechSupported() {
    return false;
}


std::string SwahiliUtil::getDir() {
    return "swahili";
}

std::string SwahiliUtil::getLang() {
    return "swa";
}

SwahiliUtil::SwahiliUtil() {
    this->initializeWordManager();
    Data moData = FileUtils::getInstance()->getDataFromFile("res/swahili/swa.mo");
    I18N::I18nUtils::getInstance()->addMO(moData.getBytes());
}

SwahiliUtil::~SwahiliUtil() {
}


void SwahiliUtil::initializeWordManager() {
    this->wordManager = WordManager::getInstance();
}
