//
//  AlphabetGrid.h
//  rpg
//
//  Created by Srikanth Talapadi on 24/06/16.
//
//

#ifndef AlphabetGrid_h
#define AlphabetGrid_h

#include "cocos2d.h"

class AlphabetGrid : public cocos2d::Layer
{
public:
    static AlphabetGrid *create(GLfloat width, GLfloat height, int numRows, int numCols, std::vector<std::vector<char>> charArray);
//    virtual void onTouchesBegan(const std::vector<cocos2d::Touch*>& touches, cocos2d::Event* event);
//    virtual void onTouchesMoved(const std::vector<cocos2d::Touch*>& touches, cocos2d::Event* event);
//    virtual void onTouchesEnded(const std::vector<cocos2d::Touch*>& touches, cocos2d::Event* event);
//    virtual void onTouchesCancelled(const std::vector<cocos2d::Touch*>& touches, cocos2d::Event* event);

CC_CONSTRUCTOR_ACCESS:
    AlphabetGrid();
    virtual ~AlphabetGrid();
    bool initWithSize(GLfloat width, GLfloat height, int numRows, int numCols, std::vector<std::vector<char>> charArray);
    
};

#endif /* AlphabetGrid_h */
