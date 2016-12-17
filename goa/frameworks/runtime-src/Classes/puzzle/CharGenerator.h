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
    
    std::vector<std::vector<wchar_t>> generateMatrixForChoosingAChar(wchar_t alpha, int numRows, int numCols, int minPercentOfOccurence = 10, bool lowerCase = false);
    wchar_t generateAChar(bool lowerCase = false);
    std::vector<std::vector<wchar_t>> generateCharMatrix(int numRows, int numCols, bool distinct = false, bool lowerCase = false);
    wchar_t generateAnotherChar(std::vector<wchar_t> currentChars, bool lowerCase = false);
protected:
    bool init();
    std::vector<wchar_t> getAllChars(bool lowerCase = false);
};

#endif /* CharGenerator_h */
