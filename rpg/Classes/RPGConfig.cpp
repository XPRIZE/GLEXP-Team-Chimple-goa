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

Size RPGConfig::screenSize = cocos2d::Size::ZERO;
int RPGConfig::externalSkeletonMoveDelta = -2.5f;
std::string RPGConfig::initialMainSceneBase = "camp";

const char* RPGConfig::MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION = "MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION";

const char* RPGConfig::SPEECH_MESSAGE_ON_TAP_NOTIFICATION = "SPEECH_MESSAGE_ON_TAP_NOTIFICATION";

const char* RPGConfig::SPEECH_MESSAGE_ON_TEXT_TAP_NOTIFICATION = "SPEECH_MESSAGE_ON_TEXT_TAP_NOTIFICATION";

const char* RPGConfig::RECEIVE_CUSTOM_MESSAGE_NOTIFICATION = "RECEIVE_CUSTOM_MESSAGE_NOTIFICATION";

const char* RPGConfig::PROCESS_CUSTOM_MESSAGE_AND_CREATE_UI_NOTIFICATION = "PROCESS_CUSTOM_MESSAGE_AND_CREATE_UI_NOTIFICATION";


RPGConfig::RPGConfig() {
}


RPGConfig::~RPGConfig() {
    
}

void RPGConfig::Init()
{
    srand(time(0));
    auto director = Director::getInstance();
    screenSize = director->getWinSize();
}


void RPGConfig::LoadData()
{
    // add Resources folder to search path. This is necessary when releasing for win32
    FileUtils::getInstance()->addSearchPath("Resources");    
    
    // load sound effects & background music
    
    // create and add animations
}

float RPGConfig::calcuateVelocityForJump(cocos2d::Point point1, cocos2d::Point point2, float angle, float xOffSet, float yOffSet) {
    float velocity = 0.0f;
    
    double touchPointDifferenceX = point1.x - point2.x - xOffSet;
    double touchPointDifferneceY = point1.y - point2.y - yOffSet;
    
    if(touchPointDifferenceX > HORIZONTAL_JUMP_THRESHOLD)
    {
        touchPointDifferenceX = HORIZONTAL_JUMP_THRESHOLD;
    }
    
    if(touchPointDifferneceY > VERTICAL_JUMP_THRESHOLD) {
        touchPointDifferneceY = VERTICAL_JUMP_THRESHOLD;
    }
    
    CCLOG("computed touchPointDifferenceX %f", touchPointDifferenceX);
    CCLOG("computed touchPointDifferneceY %f", touchPointDifferneceY);
    velocity = sqrt(std::abs(0.5 * RPG_GRAVITY * (touchPointDifferenceX * touchPointDifferenceX)
                          / (touchPointDifferenceX * tan(angle * PI/RADIAN_TO_DEGREE) - touchPointDifferneceY))) / cos(angle * PI/RADIAN_TO_DEGREE) ;
    
    CCLOG("computed velocity %f", velocity);
    return velocity;
}

float RPGConfig::calcuateAngleForJump(cocos2d::Point point1, cocos2d::Point point2, float xOffSet, float yOffSet)
{
    float angle = 0.0f;
    CCLOG("point1.x = %f point1.y = %f", point1.x, point1.y);
    CCLOG("point2.x = %f point2.y = %f", point2.x, point2.y);
    double touchPointDifferenceX = point1.x - point2.x - xOffSet;
    double touchPointDifferneceY = point1.y - point2.y - yOffSet;
        
    if(touchPointDifferenceX > HORIZONTAL_JUMP_THRESHOLD)
    {
        touchPointDifferenceX = HORIZONTAL_JUMP_THRESHOLD;
    }
    if(touchPointDifferneceY > VERTICAL_JUMP_THRESHOLD) {
        touchPointDifferneceY = VERTICAL_JUMP_THRESHOLD;
    } 
    
    CCLOG("computed touchPointDifferenceX 111 %f", touchPointDifferenceX);
    CCLOG("computed touchPointDifferneceY 111 %f", touchPointDifferneceY);

    
    angle = RADIAN_TO_DEGREE * atan2(touchPointDifferneceY, touchPointDifferenceX)/PI;
    CCLOG("angle 111 %f", angle);
    
    float differenceInAngle = (angle - PERPENDICULAR_ANGLE) > 0 ?  (angle - PERPENDICULAR_ANGLE) * 0.6  : (PERPENDICULAR_ANGLE - angle) * 0.6;
    
    CCLOG("differenceInAngle %f", differenceInAngle);
    if(angle > PERPENDICULAR_ANGLE) {
        angle -= differenceInAngle;
        CCLOG("computed angle %f", angle);
    } else {
        angle += differenceInAngle;
        CCLOG("computed angle %f", angle);
    }
    if(angle < 0) {
        angle += PERPENDICULAR_ANGLE + PERPENDICULAR_ANGLE * 0.6;
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
