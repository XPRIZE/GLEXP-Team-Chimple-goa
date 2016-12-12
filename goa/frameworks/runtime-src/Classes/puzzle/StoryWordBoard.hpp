//
//  StoryWordBoard.hpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 09/12/16.
//
//

#ifndef StoryWordBoard_hpp
#define StoryWordBoard_hpp

#include "WordScene.h"

class StoryWordBoard : public WordScene {
public:
    static cocos2d::Scene* createScene();
    static cocos2d::Scene* createSceneWithWords(std::string storyId, std::vector<std::string> words, int currentIndex, std::string baseDir, int totalPoints, int currentPoints);
    static StoryWordBoard* create();
    static StoryWordBoard* createWithWords(std::string storyId, std::vector<std::string> words, int currentIndex, std::string baseDir,int totalPoints, int currentPoints);
    void checkAnswer() override;    
    void onEnterTransitionDidFinish() override;
    
CC_CONSTRUCTOR_ACCESS:
    StoryWordBoard();
    virtual ~StoryWordBoard();
    
protected:
    int getGridHeight() override;
    int getGridNumRows() override;
    int getGridNumCols() override;
    std::string getGridBackground() override;
    Node* loadNode() override;
    void createGrid() override;
    void createChoice() override;
    void gameOver(bool correct) override;
    int _currentIndex;
    void processGrapheme(Grapheme* grapheme) override;
    
    std::string _storyId;
    std::vector<std::string> _words;
    std::string _baseDir;
    cocos2d::ParticleSystem* _ps;
    
    bool _anyTimeWrongAlphabetChosen;
    int _totalPoints;
    int _currentPoints;
};



#endif /* StoryWordBoard_hpp */
