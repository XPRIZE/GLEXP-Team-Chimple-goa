//
//  TeluguUtil.cpp
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#include "TeluguUtil.h"
#include "ctype.h"

USING_NS_CC;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
static const char* audioExt = ".wav";
#else
static const char* audioExt = ".ogg";
#endif

static const char* pronounciationAudioExt = ".ogg";

static const std::map<wchar_t, std::string> langMap = {
    {L'\x0c05',"a"},
    {L'\x0c06',"aa"},
    {L'\x0c07',"i"},
    {L'\x0c08',"ii"},
    {L'\x0c09',"u"},
    {L'\x0C0A',"uu"},
    {L'\x0C0B',"ru"},
    {L'\x0C0E',"ae"},
    {L'\x0C0F',"aee"},
    {L'\x0C10',"ai"},
    {L'\x0C12',"o"},
    {L'\x0C13',"oo"},
    {L'\x0C14',"au"},
    {L'\x0C15',"ka"},
    {L'\x0C16',"kha"},
    {L'\x0C17',"ga"},
    {L'\x0C18',"gha"},
    {L'\x0C19',"nga"},
    {L'\x0C1A',"cha"},
    {L'\x0C1B',"chha"},
    {L'\x0C1C',"ja"},
    {L'\x0C1D',"jha"},
    {L'\x0C1E',"naa"},
    {L'\x0C1F',"tya"},
    {L'\x0C20',"tyha"},
    {L'\x0C21',"dya"},
    {L'\x0C22',"dyha"},
    {L'\x0C23',"nya"},
    {L'\x0C24',"ta"},
    {L'\x0C25',"tha"},
    {L'\x0C26',"da"},
    {L'\x0C27',"dha"},
    {L'\x0C28',"na"},
    {L'\x0C2A',"pa"},
    {L'\x0C2B',"pha"},
    {L'\x0C2C',"ba"},
    {L'\x0C2D',"bha"},
    {L'\x0C2E',"ma"},
    {L'\x0C2F',"ya"},
    {L'\x0C30',"ra"},
    {L'\x0C32',"la"},
    {L'\x0C35',"va"},
    {L'\x0C36',"sya"},
    {L'\x0C37',"saa"},
    {L'\x0C38',"sa"},
    {L'\x0C39',"ha"},
    {L'\x0C33',"lya"}
};

static const std::map<std::string, std::string> stringLangMap = {
    {"అ","a"},
    {"ఆ","aa"},
    {"ఇ","i"},
    {"ఈ","ii"},
    {"ఉ","u"},
    {"ఊ","uu"},
    {"ఋ","ru"},
    {"ఌ","ruu"},
    {"ఎ","ae"},
    {"ఏ","aee"},
    {"ఐ","ai"},
    {"ఒ","o"},
    {"ఓ","oo"},
    {"ఔ","au"},
    {"ಂ","am"},
    {"ಃ", "aha"},
    {"క","ka"},
    {"ఖ","kha"},
    {"గ","ga"},
    {"ఘ","gha"},
    {"ఙ","nga"},
    {"చ","cha"},
    {"ఛ","chha"},
    {"జ","ja"},
    {"ఝ","jha"},
    {"ఞ","naa"},
    {"ట","tya"},
    {"ఠ","tyha"},
    {"డ","dya"},
    {"ఢ","dyha"},
    {"ణ","nya"},
    {"త","ta"},
    {"థ","tha"},
    {"ద","da"},
    {"ధ","dha"},
    {"న","na"},
    {"ప","pa"},
    {"ఫ","pha"},
    {"బ","ba"},
    {"భ","bha"},
    {"మ","ma"},
    {"య","ya"},
    {"ర","ra"},
    {"ల","la"},
    {"వ","va"},
    {"శ","sya"},
    {"ష","saa"},
    {"స","sa"},
    {"హ","ha"},
    {"ళ","lya"}
};



const wchar_t* TeluguUtil::getAllCharacters() {
    static const wchar_t* allTeluguCharacters = L"\x0c05\x0c06\x0c07\x0c08\x0c09\x0C0A\x0C0B\x0C0E\x0C0F\x0C10\x0C12\x0C13\x0C14\x0C15\x0C16\x0C17\x0C18\x0C19\x0C1A\x0C1B\x0C1C\x0C1D\x0C1E\x0C1F\x0C20\x0C21\x0C22\x0C23\x0C24\x0C25\x0C26\x0C27\x0C28\x0C2A\x0C2B\x0C2C\x0C2D\x0C2E\x0C2F\x0C30\x0C32\x0C35\x0C36\x0C37\x0C38\x0C39\x0C33";
    return allTeluguCharacters;
}


int TeluguUtil::getNumberOfCharacters() {
    return 47;
}

const wchar_t* TeluguUtil::getAllLowerCaseCharacters() {
    return getAllCharacters();
}

const wchar_t* TeluguUtil::getAllNumbers() {
    static const wchar_t* allTeluguCharacters = L"\x0c66\x0c67\x0c68\x0c69\x0c6a\x0c6b\x0c6c\x0c6d\x0c6e\x0c6f";
    return allTeluguCharacters;
}


const std::vector<int> TeluguUtil::getNumCharsInRows() {
    static const int kn[] = {13, 5, 5, 5, 5, 5, 9};
    static const std::vector<int> teluguNumCharsInRows(kn, kn + 7);
    return teluguNumCharsInRows;
}


std::string TeluguUtil::getMonsterAnimationFileName(std::string alpha) {
    
    return std::string("lang/tel/") + alpha +".csb";
}

std::string TeluguUtil::getSpecialAnimationFileName(wchar_t alpha, std::string suffix) {
    return std::string("lang/swa/") + suffix + "/" + convertUTF16CharToString(alpha) +".csb";
}


std::string TeluguUtil::getBMFontFileName() {
    return "lang/tel/BalooTammudu.fnt";
}

std::string TeluguUtil::getAlphabetSoundFileName(wchar_t alpha) {
    auto lowerCase = tolower(alpha);
    auto someString = convertUTF16CharToString(lowerCase);
    auto fileName = std::string("lang/tel/sounds/") + someString + audioExt;
    return fileName;
}

std::string TeluguUtil::getPhoneticSoundFileName(wchar_t alpha) {
    auto fileName = std::string("lang/tel/sounds/") + convertUTF16CharToString(tolower(alpha)) + audioExt;
    return fileName;
}

std::string TeluguUtil::getAlphabetSoundFileNameForString(std::string alpha) {
    std::transform(alpha.begin(), alpha.end(), alpha.begin(), ::tolower);
    auto fileName = std::string("lang/tel/sounds/") + alpha + audioExt;
    return fileName;
}

std::string TeluguUtil::getPhoneticSoundFileNameForString(std::string alpha) {
    std::transform(alpha.begin(), alpha.end(), alpha.begin(), ::tolower);
    auto fileName = std::string("lang/tel/audio/phonetic/") + alpha + pronounciationAudioExt;
    return fileName;
}

bool TeluguUtil::isGraphemeStart(uint32_t prevCodePoint, uint32_t currentCodePoint) {
    if(prevCodePoint == 0x0C3D) {
        return false;
    }
    if(currentCodePoint >= 0x0C02 && currentCodePoint <= 0x0C39) {
        return true;
    }
    return false;
}

std::string TeluguUtil::getDir()
{
    return "lang/tel";
}

std::string TeluguUtil::getLang() {
    return "tel";
}

std::string TeluguUtil::getPronounciationFileNameForWord(std::string word) {
    std::replace(word.begin(), word.end(), ' ', '_');
    std::transform(word.begin(), word.end(), word.begin(), ::tolower);
    auto fileName = std::string("lang/tel/audio/words/") + word + pronounciationAudioExt;
    return fileName;
}

bool TeluguUtil::isTextToSpeechSupported() {
    return false;
}


TeluguUtil::TeluguUtil() {
    this->initializeWordManager();
    Data moData = FileUtils::getInstance()->getDataFromFile("res/lang/tel/tel.mo");
    I18N::I18nUtils::getInstance()->removeAllMO();
    I18N::I18nUtils::getInstance()->addMO(moData.getBytes());
}

TeluguUtil::~TeluguUtil() {
}

void TeluguUtil::initializeWordManager() {
    this->wordManager = WordManager::getInstance();
}

std::string TeluguUtil::getFontFile() {
    return "res/lang/tel/NotoSansTelugu-Regular.ttf";
}
