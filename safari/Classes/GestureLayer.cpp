//
//  GestureLayer.cpp
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 24/06/16.
//
//

#include "GestureLayer.hpp"

USING_NS_CC;

GestureLayer::GestureLayer()
{
    this->target_ = NULL;
    this->handler_ = NULL;
    this->is_touch_active_ = false;
    this->isDragging = false;
    this->touch_start_ = Point::ZERO;
    this->touch_end_ = Point::ZERO;
    this->gesture_type_ = E_GESTURE_NONE;
}

GestureLayer::~GestureLayer()
{}

GestureLayer* GestureLayer::create(Ref* target, SEL_CallFuncO handler)
{
    GestureLayer* gesture_layer = new GestureLayer();
    if(gesture_layer && gesture_layer->init(target, handler))
    {
        gesture_layer->autorelease();
        return gesture_layer;
    }
    CC_SAFE_DELETE(gesture_layer);
    return NULL;
}

bool GestureLayer::init(Ref* target, SEL_CallFuncO handler)
{
    if(!Layer::init())
    {
        return false;
    }
    
    if(target == NULL || handler == NULL)
    {
        CCLOGERROR("GestureLayer received invalid arguments");
        return false;
    }
    
    this->target_ = target;
    this->handler_ = handler;
    
    auto listenerTouches = EventListenerTouchOneByOne::create();
    listenerTouches->setSwallowTouches(false);
    listenerTouches->onTouchBegan = CC_CALLBACK_2(GestureLayer::onTouchBegan, this);
    listenerTouches->onTouchMoved = CC_CALLBACK_2(GestureLayer::touchMoved, this);
    listenerTouches->onTouchEnded = CC_CALLBACK_2(GestureLayer::touchEnded, this);
    this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listenerTouches, this);
    
    this->scheduleUpdate();
    return true;
}

bool GestureLayer::onTouchBegan(Touch *touch, Event *event)
{
    Point touch_point = touch->getLocationInView();
    touch_point = Director::getInstance()->convertToGL(touch_point);
    
    // first reset variables
    this->gesture_type_ = E_GESTURE_NONE;
    
    
    // start observing touch
    this->is_touch_active_ = true;
    
    // save first touch point
    this->touch_start_ = touch_point;
    this->touch_end_ = touch_start_;
    
    this->touch_start_time_ = 0.0f;
    
    return true;
}

void GestureLayer::touchMoved(Touch *touch, Event *event)
{
    Point touch_point = touch->getLocationInView();
    touch_point = Director::getInstance()->convertToGL(touch_point);
    
    // save subsequent touch
    touch_end_ = touch_point;
    // start observing touch
    is_touch_active_ = true;
    isDragging = true;
    HandleTouch();
}

void GestureLayer::touchEnded(Touch *touch, Event *event)
{
    Point touch_point = touch->getLocationInView();
    touch_point = Director::getInstance()->convertToGL(touch_point);
    this->isDragging = false;
    // save subsequent touch
    touch_end_ = touch_point;
    HandleEndTouch();
    
    // stop observing touch
    this->is_touch_active_ = false;
    
}

void GestureLayer::DetermineHoldTouch() {

    // don't do anything if not observing touch
    if(is_touch_active_ == false)
    {
        return;
    }
    
    //check if Hold (holding touch without moving for .5 sec delta)
    if(touch_start_time_ > 0.2f && (touch_start_.fuzzyEquals(touch_end_, 1) || isDragging)) {
        gesture_type_ = E_GESTURE_HOLD;
        CCLOG("%s", "holding mouse");
        (target_->*handler_)(this);
        is_touch_active_ = true;
        this->isDragging = true;
        touch_start_time_ = 0.0f;
        return;
    }
}

void GestureLayer::update(float dt) {
    touch_start_time_ += dt;
    DetermineHoldTouch();
}

void GestureLayer::HandleEndTouch() {
    // check for a single tap
    if(touch_start_time_ <= 0.2f && !this->isDragging && touch_start_.fuzzyEquals(touch_end_, 1)) {
        gesture_type_ = E_GESTURE_TAP;
        (target_->*handler_)(this);
        is_touch_active_ = false;
        return;
    }

    gesture_type_ = E_GESTURE_TOUCH_ENDED;
    (target_->*handler_)(this);
}


void GestureLayer::HandleTouch()
{
    // don't do anything if not observing touch
    if(is_touch_active_ == false)
    {
        return;
    }
    
    // calculate distance between first and last touch
    Point touch_difference = touch_end_ - touch_start_;
    
    // vertical swipe
    if(fabs(touch_difference.y) > MIN_GESTURE_DISTANCE_UP)
    {
        gesture_type_ = (touch_difference.y > 0) ? E_GESTURE_SWIPE_UP : E_GESTURE_SWIPE_DOWN;
        (target_->*handler_)(this);
        isDragging = true;
        return;
    }
}