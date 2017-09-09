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
#include "GraphemeGrid.h"
#include "Grapheme.h"

class PegWord : public WordScene {
public:
    static cocos2d::Scene* createScene();
    static PegWord* create();
    static PegWord* createWithWord(std::string wordStr);
    virtual void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event) override;

CC_CONSTRUCTOR_ACCESS:
    PegWord();
    virtual ~PegWord();
    
protected:
    int getGridHeight() override;
    int getGridNumRows() override;
    int getGridNumCols() override;
    std::string getGridBackground() override;
    Node* loadNode() override;
    void createAnswer() override;
    void createGrid() override;
    void createChoice() override;
    GraphemeGrid* createGraphemeGrid(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground) override;
};

class PegGrid : public GraphemeGrid {
public:
    static PegGrid *create(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground);
    void resize(GLfloat width, GLfloat height, int numRows, int numCols, std::vector<std::vector<std::string>> graphemes) override;

CC_CONSTRUCTOR_ACCESS:
    bool init(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground);
protected:
    Grapheme* createGrapheme(std::string graphemeString, float size = 200) override;
};

class PegGrapheme : public Grapheme {
public:
    static PegGrapheme* create(std::string graphemeString);
    void onEnterTransitionDidFinish() override;
    void changeBackground();
    cocos2d::Vec2 getRandomLocation();
    cocos2d::Vec2 getUnoccupiedRandomLocation();

CC_CONSTRUCTOR_ACCESS:
    bool init(std::string graphemeString);
    bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event) override;
    void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event) override;
    void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event) override;

protected:
    cocos2d::Vec2 _newPosition;
    void initialAnimationDone();
};

#endif /* PegWord_h */
