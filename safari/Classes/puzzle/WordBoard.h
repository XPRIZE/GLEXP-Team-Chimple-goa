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
    static WordBoard* create();
    static WordBoard* createWithWord(std::string wordStr);
    
CC_CONSTRUCTOR_ACCESS:
    WordBoard();
    virtual ~WordBoard();
    
protected:
    int getGridHeight() override;
    int getGridNumRows() override;
    int getGridNumCols() override;
    std::string getGridBackground() override;
    Node* loadNode() override;
    void createGrid() override;
    
};


#endif /* WordBoard_h */
