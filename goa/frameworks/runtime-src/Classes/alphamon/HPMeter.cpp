//
//  HPMeter.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 28/06/16.
//
//

#include "HPMeter.h"

USING_NS_CC;

HPMeter *HPMeter::createWithPercent(int percent) {
    return HPMeter::createWithTextureAndPercent("battle_ground/white_bar.png", "battle_ground/green_bar.png", "", percent);
}

HPMeter *HPMeter::createWithTextureAndPercent(const std::string &background, const std::string &innerBar, const std::string &normalBall, int percent) {
    HPMeter *hpMeter = new (std::nothrow) HPMeter();
    if(hpMeter && hpMeter->initWithTextureAndPercent(background, innerBar, normalBall, percent)) {
        hpMeter->autorelease();
        return hpMeter;
    }
    CC_SAFE_DELETE(hpMeter);
    return nullptr;
    
}

bool HPMeter::initWithTextureAndPercent(const std::string &background, const std::string &innerBar, const std::string &normalBall, int percent)
{
    if(!Slider::init()) {
        return false;
    }
    if(!background.empty()) {
        loadBarTexture(background, TextureResType::PLIST);
    }
    loadProgressBarTexture(innerBar, TextureResType::PLIST);
//    loadSlidBallTextureNormal(normalBall);
    setScale9Enabled(true);
    setPercent(percent);
    setTouchEnabled(false);
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
