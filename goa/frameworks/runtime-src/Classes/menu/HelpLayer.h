//
//  HelpLayer.h
//  goa
//
//  Created by Srikanth Talapadi on 18/10/2016.
//
//

#ifndef HelpLayer_h
#define HelpLayer_h

#include "cocos2d.h"

class HelpLayer : public cocos2d::Node {
public:
    static HelpLayer* create(cocos2d::Rect touchRect, cocos2d::Rect otherRect);
    void click(cocos2d::Vec2 point);
    void clickTwice(cocos2d::Vec2 point1, cocos2d::Vec2 point2);
    void clickAndDrag(cocos2d::Vec2 startPoint, cocos2d::Vec2 endPoint);
	void writing(std::vector<cocos2d::Point> points);

CC_CONSTRUCTOR_ACCESS:
    HelpLayer();
    virtual ~HelpLayer();
    bool init(const cocos2d::Rect touchRect, const cocos2d::Rect otherRect);
protected:
    cocos2d::EventListenerTouchOneByOne* _listener;
    cocos2d::Node* _grayWindow;
    bool _animating;
    cocos2d::Node* makePanel(const cocos2d::Rect windowRect, const cocos2d::Rect grayRect);
    bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event *event);
    void removeFinger(cocos2d::Node* finger);
    void hideFinger(cocos2d::Node* finger);
};
#endif /* HelpLayer_h */
