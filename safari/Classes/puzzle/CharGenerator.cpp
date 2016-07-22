//
//  CharGenerator.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 06/07/16.
//
//

#include <math.h>
#include "CharGenerator.h"

USING_NS_CC;

static CharGenerator* _singletonCharGenerator = nullptr;
static const char* const a_to_z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ;
//static const char* const a_to_z = "ಅಆಇಈಉಊಋಌಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಱಲಳವಶಷಸಹ";

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

std::vector<std::vector<char>> CharGenerator::generateMatrixForChoosingAChar(char alpha, int numRows, int numCols, int minPercentOfOccurence)
{
    std::vector<std::vector<char>> matrix(numRows, std::vector<char>(numCols));
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < numCols; j++) {
            int randomNumber = rand() % 25;
            matrix[i][j] = a_to_z[randomNumber];
        }
    }
    
    int minOccurence = ceil(numRows * numCols * minPercentOfOccurence / 100);
    for (int i = 0; i < minOccurence; i++) {
        int randRow = rand() % numRows;
        int randCol = rand() % numCols;
        matrix[randRow][randCol] = alpha;
    }
    
    return matrix;
}


