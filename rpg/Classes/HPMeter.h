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
    virtual bool init() override;
    
    virtual void updateTweenAction(float value, const std::string& key) override;
    
    CREATE_FUNC(HPMeter);
    
protected:
    HPMeter();
    virtual ~HPMeter();
};

#endif /* HPMeter_h */
