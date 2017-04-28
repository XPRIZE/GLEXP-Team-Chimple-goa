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
static const char* audioExt = ".ogg";
#endif

static const char* pronounciationAudioExt = ".ogg";

static const wchar_t* const allCharacters = L"ABCDEFGHIJKLMNOPRSTUVWYZ" ;
static const wchar_t* const allLowerCaseCharacters = L"abcdefghijklmnoprstuvwyz" ;
static const wchar_t* const allNumbers = L"0123456789" ;

const wchar_t* SwahiliUtil::getAllCharacters() {
    return allCharacters;
}

int SwahiliUtil::getNumberOfCharacters() {
    return 24;
}

const wchar_t* SwahiliUtil::getAllLowerCaseCharacters() {
    return allLowerCaseCharacters;
}

const wchar_t* SwahiliUtil::getAllNumbers() {
    return allNumbers;
}

const std::vector<int> SwahiliUtil::getNumCharsInRows() {
    static const int en[] = {24};
    static const std::vector<int> SwahiliNumCharsInRows(en, en + 1);
    return SwahiliNumCharsInRows;
}

std::string SwahiliUtil::getMonsterAnimationFileName(wchar_t alpha) {
    return std::string("lang/swa/") + convertUTF16CharToString(alpha) +".csb";
}

std::string SwahiliUtil::getSpecialAnimationFileName(wchar_t alpha, std::string suffix) {
    return std::string("lang/swa/") + suffix + "/" + convertUTF16CharToString(alpha) +".csb";
}

std::string SwahiliUtil::getBMFontFileName() {
    return "lang/swa/baloo_bhai_common.fnt";
}

std::string SwahiliUtil::getAlphabetSoundFileName(wchar_t alpha) {
    auto lowerCase = tolower(alpha);
    auto someString = convertUTF16CharToString(lowerCase);
    auto fileName = std::string("lang/swa/sounds/") + someString + audioExt;
    return fileName;
}

std::string SwahiliUtil::getPhoneticSoundFileName(wchar_t alpha) {
    auto fileName = std::string("lang/swa/sounds/") + convertUTF16CharToString(tolower(alpha)) + audioExt;
    return fileName;
}

std::string SwahiliUtil::getAlphabetSoundFileNameForString(std::string alpha) {
    std::transform(alpha.begin(), alpha.end(), alpha.begin(), ::tolower);
    auto fileName = std::string("lang/swa/sounds/") + alpha + audioExt;
    return fileName;
}

std::string SwahiliUtil::getPhoneticSoundFileNameForString(std::string alpha) {
    std::transform(alpha.begin(), alpha.end(), alpha.begin(), ::tolower);
    auto fileName = std::string("lang/swa/audio/phonetic/") + alpha + pronounciationAudioExt;
    return fileName;
}

bool SwahiliUtil::isGraphemeStart(uint32_t prevCodePoint, uint32_t currentCodePoint) {
    return true;
}


std::string SwahiliUtil::getPronounciationFileNameForWord(std::string word) {
    std::replace(word.begin(), word.end(), ' ', '_');
    std::transform(word.begin(), word.end(), word.begin(), ::tolower);
    auto fileName = std::string("lang/swa/audio/words/") + word + pronounciationAudioExt;
    return fileName;
}


bool SwahiliUtil::isTextToSpeechSupported() {
    return false;
}


std::string SwahiliUtil::getDir() {
    return "lang/swa";
}

std::string SwahiliUtil::getLang() {
    return "swa";
}

SwahiliUtil::SwahiliUtil() {
    this->initializeWordManager();
    Data moData = FileUtils::getInstance()->getDataFromFile("res/lang/swa/swa.mo");
    I18N::I18nUtils::getInstance()->removeAllMO();
    I18N::I18nUtils::getInstance()->addMO(moData.getBytes());
    
}

SwahiliUtil::~SwahiliUtil() {
}


void SwahiliUtil::initializeWordManager() {
    this->wordManager = WordManager::getInstance();
}
