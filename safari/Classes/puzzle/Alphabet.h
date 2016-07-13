//
//  Alphabet.h
//  rpg
//
//  Created by Srikanth Talapadi on 25/06/16.
//
//

#ifndef Alphabet_h
#define Alphabet_h
#include "cocos2d.h"

class Alphabet : public cocos2d::Label
{
public:
    static Alphabet *createWithSize(char alphabet, float fontSize);
    bool isSelected();
    void selected(bool value);
    char getChar();
    void enableTouch(bool value);
    
CC_CONSTRUCTOR_ACCESS:
    Alphabet();
    virtual ~Alphabet();
    bool initWithSize(char alphabet, float fontSize);
    bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
    bool onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    
protected:
    char _alphabet;
    bool _selected;
    float _fontSize;
    cocos2d::EventListenerTouchOneByOne *_listener;
};

#endif /* Alphabet_h */
