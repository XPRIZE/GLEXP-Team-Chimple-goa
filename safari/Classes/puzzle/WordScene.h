//
//  WordScene.h
//  safari
//
//  Created by Srikanth Talapadi on 05/08/16.
//
//

#ifndef WordScene_h
#define WordScene_h

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "GraphemeGrid.h"
#include "Grapheme.h"

class WordScene : public cocos2d::Node {
public:
    static cocos2d::Scene* createScene();
    static WordScene *create();
    virtual void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    virtual void checkAnswer();

CC_CONSTRUCTOR_ACCESS:
    WordScene();
    virtual ~WordScene();
    bool init();
    
protected:
    virtual cocos2d::Node* loadNode();
    virtual void createGrid();
    virtual void createAnswer();
    virtual void createChoice();
    virtual void gameOver();
    
    virtual int getGridHeight();
    virtual int getGridNumRows();
    virtual int getGridNumCols();
    virtual std::string getGridBackground();

    MenuContext* _menuContext;
    GraphemeGrid* _grid;
    Node* _answer;
    Node* _choice;
    std::string _word;
    int _numGraphemes;
    std::vector<std::string> _answerGraphemes;
    std::vector<std::vector<std::string>> _matrix;
    std::vector<std::pair<Node*, Grapheme*>> _answerVector;
};

#endif /* WordScene_h */
