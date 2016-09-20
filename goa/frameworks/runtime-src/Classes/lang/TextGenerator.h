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
    
    std::vector<std::vector<std::string>> generateMatrix(std::string word, int numRows, int numCols);
    std::string generateAWord();
    int getNumGraphemesInString(std::string word);
    std::vector<std::string> getGraphemes(std::string word);
    std::string generateASentence();
    std::vector<std::string> getAllChars();
    std::vector<std::string> getValidCombinations(std::string chars, int maxLength);
    std::map<std::string, std::string> getSynonyms(int maxNum);
    std::map<std::string, std::string> getAntonyms(int maxNum);
    std::map<std::string, std::string> getHomonyms(int maxNum);    
    
protected:
    std::map<int, int> getRandomLocations(int numLoc, int totalNum);

};

#endif /* TextGenerator_h */
