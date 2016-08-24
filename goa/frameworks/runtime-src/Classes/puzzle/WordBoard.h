//
//  WordBoard.h
//  safari
//
//  Created by Srikanth Talapadi on 09/08/16.
//
//

#ifndef WordBoard_h
#define WordBoard_h

#include "WordScene.h"

class WordBoard : public WordScene {
public:
    static cocos2d::Scene* createScene();
    static cocos2d::Scene* createSceneWithWord(std::string wordStr);
    static cocos2d::Scene* createSceneWithWordInIslandAndSceneName(std::string wordStr, std::string island, std::string sceneName);
    static WordBoard* create();
    static WordBoard* createWithWord(std::string wordStr);
    void checkAnswer() override;
    
CC_CONSTRUCTOR_ACCESS:
    WordBoard();
    virtual ~WordBoard();
    
protected:
    bool _timerStarted;
    int getGridHeight() override;
    int getGridNumRows() override;
    int getGridNumCols() override;
    std::string getGridBackground() override;
    Node* loadNode() override;
    void createGrid() override;
    void createChoice() override;
    void gameOver(bool correct) override;
};


#endif /* WordBoard_h */
