//
//  CommonLabel.h
//  goa
//
//  Created by Srikanth Talapadi on 18/12/2016.
//
//

#ifndef CommonLabel_h
#define CommonLabel_h

#include "cocos2d.h"

using namespace cocos2d;

class CommonLabel : public cocos2d::Label
{
public:
    static CommonLabel* createWithSystemFont(const std::string& text, const std::string& font, float fontSize, const Size& dimensions = Size::ZERO, TextHAlignment hAlignment = TextHAlignment::LEFT, TextVAlignment vAlignment = TextVAlignment::TOP);
    static CommonLabel * createWithTTF(const std::string& text, const std::string& fontFilePath, float fontSize, const Size& dimensions = Size::ZERO, TextHAlignment hAlignment = TextHAlignment::LEFT, TextVAlignment vAlignment = TextVAlignment::TOP);
    static CommonLabel* createWithTTF(const TTFConfig& ttfConfig, const std::string& text, TextHAlignment hAlignment = TextHAlignment::LEFT, int maxLineWidth = 0);
    static CommonLabel* createWithBMFont(const std::string& bmfontPath, const std::string& text, const TextHAlignment& hAlignment = TextHAlignment::LEFT, int maxLineWidth = 0, const Vec2& imageOffset = Vec2::ZERO);
    virtual void onEnterTransitionDidFinish() override;
    virtual void  onExitTransitionDidStart() override;
CC_CONSTRUCTOR_ACCESS:
    CommonLabel(TextHAlignment hAlignment = TextHAlignment::LEFT,
                TextVAlignment vAlignment = TextVAlignment::TOP);
    virtual ~CommonLabel();
    bool init() override;
    bool initWithTTF(const std::string& text, const std::string& fontFilePath, float fontSize, const Size& dimensions = Size::ZERO, TextHAlignment hAlignment = TextHAlignment::LEFT, TextVAlignment vAlignment = TextVAlignment::TOP);
    
    bool initWithTTF(const TTFConfig& ttfConfig, const std::string& text,  TextHAlignment hAlignment = TextHAlignment::LEFT, int maxLineWidth = 0);
    
    bool touchSpeak(cocos2d::Touch* touch, cocos2d::Event* event);
protected:
    cocos2d::EventListenerTouchOneByOne *_listener;
};

#endif /* CommonLabel_h */
