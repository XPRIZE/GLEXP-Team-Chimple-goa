//
//  MenuContext.h
//  safari
//
//  Created by Srikanth Talapadi on 19/07/16.
//
//

#ifndef MenuContext_h
#define MenuContext_h

#include "cocos2d.h"

class MenuContext : public cocos2d::Node {
    
public:
    static MenuContext* create();
    void pickAlphabet(char targetAlphabet, char chosenAlphabet, bool choose = true, cocos2d::Vec2 position = cocos2d::Vec2::ZERO);
    void finalizePoints();

CC_CONSTRUCTOR_ACCESS:
    MenuContext();
    virtual ~MenuContext();
    bool init();
    
protected:
    int _points;
    cocos2d::Label* _label;
};

#endif /* MenuContext_h */
