//
//  PegWord.h
//  safari
//
//  Created by Srikanth Talapadi on 09/08/16.
//
//

#ifndef PegWord_h
#define PegWord_h

#include "WordScene.h"

class PegWord : public WordScene {
public:
    static cocos2d::Scene* createScene();
    static PegWord* create();
    static PegWord* createWithWord(std::string wordStr);

CC_CONSTRUCTOR_ACCESS:
    PegWord();
    virtual ~PegWord();
    
protected:
    int getGridHeight() override;
    int getGridNumRows() override;
    int getGridNumCols() override;
    std::string getGridBackground() override;
    Node* loadNode() override;

};

#endif /* PegWord_h */
