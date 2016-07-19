//
//  PointSystem.h
//  safari
//
//  Created by Srikanth Talapadi on 19/07/16.
//
//

#ifndef PointSystem_h
#define PointSystem_h

#include "cocos2d.h"

class PointSystem : cocos2d::Node {
    
public:
    static PointSystem* create();
    void chooseAlphabet(char targetAlphabet, char chosenAlphabet, cocos2d::Vec2 position = nullptr);
    void finalizePoints();

CC_CONSTRUCTOR_ACCESS:
    PointSystem();
    virtual ~PointSystem();
    bool init();
    
protected:
    int _points;
    cocos2d::Label* _label;
};

#endif /* PointSystem_h */
