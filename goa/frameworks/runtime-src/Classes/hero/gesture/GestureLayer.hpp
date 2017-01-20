//
//  GestureLayer.hpp
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 24/06/16.
//
//

#ifndef GestureLayer_hpp
#define GestureLayer_hpp

#include <stdio.h>
#include "../RPGConfig.h"

USING_NS_CC;

class GestureLayer : public cocos2d::Layer
{
public:
    GestureLayer();
    ~GestureLayer();
    
    static GestureLayer* create(Ref* target, SEL_CallFuncO handler);
    
    virtual bool init(Ref* target, SEL_CallFuncO handler);
    
    // touch listeners
    virtual bool onTouchBegan(cocos2d::Touch * touch, cocos2d::Event* event);
    virtual void touchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
    virtual void touchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    
    // accessors and mutators
    inline Point GetTouchStart() { return touch_start_; }
    inline Point GetTouchEnd() { return touch_end_; }
    inline RPGGestureType GetGestureType() { return gesture_type_; }
    
protected:
    void HandleEndTouch();
    void HandleTouch();
    void DetermineHoldTouch();
    void update(float dt);
    
    // target to pass the gesture event to
    Ref* target_;
    
    // function to call when gesture event occurs
    SEL_CallFuncO handler_;
    
    // member variables
    bool is_touch_active_;
    Point touch_start_;
    Point touch_end_;
    bool isDragging;
    bool isHoldingTouch;
    
    bool isSceneTransitionStarted;
    
    //time when touch starts
    float touch_start_time_;
    
    RPGGestureType gesture_type_;
    
public:
    void disableAllTouch();
    void enableAllTouch();
};


#endif /* GestureLayer_hpp */
