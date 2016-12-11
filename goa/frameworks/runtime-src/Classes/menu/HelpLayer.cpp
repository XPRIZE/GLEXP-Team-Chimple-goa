//
//  HelpLayer.cpp
//  goa
//
//  Created by Srikanth Talapadi on 18/10/2016.
//
//

#include "HelpLayer.h"

USING_NS_CC;

HelpLayer* HelpLayer::create(Rect touchRect, Rect otherRect) {
    HelpLayer* helpLayer = new (std::nothrow) HelpLayer();
    if(helpLayer && helpLayer->init(touchRect, otherRect)) {
        helpLayer->autorelease();
        return helpLayer;
    }
    CC_SAFE_DELETE(helpLayer);
    return nullptr;
    
}

bool HelpLayer::init(const Rect touchRect, const Rect otherRect) {
    if(!Node::init()) {
        return false;
    }
    if(otherRect.equals(Rect::ZERO)) {
        _grayWindow = makePanel(touchRect, Rect(Director::getInstance()->getVisibleOrigin(), Director::getInstance()->getVisibleSize()));
    } else {
        if((touchRect.origin.x + touchRect.size.width / 2) < (otherRect.origin.x - otherRect.size.width)) {
            _grayWindow = makePanel(touchRect, Rect(0, 0, otherRect.origin.x - otherRect.size.width / 2, Director::getInstance()->getVisibleSize().height));
            makePanel(otherRect, Rect(otherRect.origin.x - otherRect.size.width / 2, 0, Director::getInstance()->getVisibleSize().width - otherRect.origin.x + otherRect.size.width / 2 , Director::getInstance()->getVisibleSize().height));
        } else if((otherRect.origin.x + otherRect.size.width / 2) < (touchRect.origin.x - touchRect.size.width)) {
            makePanel(otherRect, Rect(0, 0, touchRect.origin.x - touchRect.size.width / 2, Director::getInstance()->getVisibleSize().height));
            _grayWindow = makePanel(touchRect, Rect(touchRect.origin.x - touchRect.size.width / 2, 0, Director::getInstance()->getVisibleSize().width - touchRect.origin.x + touchRect.size.width / 2 , Director::getInstance()->getVisibleSize().height));
        } else if((touchRect.origin.y + touchRect.size.height / 2) < (otherRect.origin.y - otherRect.size.height)) {
            _grayWindow = makePanel(touchRect, Rect(0, 0, Director::getInstance()->getVisibleSize().width, otherRect.origin.y - otherRect.size.height / 2));
            makePanel(otherRect, Rect(0, otherRect.origin.y - otherRect.size.height / 2, Director::getInstance()->getVisibleSize().width, Director::getInstance()->getVisibleSize().height - otherRect.origin.y + otherRect.size.height / 2 ));
        } else {
            makePanel(otherRect, Rect(0, 0, Director::getInstance()->getVisibleSize().width, touchRect.origin.y - touchRect.size.height / 2));
            _grayWindow = makePanel(touchRect, Rect(0, touchRect.origin.y - touchRect.size.height / 2, Director::getInstance()->getVisibleSize().width, Director::getInstance()->getVisibleSize().height - touchRect.origin.y + touchRect.size.height / 2 ));
        }
    }
    _listener = EventListenerTouchOneByOne::create();
    _listener->setSwallowTouches(true);
    _listener->onTouchBegan = CC_CALLBACK_2(HelpLayer::onTouchBegan, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, this);
    return true;
}

bool HelpLayer::onTouchBegan(Touch *touch, Event *event) {
    if(_animating) {
        return true;
    }
    if(_grayWindow->getBoundingBox().containsPoint(touch->getLocation())) {
        return false;
    }
    return true;
}

void HelpLayer::click(Vec2 point) {
    _animating = true;
    auto finger = Sprite::create("help/touch.png");
    finger->setPosition(point);
    finger->setAnchorPoint(Vec2::ANCHOR_MIDDLE_TOP);
    addChild(finger);
    auto scaleBy = ScaleBy::create(0.5, 0.8);
    auto hideCallFunc = CallFunc::create(CC_CALLBACK_0(HelpLayer::hideFinger, this, finger));
    auto repeatCallFunc = CallFunc::create(CC_CALLBACK_0(HelpLayer::click, this, point));
    auto removeCallFunc = CallFunc::create(CC_CALLBACK_0(HelpLayer::removeFinger, this, finger));
    finger->runAction(Sequence::create(scaleBy, DelayTime::create(0.5), hideCallFunc, DelayTime::create(4.0), repeatCallFunc, removeCallFunc,  NULL));
}
void HelpLayer::clickTwice(cocos2d::Vec2 point1, cocos2d::Vec2 point2) {
    _animating = true;
    auto finger = Sprite::create("help/touch.png");
    finger->setPosition(point1);
    finger->setAnchorPoint(Vec2::ANCHOR_MIDDLE_TOP);
    addChild(finger);
    auto scaleBy = ScaleBy::create(0.5, 0.8);
    auto moveTo = MoveTo::create(0.5, point2);
    auto callFunc = CallFunc::create(CC_CALLBACK_0(HelpLayer::removeFinger, this, finger));
    auto hideCallFunc = CallFunc::create(CC_CALLBACK_0(HelpLayer::hideFinger, this, finger));
    auto repeatCallFunc = CallFunc::create(CC_CALLBACK_0(HelpLayer::clickTwice, this, point1, point2));
    
    finger->runAction(Sequence::create(scaleBy, DelayTime::create(0.5), scaleBy->reverse(), moveTo, scaleBy, DelayTime::create(0.5), scaleBy->reverse(), hideCallFunc, DelayTime::create(4.0), repeatCallFunc, callFunc, NULL));
}

void HelpLayer::clickAndDrag(Vec2 startPoint, Vec2 endPoint) {
    _animating = true;
    auto finger = Sprite::create("help/touch.png");
    finger->setPosition(startPoint);
    finger->setAnchorPoint(Vec2::ANCHOR_MIDDLE_TOP);
    addChild(finger);
    auto scaleBy = ScaleBy::create(0.5, 0.8);
    auto moveTo = MoveTo::create(0.5, endPoint);
    auto callFunc = CallFunc::create(CC_CALLBACK_0(HelpLayer::removeFinger, this, finger));
    auto hideCallFunc = CallFunc::create(CC_CALLBACK_0(HelpLayer::hideFinger, this, finger));
    auto repeatCallFunc = CallFunc::create(CC_CALLBACK_0(HelpLayer::clickAndDrag, this, startPoint, endPoint));
    
    finger->runAction(Sequence::create(scaleBy, DelayTime::create(0.5), moveTo, scaleBy->reverse(), hideCallFunc, DelayTime::create(4.0), repeatCallFunc, callFunc, NULL));
}

/*
vector contains start point and end point of the each stroke


*/
void HelpLayer::writing(std::vector<cocos2d::Vec2> points)
{
	_animating = true;
	if (points.size() >= 5) {
		auto finger = Sprite::create("help/touch.png");
		finger->setPosition(points.at(0));
		finger->setAnchorPoint(Vec2::ANCHOR_MIDDLE_TOP);
		addChild(finger);
		Vector< FiniteTimeAction * > fta_stroke1;
		
		auto scaleBy = ScaleBy::create(0.5, 0.8);
		fta_stroke1.pushBack(scaleBy);
		fta_stroke1.pushBack(DelayTime::create(0.5));
		auto moveTo = MoveTo::create(0.5, points.at(1));
		fta_stroke1.pushBack(moveTo);
		auto moveTo1 = MoveTo::create(0.5, points.at(2));
		fta_stroke1.pushBack(moveTo1);
		fta_stroke1.pushBack(scaleBy->reverse());
		auto callFunc = CallFunc::create(CC_CALLBACK_0(HelpLayer::removeFinger, this, finger));
		
		auto callFunc1 = CallFunc::create([=]() {
			clickAndDrag(points.at(3), points.at(4));
		});
		fta_stroke1.pushBack(callFunc1);
		fta_stroke1.pushBack(callFunc);
		fta_stroke1.pushBack(DelayTime::create(0.3));
		finger->runAction(Sequence::create(fta_stroke1));
	}
}

void HelpLayer::hideFinger(Node* finger) {
    _animating = false;
    finger->setVisible(false);
}

void HelpLayer::removeFinger(Node* finger) {
    removeChild(finger);
}


static const float GW_WIDTH = 800.0;
static const float GW_HEIGHT = 800.0;
static const float GRAY_WIDTH = 100.0;
static const float GRAY_HEIGHT = 100.0;


Node* HelpLayer::makePanel(Rect windowRect, Rect grayRect) {
    auto grayWindow = Sprite::create("help/graywindow.png");
    addChild(grayWindow);
    grayWindow->setPosition(windowRect.origin);
    grayWindow->setScale(windowRect.size.width / GW_WIDTH, windowRect.size.height / GW_HEIGHT);
    
    auto bottom = Sprite::create("help/gray.png");
    bottom->setPosition(Vec2(grayRect.origin.x + grayRect.size.width / 2, (grayRect.origin.y + (windowRect.origin.y - windowRect.size.height / 2)) / 2));
    bottom->setScale(grayRect.size.width / GRAY_WIDTH, (windowRect.origin.y - windowRect.size.height / 2 - grayRect.origin.y) / GRAY_HEIGHT);
    addChild(bottom);
    
    auto top = Sprite::create("help/gray.png");
    top->setPosition(Vec2(grayRect.origin.x + grayRect.size.width / 2, windowRect.origin.y + windowRect.size.height / 2 + (grayRect.origin.y + grayRect.size.height - windowRect.origin.y - windowRect.size.height / 2) / 2));
    top->setScale(grayRect.size.width / GRAY_WIDTH, (grayRect.size.height + grayRect.origin.y - windowRect.origin.y - windowRect.size.height / 2) / GRAY_HEIGHT);
    addChild(top);

    auto left = Sprite::create("help/gray.png");
    left->setPosition(Vec2((grayRect.origin.x + windowRect.origin.x - windowRect.size.width / 2) / 2, windowRect.origin.y));
    left->setScale(((windowRect.origin.x - windowRect.size.width / 2) - grayRect.origin.x) / GRAY_WIDTH, windowRect.size.height / GRAY_HEIGHT);
    addChild(left);

    auto right = Sprite::create("help/gray.png");
    right->setPosition(Vec2(grayRect.origin.x / 2 + windowRect.origin.x + windowRect.size.width / 2 + (grayRect.size.width - windowRect.origin.x - windowRect.size.width / 2) / 2, windowRect.origin.y));
    right->setScale(((grayRect.size.width + grayRect.origin.x - windowRect.origin.x - windowRect.size.width / 2)) / GRAY_WIDTH, windowRect.size.height / GRAY_HEIGHT);
    addChild(right);
    
    return grayWindow;
    
}

HelpLayer::HelpLayer() :
_animating(false),
_grayWindow(nullptr),
_listener(nullptr)
{
    
}

HelpLayer::~HelpLayer() {
    
}
