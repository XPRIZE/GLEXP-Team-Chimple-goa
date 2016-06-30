//
//  HPMeter.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 28/06/16.
//
//

#include "HPMeter.h"

USING_NS_CC;

bool HPMeter::init()
{
    if(!Slider::init()) {
        return false;
    }
    loadBarTexture("hp_out.png");
    loadProgressBarTexture("hp_in.png");
    setScale9Enabled(true);
    return true;
}

void HPMeter::updateTweenAction(float value, const std::string& key)
{
    setPercent(value);
}

HPMeter::HPMeter()
{
    
}

HPMeter::~HPMeter()
{
    
}
