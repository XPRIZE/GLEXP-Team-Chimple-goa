//
//  RPGConfig.cpp
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 24/06/16.
//
//

#include <stdio.h>
#include <cmath>
#include "RPGConfig.h"

USING_NS_CC;

Size RPGConfig::screen_size_ = cocos2d::Size::ZERO;

RPGConfig::RPGConfig() {
    
}


RPGConfig::~RPGConfig() {
    
}

void RPGConfig::Init()
{
    srand(time(0));
    auto director = Director::getInstance();
    screen_size_ = director->getWinSize();
}


void RPGConfig::LoadData()
{
    // add Resources folder to search path. This is necessary when releasing for win32
    FileUtils::getInstance()->addSearchPath("Resources");
    
    // load sound effects & background music
    
    // create and add animations
}

float RPGConfig::calcuateVelocityForJump(cocos2d::Point point1, cocos2d::Point point2) {
    float velocity = 0.0f;
    
    double touchPointDifferenceX = point1.x - point2.x;
    double touchPointDifferneceY = point1.y - point2.y;
    
    float angle = 0.0f;
    
    if(touchPointDifferenceX > HORIZONTAL_JUMP_THRESHOLD)
    {
        touchPointDifferenceX = HORIZONTAL_JUMP_THRESHOLD;
    }
    
    if(touchPointDifferneceY > VERTICAL_JUMP_THRESHOLD) {
        touchPointDifferneceY = VERTICAL_JUMP_THRESHOLD;
    }
    
    angle = RADIAN_TO_DEGREE * atan2(touchPointDifferneceY, touchPointDifferenceX)/PI;
    
    
    float differenceInAngle = (angle - PERPENDICULAR_ANGLE) > 0 ?  (angle - PERPENDICULAR_ANGLE) / 2  : (PERPENDICULAR_ANGLE - angle) / 2;
    if(angle > PERPENDICULAR_ANGLE) {
        angle -= differenceInAngle;
    } else {
        angle += differenceInAngle;
    }
    
    
    velocity = sqrt(std::abs(0.5 * RPG_GRAVITY * (touchPointDifferenceX * touchPointDifferenceX)
                          / (touchPointDifferenceX * tan(angle * PI/RADIAN_TO_DEGREE) - touchPointDifferneceY))) / cos(angle * PI/RADIAN_TO_DEGREE) ;
    
    
    return velocity;
}

float RPGConfig::calcuateAngleForJump(cocos2d::Point point1, cocos2d::Point point2)
{
    float angle = 0.0f;
    
    double touchPointDifferenceX = point1.x - point2.x;
    double touchPointDifferneceY = point1.y - point2.y;
        
    if(touchPointDifferenceX > HORIZONTAL_JUMP_THRESHOLD)
    {
        touchPointDifferenceX = HORIZONTAL_JUMP_THRESHOLD;
    }
    
    if(touchPointDifferneceY > VERTICAL_JUMP_THRESHOLD) {
        touchPointDifferneceY = VERTICAL_JUMP_THRESHOLD;
    }
    
    angle = RADIAN_TO_DEGREE * atan2(touchPointDifferneceY, touchPointDifferenceX)/PI;
    
    
    float differenceInAngle = (angle - PERPENDICULAR_ANGLE) > 0 ?  (angle - PERPENDICULAR_ANGLE) / 2  : (PERPENDICULAR_ANGLE - angle) / 2;
    if(angle > PERPENDICULAR_ANGLE) {
        angle -= differenceInAngle;
    } else {
        angle += differenceInAngle;
    }
    
    return angle;
}


float RPGConfig::calcuateTimeToStartJumpUpAnimation(float velocity, float angle, float numberOfFramesInAnimation) {
    
    float verticalVelocity = velocity * sin(angle * PI/RADIAN_TO_DEGREE);
    
    float TotalTime = 2 * verticalVelocity / RPG_GRAVITY;
    
//    float height = 0.5 * RPG_GRAVITY * (TotalTime / 2  * TotalTime / 2);
//    CCLOG("approx possible height %f", height);
    
    float timeToStartAnimation = TotalTime * 0.5 - numberOfFramesInAnimation/Director::getInstance()->getFrameRate();
    
    return timeToStartAnimation;
}
