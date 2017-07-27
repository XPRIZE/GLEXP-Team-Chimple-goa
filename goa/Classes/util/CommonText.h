//
//  CommonText.h
//  goa
//
//  Created by Srikanth Talapadi on 17/12/2016.
//
//

#ifndef CommonText_h
#define CommonText_h

#include "cocos2d.h"
#include "ui/CocosGUI.h"

class CommonText : public cocos2d::ui::Text
{
public:
    static CommonText *create();
    virtual void onEnterTransitionDidFinish() override;
    virtual void  onExitTransitionDidStart() override;
    void setCommonTextInStory(bool fromStory);
    void setSplitFileNameInStory(std::string fileName);
CC_CONSTRUCTOR_ACCESS:
    CommonText();
    virtual ~CommonText();
    virtual bool init() override;
    bool touchSpeak(cocos2d::Touch* touch, cocos2d::Event* event);
protected:
    cocos2d::EventListenerTouchOneByOne *_listener;
    bool isInStory;
    std::string inStoryWhichFilename;
};

#endif /* CommonText_h */
