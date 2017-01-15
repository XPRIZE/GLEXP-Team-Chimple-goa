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
    static Alphabet *createWithSize(wchar_t alphabet, float fontSize);
    bool isSelected();
    void selected(bool value);
    wchar_t getChar();
    void enableTouch(bool value);
    std::function<bool(cocos2d::Touch*, cocos2d::Event*)> touchBeganCallback;
    std::function<void(cocos2d::Touch*, cocos2d::Event*)> touchMovedCallback;
    std::function<void(cocos2d::Touch*, cocos2d::Event*)> touchEndedCallback;
    void updateChar(wchar_t alphabet);
    
    
CC_CONSTRUCTOR_ACCESS:
    Alphabet();
    virtual ~Alphabet();
    bool initWithSize(wchar_t alphabet, float fontSize);
    bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
    
protected:
    wchar_t _alphabet;
    bool _selected;
    float _fontSize;
    cocos2d::EventListenerTouchOneByOne *_listener;
    constexpr static const float MAX_FONT_SIZE = 600.0;
};

#endif /* Alphabet_h */
