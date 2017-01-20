//
//  KannadaUtil.cpp
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#include "KannadaUtil.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
static const char* audioExt = ".wav";
#else
static const char* audioExt = ".m4a";
#endif

static const char* pronounciationAudioExt = ".ogg";

static const std::map<wchar_t, std::string> langMap = {
    {L'\x0c85',"a"},
    {L'\x0c86',"aa"},
    {L'\x0c87',"i"},
    {L'\x0c88',"ii"},
    {L'\x0c89',"u"},
    {L'\x0C8A',"uu"},
    {L'\x0C8B',"ru"},
    {L'\x0C8E',"ae"},
    {L'\x0C8F',"aee"},
    {L'\x0C90',"ai"},
    {L'\x0C92',"o"},
    {L'\x0C93',"oo"},
    {L'\x0C94',"au"},
    {L'\x0C95',"ka"},
    {L'\x0C96',"kha"},
    {L'\x0C97',"ga"},
    {L'\x0C98',"gha"},
    {L'\x0C99',"nga"},
    {L'\x0C9A',"cha"},
    {L'\x0C9B',"chha"},
    {L'\x0C9C',"ja"},
    {L'\x0C9D',"jha"},
    {L'\x0C9E',"naa"},
    {L'\x0C9F',"tya"},
    {L'\x0CA0',"tyha"},
    {L'\x0CA1',"dya"},
    {L'\x0CA2',"dyha"},
    {L'\x0CA3',"nya"},
    {L'\x0CA4',"ta"},
    {L'\x0CA5',"tha"},
    {L'\x0CA6',"da"},
    {L'\x0CA7',"dha"},
    {L'\x0CA8',"na"},
    {L'\x0CAA',"pa"},
    {L'\x0CAB',"pha"},
    {L'\x0CAC',"ba"},
    {L'\x0CAD',"bha"},
    {L'\x0CAE',"ma"},
    {L'\x0CAF',"ya"},
    {L'\x0CB0',"ra"},
    {L'\x0CB2',"la"},
    {L'\x0CB5',"va"},
    {L'\x0CB6',"sya"},
    {L'\x0CB7',"saa"},
    {L'\x0CB8',"sa"},
    {L'\x0CB9',"ha"},
    {L'\x0CB3',"lya"}
};

static const std::map<std::string, std::string> stringLangMap = {
    {"ಅ","a"},
    {"ಆ","aa"},
    {"ಇ","i"},
    {"ಈ","ii"},
    {"ಉ","u"},
    {"ಊ","uu"},
    {"ಋ","ru"},
    {"ೠ","ruu"},
    {"ಎ","ae"},
    {"ಏ","aee"},
    {"ಐ","ai"},
    {"ಒ","o"},
    {"ಓ","oo"},
    {"ಔ","au"},
    {"ಂ","am"},
    {"ಃ", "aha"},
    {"ಕ","ka"},
    {"ಖ","kha"},
    {"ಗ","ga"},
    {"ಘ","gha"},
    {"ಙ","nga"},
    {"ಚ","cha"},
    {"ಛ","chha"},
    {"ಜ","ja"},
    {"ಝ","jha"},
    {"ಞ","naa"},
    {"ಟ","tya"},
    {"ಠ","tyha"},
    {"ಡ","dya"},
    {"ಢ","dyha"},
    {"ಣ","nya"},
    {"ತ","ta"},
    {"ಥ","tha"},
    {"ದ","da"},
    {"ಧ","dha"},
    {"ನ","na"},
    {"ಪ","pa"},
    {"ಫ","pha"},
    {"ಬ","ba"},
    {"ಭ","bha"},
    {"ಮ","ma"},
    {"ಯ","ya"},
    {"ರ","ra"},
    {"ಲ","la"},
    {"ವ","va"},
    {"ಶ","sya"},
    {"ಷ","saa"},
    {"ಸ","sa"},
    {"ಹ","ha"},
    {"ಳ","lya"}
};



const wchar_t* KannadaUtil::getAllCharacters() {
    static const wchar_t* allKannadaCharacters = L"\x0c85\x0c86\x0c87\x0c88\x0c89\x0C8A\x0C8B\x0C8E\x0C8F\x0C90\x0C92\x0C93\x0C94\x0C95\x0C96\x0C97\x0C98\x0C99\x0C9A\x0C9B\x0C9C\x0C9D\x0C9E\x0C9F\x0CA0\x0CA1\x0CA2\x0CA3\x0CA4\x0CA5\x0CA6\x0CA7\x0CA8\x0CAA\x0CAB\x0CAC\x0CAD\x0CAE\x0CAF\x0CB0\x0CB2\x0CB5\x0CB6\x0CB7\x0CB8\x0CB9\x0CB3";
    return allKannadaCharacters;
}


int KannadaUtil::getNumberOfCharacters() {
    return 47;
}

const wchar_t* KannadaUtil::getAllLowerCaseCharacters() {
    return getAllCharacters();
}

const wchar_t* KannadaUtil::getAllNumbers() {
    static const wchar_t* allKannadaCharacters = L"\x0ce6\x0ce7\x0ce8\x0ce9\x0cea\x0ceb\x0cec\x0ced\x0cee\x0cef";
    return allKannadaCharacters;
}


const std::vector<int> KannadaUtil::getNumCharsInRows() {
    static const int kn[] = {13, 5, 5, 5, 5, 5, 9};
    static const std::vector<int> kannadaNumCharsInRows(kn, kn + 7);
    return kannadaNumCharsInRows;
}


std::string KannadaUtil::getMonsterAnimationFileName(wchar_t alpha) {
 
    return std::string("kannada/")+ langMap.at(alpha) +".csb";
}

std::string KannadaUtil::getSpecialAnimationFileName(wchar_t alpha, std::string suffix) {
    return std::string("kannada/") + suffix + "/" + langMap.at(alpha) +".csb";
}


std::string KannadaUtil::getBMFontFileName() {
    return "kannada/kar shivarama.fnt";
}

std::string KannadaUtil::getAlphabetSoundFileName(wchar_t alpha) {
	auto fileName = std::string("kannada/sounds/") + langMap.at(alpha) + audioExt;
	return fileName; 
}

std::string KannadaUtil::getPhoneticSoundFileName(wchar_t alpha) {
    auto fileName = std::string("kannada/sounds/") + langMap.at(alpha) + audioExt;
    return fileName;
}

std::string KannadaUtil::getAlphabetSoundFileNameForString(std::string alpha) {
    if(stringLangMap.find(alpha) != stringLangMap.end()) {
        auto fileName = std::string("kannada/sounds/") + stringLangMap.at(alpha) + audioExt;
        return fileName;
    }
    return "";
}

std::string KannadaUtil::getPhoneticSoundFileNameForString(std::string alpha) {
    auto fileName = std::string("kannada/sounds/") + stringLangMap.at(alpha) + audioExt;
    return fileName;
}

bool KannadaUtil::isGraphemeStart(uint32_t prevCodePoint, uint32_t currentCodePoint) {
    if(prevCodePoint == 0x0CCD) {
        return false;
    }
    if(currentCodePoint >= 0x0C82 && currentCodePoint <= 0x0CB9) {
        return true;
    }
    return false;
}

std::string KannadaUtil::getDir()
{
	return "kannada";
}

std::string KannadaUtil::getLang() {
    return "kan";
}

std::string KannadaUtil::getPronounciationFileNameForWord(std::string word) {
    std::replace(word.begin(), word.end(), ' ', '_');
    std::transform(word.begin(), word.end(), word.begin(), ::tolower);
    auto fileName = std::string("kannada/audio/words/") + word + pronounciationAudioExt;
    return fileName;
}

bool KannadaUtil::isTextToSpeechSupported() {
    return false;
}


KannadaUtil::KannadaUtil() {
    this->initializeWordManager();
}

KannadaUtil::~KannadaUtil() {
}

void KannadaUtil::initializeWordManager() {
    this->wordManager = WordManager::getInstance();
}
