//
//  CharGenerator.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 06/07/16.
//
//

#include <math.h>
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

std::vector<std::vector<wchar_t>> CharGenerator::generateMatrixForChoosingAChar(wchar_t alpha, int numRows, int numCols, int minPercentOfOccurence)
{
    auto matrix = generateCharMatrix(numRows, numCols);
    int minOccurence = ceil(numRows * numCols * minPercentOfOccurence / 100);
    for (int i = 0; i < minOccurence; i++) {
        int randRow = rand() % numRows;
        int randCol = rand() % numCols;
        matrix[randRow][randCol] = alpha;
    }
    
    return matrix;
}

wchar_t CharGenerator::generateAChar() {
    int numChar = LangUtil::getInstance()->getNumberOfCharacters();
    int randomNumber = rand() % (numChar - 1);
    return LangUtil::getInstance()->getAllCharacters()[randomNumber];
}

std::vector<std::vector<wchar_t>> CharGenerator::generateCharMatrix(int numRows, int numCols, bool distinct) {
    int numChar = LangUtil::getInstance()->getNumberOfCharacters();
    auto allChars = LangUtil::getInstance()->getAllCharacters();
    std::vector<std::vector<wchar_t>> matrix(numRows, std::vector<wchar_t>(numCols));
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            int randomNumber = rand() % (numChar - 1);
            matrix[i][j] = LangUtil::getInstance()->getAllCharacters()[randomNumber];
        }
    }
    return matrix;
}

