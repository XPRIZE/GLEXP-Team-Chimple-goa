//
//  TextGenerator.h
//  safari
//
//  Created by Srikanth Talapadi on 05/08/16.
//
//

#include "cocos2d.h"

#ifndef TextGenerator_h
#define TextGenerator_h
#include "cocos2d.h"

class TextGenerator {
public:
    static TextGenerator* getInstance();
    static void destroyInstance();
    
    std::vector<std::vector<std::string>> generateMatrix(std::string word, int numRows, int numCols);
    std::string generateAWord();
    int getNumGraphemesInString(std::string word);
    std::vector<std::string> getGraphemes(std::string word);
protected:
    std::vector<std::string> getAllChars();
    std::map<int, int> getRandomLocations(int numLoc, int totalNum);

};

#endif /* TextGenerator_h */
