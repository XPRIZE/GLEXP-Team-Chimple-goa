//
//  CharGenerator.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 06/07/16.
//
//

#include <math.h>
#include <algorithm>
#include "CharGenerator.h"
#include "../lang/LangUtil.h"

USING_NS_CC;

static CharGenerator* _singletonCharGenerator = nullptr;

CharGenerator* CharGenerator::getInstance()
{
    if(!_singletonCharGenerator)
    {
        _singletonCharGenerator = new (std::nothrow) CharGenerator();
        _singletonCharGenerator->init();
    }
    return _singletonCharGenerator;
}

void CharGenerator::destroyInstance()
{
    CC_SAFE_DELETE(_singletonCharGenerator);
}

bool CharGenerator::init()
{
    return true;
}

std::vector<std::vector<wchar_t>> CharGenerator::generateMatrixForChoosingAChar(wchar_t alpha, int numRows, int numCols, int minPercentOfOccurence, bool lowerCase)
{
    auto matrix = generateCharMatrix(numRows, numCols, false, lowerCase);
    int minOccurence = ceil(numRows * numCols * minPercentOfOccurence / 100);
	int randRow = rand() % numRows;
	int randCol = rand() % numCols;
    for (int i = 0; i < minOccurence; i++) {
		matrix[randRow % numRows][randCol % numCols] = alpha;
		randRow++;
		if (randRow % numRows == 0) {
			randCol++;
		}
    }
	for (int j = 0; j < matrix.size(); j++) {
		std::random_shuffle(matrix.at(j).begin(), matrix.at(j).end());
	}
    return matrix;
}

wchar_t CharGenerator::generateAChar(bool lowerCase) {
    int numChar = LangUtil::getInstance()->getNumberOfCharacters();
    int randomNumber = rand() % (numChar - 1);
    if(lowerCase)
        return LangUtil::getInstance()->getAllLowerCaseCharacters()[randomNumber];
    else
        return LangUtil::getInstance()->getAllCharacters()[randomNumber];
}

std::vector<std::vector<wchar_t>> CharGenerator::generateCharMatrix(int numRows, int numCols, bool distinct, bool lowerCase) {
    auto allCharVector = getAllChars(lowerCase);
    int numChar = allCharVector.size();
    std::vector<std::vector<wchar_t>> matrix(numRows, std::vector<wchar_t>(numCols));
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            int randomNumber = 0;
            if(numChar > 1) {
                randomNumber = rand() % (numChar - 1);
            }
            matrix[i][j] = allCharVector.at(randomNumber);
            if(distinct) {
                allCharVector.erase(allCharVector.begin() + randomNumber);
                numChar--;
                if(numChar <= 0) {
                    allCharVector = getAllChars(lowerCase);
                    numChar = allCharVector.size();
                }
            }
        }
    }
    return matrix;
}

wchar_t CharGenerator::generateAnotherChar(std::vector<wchar_t> currentChars, bool lowerCase) {
    auto allCharVector = getAllChars(lowerCase);
    for (int i = 0; i < currentChars.size(); i++) {
        for (int j = 0; j < allCharVector.size(); j++) {
            if(currentChars.at(i) == allCharVector.at(j)) {
                allCharVector.erase(allCharVector.begin() + j);
            }
        }
    }
    int randomNumber = 0;
    if(allCharVector.size() > 1) {
        randomNumber = rand() % (allCharVector.size() - 1);
    }
    return allCharVector.at(randomNumber);
}

std::vector<wchar_t> CharGenerator::getAllChars(bool lowerCase) {
    int numChar = LangUtil::getInstance()->getNumberOfCharacters();
    auto allChars = lowerCase ? LangUtil::getInstance()->getAllLowerCaseCharacters() : LangUtil::getInstance()->getAllCharacters();
    std::vector<wchar_t> allCharVector;
    allCharVector.clear();
    for (int i = 0; i < numChar; i++) {
        allCharVector.push_back(allChars[i]);
    }
    return allCharVector;
}


