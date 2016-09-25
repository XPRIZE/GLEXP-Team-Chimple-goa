//
//  TextGenerator.cpp
//  safari
//
//  Created by Srikanth Talapadi on 05/08/16.
//
//

#include "TextGenerator.h"
#include "LangUtil.h"
#include "../ext/utf8.h"

static TextGenerator* _singletonTextGenerator = nullptr;

TextGenerator* TextGenerator::getInstance() {
    if(!_singletonTextGenerator)
    {
        _singletonTextGenerator = new (std::nothrow) TextGenerator();
    }
    return _singletonTextGenerator;

}


std::vector<std::vector<std::string>> TextGenerator::generateMatrix(std::string word, int numRows, int numCols) {
    auto allChars = getAllChars();
    auto wordVec = getGraphemes(word);
    int wordLength = wordVec.size();
    int matrixLength = numRows * numCols;
    auto locChars = getRandomLocations(wordLength, matrixLength);
    std::vector<std::vector<std::string>> matrix(numRows, std::vector<std::string>(numCols));
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            int numElement = numCols * i + j;
            auto iter = locChars.find(numElement);
            if(iter != locChars.end()) {
                matrix[i][j] = wordVec.at(iter->second);
            } else {
                matrix[i][j] = allChars[rand() % LangUtil::getInstance()->getNumberOfCharacters()];
            }
        }
    }
    return matrix;
}

std::map<int, int> TextGenerator::getRandomLocations(int numLoc, int totalNum) {
    std::map<int, int> locChars;
    if(numLoc > totalNum) {
        return locChars;
    }
    for (int i = 0; i < numLoc; i++) {
        auto randLoc = rand() % totalNum;
        for (auto iter = locChars.find(randLoc); iter != locChars.end(); iter = locChars.find(++randLoc % totalNum)) { }
        
        locChars.insert(std::pair<int,int>(randLoc % totalNum, i));
    }
    return locChars;
}

std::string TextGenerator::generateAWord() {
    return LangUtil::getInstance()->getAWord();
}

std::string TextGenerator::generateASentence() {
    return LangUtil::getInstance()->getASentence();
}


int TextGenerator::getNumGraphemesInString(std::string word) {
    return getGraphemes(word).size();
}

std::vector<std::string> TextGenerator::getGraphemes(std::string word) {
    std::vector<std::string> graphemes;
    auto wordChar = word.c_str();
    auto end = wordChar + word.length();
    auto graphemeBegin = wordChar;
    uint32_t prevCodePoint = 0;
    while(wordChar != end) {
        auto cp = utf8::peek_next(wordChar, end);
        if(prevCodePoint && LangUtil::getInstance()->isGraphemeStart(prevCodePoint, cp)) {
            auto str = std::string(graphemeBegin, wordChar);
            graphemes.push_back(str);
            graphemeBegin = wordChar;
        }
        prevCodePoint = utf8::next(wordChar, end);
    }
    auto str = std::string(graphemeBegin, wordChar);
    graphemes.push_back(str);
    return graphemes;
}

std::vector<std::string> TextGenerator::getAllChars() {
    int numChar = LangUtil::getInstance()->getNumberOfCharacters();
    auto allChars = LangUtil::getInstance()->getAllCharacters();
    std::vector<std::string> allCharVector;
    allCharVector.clear();
    for (int i = 0; i < numChar; i++) {
        auto charString = LangUtil::getInstance()->convertUTF16CharToString(allChars[i]);
        allCharVector.push_back(charString);
    }
    return allCharVector;
}

std::vector<std::string> TextGenerator::getValidCombinations(std::string chars, int maxLength) {
    const char* args[] = {"one", "two", "three", "four"};
    std::vector<std::string> v(args, args + 4);
    return v;
}

std::map<std::string, std::string> TextGenerator::getSynonyms(int maxNum) {
    std::map<std::string, std::string> SynonymMap = {
        {"end", "finish"},
        {"cry", "sob"},
        {"cold", "icy"},
        {"begin", "start"},
        {"save", "keep"},
        {"hope", "wish"},
        {"choose", "pick"},
        {"paste", "glue"},
        {"hurry", "rush"},
        {"sad", "unhappy"},
        {"friend", "pal"},
        {"enjoy", "like"},
        {"error", "mistake"}
    };
    std::map<std::string, std::string> data;
    for (std::map<std::string, std::string>::iterator it=SynonymMap.begin(); it!=SynonymMap.end(); ++it) {
        data[it->first] = it->second;
        if(data.size() >= maxNum) {
            break;
        }
    }
    return data;
}

std::map<std::string, std::string> TextGenerator::getAntonyms(int maxNum) {
    std::map<std::string, std::string> AntonymMap = {
        {"big", "small"},
        {"loud", "quiet"},
        {"dark", "light"},
        {"fast", "slow"},
        {"happy", "sad"},
        {"long", "short"},
        {"hot", "cold"},
        {"wet", "dry"},
        {"over", "under"},
        {"sink", "float"},
        {"far", "near"},
        {"empty", "full"},
        {"messy", "neat"},
        {"never", "always"},
        {"old", "young"},
		{ "good", "bad" }
    };
    std::map<std::string, std::string> data;
    for (std::map<std::string, std::string>::iterator it=AntonymMap.begin(); it!=AntonymMap.end(); ++it) {
        data[it->first] = it->second;
        if(data.size() >= maxNum) {
            break;
        }
    }
    return data;
}

std::map<std::string, std::string> TextGenerator::getHomonyms(int maxNum) {
    std::map<std::string, std::string> HomonymMap = {
        {"be", "bee"},
        {"bean", "bean"},
        {"buy", "by"},
        {"hear", "here"},
        {"hour", "our"},
        {"know", "no"},
        {"mail", "male"},
        {"meat", "meet"},
        {"plain", "plane"},
        {"right", "write"},
        {"road", "rode"},
        {"sail", "sale"},
        {"sea", "see"},
        {"sail", "sale"},
        {"son", "sun"},
        {"tail", "tale"}
    };
    std::map<std::string, std::string> data;
    for (std::map<std::string, std::string>::iterator it=HomonymMap.begin(); it!=HomonymMap.end(); ++it) {
        data[it->first] = it->second;
        if(data.size() >= maxNum) {
            break;
        }
    }
    return data;
}

std::map<std::string, std::map<std::string, std::string>> TextGenerator::getInitialSyllableWords(int maxNum, int maxChoices) {
    std::map<std::string, std::map<std::string, std::string>> InitialSyllableMap = {
        {
            {"be",
                {
                    {"beach", "english/sounds/b.wav"},
                    {"beard", "english/sounds/b.wav"},
                    {"been", "english/sounds/b.wav"},
                    {"beetroot", "english/sounds/b.wav"},
                    {"beast", "english/sounds/b.wav"},
                    {"beat", "english/sounds/b.wav"}
                }},
            {"fr",
                {
                    {"french", "english/sounds/f.wav"},
                    {"fruit", "english/sounds/f.wav"},
                    {"frown", "english/sounds/f.wav"},
                    {"free", "english/sounds/f.wav"},
                    {"frisbee", "english/sounds/f.wav"},
                    {"fringe", "english/sounds/f.wav"}
                }},
            {"gr",
                {
                    {"greet", "english/sounds/g.wav"},
                    {"great", "english/sounds/g.wav"},
                    {"grow", "english/sounds/g.wav"},
                    {"grease", "english/sounds/g.wav"},
                    {"growl", "english/sounds/g.wav"},
                    {"grunge", "english/sounds/g.wav"}
                }},
            {"sc",
                {
                    {"scare", "english/sounds/s.wav"},
                    {"scowl", "english/sounds/s.wav"},
                    {"scream", "english/sounds/s.wav"},
                    {"scone", "english/sounds/s.wav"},
                    {"scarf", "english/sounds/s.wav"},
                    {"scam", "english/sounds/s.wav"}
                }},
            {"ar",
                {
                    {"art", "english/sounds/a.wav"},
                    {"argue", "english/sounds/a.wav"},
                    {"arm", "english/sounds/a.wav"},
                    {"arson", "english/sounds/a.wav"},
                    {"arbor", "english/sounds/a.wav"},
                    {"ark", "english/sounds/a.wav"}
                }}
        }
    };
    std::map<std::string, std::map<std::string, std::string>> data;
    for (std::map<std::string, std::map<std::string, std::string>>::iterator it=InitialSyllableMap.begin(); it!=InitialSyllableMap.end(); ++it) {
        std::map<std::string, std::string> innerData;
        for(std::map<std::string, std::string>::iterator inIt=it->second.begin(); inIt!=it->second.end(); ++inIt) {
            innerData[inIt->first] = inIt->second;
            if(innerData.size() >= maxChoices) {
                break;
            }
        }
        data[it->first] = innerData;
        if(data.size() >= maxNum) {
            break;
        }
    }
    return data;
}
