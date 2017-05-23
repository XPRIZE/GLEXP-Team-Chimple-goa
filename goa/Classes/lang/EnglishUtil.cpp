//
//  EnglishUtil.cpp
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#include "EnglishUtil.h"
#include "ctype.h"

USING_NS_CC;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
static const char* audioExt = ".wav";
#else
static const char* audioExt = ".m4a";
#endif

static const char* pronounciationAudioExt = ".ogg";

static const wchar_t* const allCharacters = L"ABCDEFGHIJKLMNOPQRSTUVWXYZ" ;
static const wchar_t* const allLowerCaseCharacters = L"abcdefghijklmnopqrstuvwxyz" ;
static const wchar_t* const allNumbers = L"0123456789" ;

const wchar_t* EnglishUtil::getAllLowerCaseCharacters() {
    return allLowerCaseCharacters;
}

const wchar_t* EnglishUtil::getAllNumbers() {
    return allNumbers;
}

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
    return std::string("lang/eng/") + convertUTF16CharToString(alpha) +".csb";
}

std::string EnglishUtil::getSpecialAnimationFileName(wchar_t alpha, std::string suffix) {
    return std::string("lang/eng/") + suffix + "/" + convertUTF16CharToString(alpha) +".csb";
}

std::string EnglishUtil::getBMFontFileName() {
    return "lang/eng/baloo_bhai_common.fnt";
}

std::string EnglishUtil::getAlphabetSoundFileName(wchar_t alpha) {
	auto lowerCase = tolower(alpha);
	auto someString = convertUTF16CharToString(lowerCase);
    auto fileName = std::string("lang/eng/sounds/") + someString + audioExt;
	return fileName;
}

std::string EnglishUtil::getPhoneticSoundFileName(wchar_t alpha) {
    auto fileName = std::string("lang/eng/sounds/") + convertUTF16CharToString(tolower(alpha)) + audioExt;
    return fileName;
}

std::string EnglishUtil::getAlphabetSoundFileNameForString(std::string alpha) {
    std::transform(alpha.begin(), alpha.end(), alpha.begin(), ::tolower);
    auto fileName = std::string("lang/eng/sounds/") + alpha + audioExt;
    return fileName;
}

std::string EnglishUtil::getPhoneticSoundFileNameForString(std::string alpha) {
    std::transform(alpha.begin(), alpha.end(), alpha.begin(), ::tolower);
    auto fileName = std::string("lang/eng/audio/phonetic/") + alpha + pronounciationAudioExt;
    return fileName;
}

bool EnglishUtil::isGraphemeStart(uint32_t prevCodePoint, uint32_t currentCodePoint) {
    return true;
}


std::string EnglishUtil::getPronounciationFileNameForWord(std::string word) {
    std::replace(word.begin(), word.end(), ' ', '_');
    std::transform(word.begin(), word.end(), word.begin(), ::tolower);
    
    char ch = word.back();
    if(ch == '.')
    {
        word = word.substr(0, word.size()-1);
    }    

    auto fileName = std::string("lang/eng/audio/words/") + word + pronounciationAudioExt;
    return fileName;
}


bool EnglishUtil::isTextToSpeechSupported() {
    return true;
}

std::string EnglishUtil::getDir() {
    return "lang/eng";
}

std::string EnglishUtil::getLang() {
    return "eng";
}

EnglishUtil::EnglishUtil() {
    this->initializeWordManager();
    Data moData = FileUtils::getInstance()->getDataFromFile("res/lang/eng/eng.mo");
    I18N::I18nUtils::getInstance()->removeAllMO();
    I18N::I18nUtils::getInstance()->addMO(moData.getBytes());
}

EnglishUtil::~EnglishUtil() {    
}


void EnglishUtil::initializeWordManager() {
    this->wordManager = WordManager::getInstance();
}
