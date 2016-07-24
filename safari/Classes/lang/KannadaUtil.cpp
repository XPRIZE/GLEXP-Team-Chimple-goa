//
//  KannadaUtil.cpp
//  safari
//
//  Created by Srikanth Talapadi on 23/07/16.
//
//

#include "KannadaUtil.h"

static const std::map<wchar_t, std::string> langMap = {
    {L'ಅ',"a"},
    {L'ಆ',"aa"},
    {L'ಇ',"i"},
    {L'ಈ',"ii"},
    {L'ಉ',"u"},
    {L'ಊ',"uu"},
    {L'ಋ',"ru"},
    {L'ಌ',"ruu"},
    {L'ಎ',"ae"},
    {L'ಏ',"aee"},
    {L'ಐ',"ai"},
    {L'ಒ',"o"},
    {L'ಓ',"oo"},
    {L'ಔ',"au"},
    {L'ಕ',"ka"},
    {L'ಖ',"khs"},
    {L'ಗ',"ga"},
    {L'ಘ',"gha"},
    {L'ಙ',"nga"},
    {L'ಚ',"cha"},
    {L'ಛ',"chha"},
    {L'ಜ',"ja"},
    {L'ಝ',"jha"},
    {L'ಞ',"nya"},
    {L'ಟ',"tya"},
    {L'ಠ',"tyha"},
    {L'ಡ',"dya"},
    {L'ಢ',"dyha"},
    {L'ಣ',"naa"},
    {L'ತ',"ta"},
    {L'ಥ',"tha"},
    {L'ದ',"da"},
    {L'ಧ',"dha"},
    {L'ನ',"na"},
    {L'ಪ',"pa"},
    {L'ಫ',"pha"},
    {L'ಬ',"ba"},
    {L'ಭ',"bha"},
    {L'ಮ',"ma"},
    {L'ಯ',"ya"},
    {L'ರ',"ra"},
    {L'ಲ',"la"},
    {L'ವ',"va"},
    {L'ಶ',"sya"},
    {L'ಷ',"saa"},
    {L'ಸ',"sa"},
    {L'ಹ',"ha"},
    {L'ಳ',"lya"}
};


const wchar_t* KannadaUtil::getAllCharacters() {
    static const wchar_t* allCharacters = L"ಅಆಇಈಉಊಋಌಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಱಲಳವಶಷಸಹ";
    return allCharacters;
}

int KannadaUtil::getNumberOfCharacters() {
    return 49;
}

std::string KannadaUtil::getMonsterAnimationFileName(wchar_t alpha) {
 
    return std::string("Kannada/")+ langMap.at(alpha) +".csb";
}

std::string KannadaUtil::getBMFontFileName() {
    return "kannada/kar shivarama.fnt";
}

const char* KannadaUtil::getAlphabetSoundFileName(wchar_t alpha) {
    auto fileName = std::string("kannada/sounds/") + langMap.at(alpha) +".m4a";
    return fileName.c_str();
}

const char* KannadaUtil::getPhoneticSoundFileName(wchar_t alpha) {
    auto fileName = std::string("kannada/sounds/") + langMap.at(alpha) +".m4a";
    return fileName.c_str();
}


KannadaUtil::KannadaUtil() {
    
}

KannadaUtil::~KannadaUtil() {
    
}