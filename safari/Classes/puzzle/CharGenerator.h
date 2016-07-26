//
//  CharGenerator.h
//  rpg
//
//  Created by Srikanth Talapadi on 06/07/16.
//
//

#ifndef CharGenerator_h
#define CharGenerator_h

#include "cocos2d.h"

class CharGenerator
{
public:
    static CharGenerator* getInstance();
    
    static void destroyInstance();
    
    std::vector<std::vector<wchar_t>> generateMatrixForChoosingAChar(wchar_t alpha, int numRows, int numCols, int minPercentOfOccurence = 10);
    wchar_t generateAChar();
    std::vector<std::vector<wchar_t>> generateCharMatrix(int numRows, int numCols, bool distinct = true);
protected:
    bool init();
};

#endif /* CharGenerator_h */
