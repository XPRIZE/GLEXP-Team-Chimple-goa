//
//  GraphemeGrid.h
//  safari
//
//  Created by Srikanth Talapadi on 07/08/16.
//
//

#ifndef GraphemeGrid_h
#define GraphemeGrid_h

#include "cocos2d.h"
#include "Grapheme.h"

class GraphemeGrid: public cocos2d::Layer {
public:
    static GraphemeGrid *create(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes);
    void resize(GLfloat width, GLfloat height, int numRows, int numCols, std::vector<std::vector<std::string>> graphemes);
    int getNumberOfActionsRunning();
    std::function<bool(cocos2d::Touch*, cocos2d::Event*)> touchBeganCallback;
    std::function<void(cocos2d::Touch*, cocos2d::Event*)> touchMovedCallback;
    std::function<void(cocos2d::Touch*, cocos2d::Event*)> touchEndedCallback;

CC_CONSTRUCTOR_ACCESS:
    GraphemeGrid();
    virtual ~GraphemeGrid();
    bool init(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes);
    bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);

protected:
    int _numRows;
    int _numCols;
    GLfloat _width;
    GLfloat _height;
    std::string _spriteName;
    std::vector<std::vector<Grapheme*> > _graphemeMatrix;

};

#endif /* GraphemeGrid_h */
