//
//  TextGenerator.cpp
//  safari
//
//  Created by Srikanth Talapadi on 05/08/16.
//
//

#include "TextGenerator.h"
#include "LangUtil.h"

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
    int wordLength = word.length();
    int matrixLength = numRows * numCols;
    auto locChars = getRandomLocations(wordLength, matrixLength);
    std::vector<std::vector<std::string>> matrix(numRows, std::vector<std::string>(numCols));
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            int numElement = numCols * i + j;
            auto iter = locChars.find(numElement);
            if(iter != locChars.end()) {
                matrix[i][j] = word.substr(iter->second, 1);
            } else {
                matrix[i][j] = allChars[rand() % LangUtil::getInstance()->getNumberOfCharacters()];
            }
        }
    }
    return matrix;
}

/*
 * Currently returns non-random
 * TODO: change to random
 */

std::map<int, int> TextGenerator::getRandomLocations(int numLoc, int totalNum) {
    std::map<int, int> locChars;
    for (int i = 0; i < numLoc; i++) {
        locChars.insert(std::pair<int,int>(i, i));
    }
    return locChars;
}

std::string TextGenerator::generateAWord() {
    return "APPLE";
}


int TextGenerator::getNumCharactersInString(std::string word) {
    return 5;
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
