//
//  CommonLabelTTF.h
//  goa
//
//  Created by Srikanth Talapadi on 18/12/2016.
//
//

#ifndef CommonLabelTTF_h
#define CommonLabelTTF_h

#include "cocos2d.h"

class CommonLabelTTF : public cocos2d::LabelTTF
{
public:
    static CommonLabelTTF *create();
    static CommonLabelTTF *create(const std::string& string, const std::string& fontName, float fontSize, const cocos2d::Size& dimensions = cocos2d::Size::ZERO, cocos2d::TextHAlignment hAlignment = cocos2d::TextHAlignment::CENTER, cocos2d::TextVAlignment vAlignment = cocos2d::TextVAlignment::TOP);
    virtual void onEnterTransitionDidFinish() override;
    virtual void  onExitTransitionDidStart() override;
CC_CONSTRUCTOR_ACCESS:
    CommonLabelTTF();
    virtual ~CommonLabelTTF();
    bool initWithString(const std::string& string, const std::string& fontName, float fontSize, const cocos2d::Size& dimensions = cocos2d::Size::ZERO, cocos2d::TextHAlignment hAlignment = cocos2d::TextHAlignment::LEFT, cocos2d::TextVAlignment vAlignment = cocos2d::TextVAlignment::TOP);
    bool touchSpeak(cocos2d::Touch* touch, cocos2d::Event* event);
protected:
    cocos2d::EventListenerTouchOneByOne *_listener;
};

#endif /* CommonLabelTTF_h */
