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
    static WordScene *createWithWord(std::string wordStr);
    virtual void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    virtual void checkAnswer();

CC_CONSTRUCTOR_ACCESS:
    WordScene();
    virtual ~WordScene();
    bool init();
    bool initWithWord(std::string word);
    
protected:
    virtual cocos2d::Node* loadNode();
    virtual void createGrid();
    virtual void createAnswer();
    virtual void createChoice();
    virtual void gameOver(bool correct);
    virtual void addChoice(Node* choice);
    
    virtual int getGridHeight();
    virtual int getGridNumRows();
    virtual int getGridNumCols();
    virtual std::string getGridBackground();
    virtual std::string getGraphemeUnselectedBackground();
    virtual std::string getGraphemeSelectedBackground();
	virtual GraphemeGrid* createGraphemeGrid(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground);


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
