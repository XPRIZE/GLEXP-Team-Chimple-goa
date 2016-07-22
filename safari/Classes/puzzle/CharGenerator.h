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
    
    std::vector<std::vector<char>> generateMatrixForChoosingAChar(char alpha, int numRows, int numCols, int minPercentOfOccurence = 10);
	std::vector<char> generateArrayForChoosingAChar(char alpha, int size);
protected:
    bool init();
};

#endif /* CharGenerator_h */
