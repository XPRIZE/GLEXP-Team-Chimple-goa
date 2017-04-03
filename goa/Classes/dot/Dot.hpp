//
//  Dot.hpp
//  goa
//
//  Created by Srikanth Talapadi on 31/03/17.
//
//

#ifndef Dot_hpp
#define Dot_hpp

#include "cocos2d.h"

class Dot : public cocos2d::Sprite
{
public:
    static Dot *createWithColor(cocos2d::Color3B color);
    std::function<bool(cocos2d::Touch*, cocos2d::Event*)> touchBeganCallback;
    std::function<void(cocos2d::Touch*, cocos2d::Event*)> touchMovedCallback;
    std::function<void(cocos2d::Touch*, cocos2d::Event*)> touchEndedCallback;
    void enableTouch(bool enabled);
    bool isTouched();
    void touched(bool isTouched);
    
CC_CONSTRUCTOR_ACCESS:
    Dot();
    virtual ~Dot();
    bool initWithColor(cocos2d::Color3B color);
    bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);

protected:
    cocos2d::Color3B _color;
    cocos2d::EventListenerTouchOneByOne *_listener;
    bool _touchEnabled;
    bool _isTouched;
};

#endif /* Dot_hpp */
