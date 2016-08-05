//
//  TextGenerator.h
//  safari
//
//  Created by Srikanth Talapadi on 05/08/16.
//
//

#ifndef TextGenerator_h
#define TextGenerator_h

class TextGenerator {
public:
    static TextGenerator* getInstance();
    static void destroyInstance();
    
    std::vector<std::vector<std::string>> generateMatrix(std::string word, int numRows, int numCols);
    std::string generateAWord();
    int getNumCharactersInString(std::string word);
protected:
    std::vector<std::string> getAllChars();
    std::map<int, int> getRandomLocations(int numLoc, int totalNum);

};

#endif /* TextGenerator_h */
