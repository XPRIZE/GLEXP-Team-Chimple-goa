//
//  HPMeter.h
//  rpg
//
//  Created by Srikanth Talapadi on 28/06/16.
//
//

#ifndef HPMeter_h
#define HPMeter_h

#include "cocos2d.h"
#include "ui/CocosGUI.h"


class HPMeter : public cocos2d::ui::Slider, public cocos2d::ActionTweenDelegate
{
public:
    virtual void updateTweenAction(float value, const std::string& key) override;
    
    static HPMeter *createWithPercent(int percent);
    static HPMeter *createWithTextureAndPercent(const std::string& background, const std::string& innerBar, const std::string& normalBall, int percent);
    
CC_CONSTRUCTOR_ACCESS:
    HPMeter();
    virtual ~HPMeter();
    bool initWithTextureAndPercent(const std::string& background, const std::string& innerBar, const std::string& normalBall, int percent);
};

#endif /* HPMeter_h */
