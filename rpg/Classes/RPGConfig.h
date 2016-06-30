//
//  RPGConfig.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 24/06/16.
//
//

#ifndef RPGConfig_h
#define RPGConfig_h

#include "cocos2d.h"
#include "SimpleAudioEngine.h"

// Helper macros
#define SCREEN_SIZE RPGConfig::screen_size_
#define SOUND_ENGINE CocosDenshion::SimpleAudioEngine::sharedEngine()
#define MIN_GESTURE_DISTANCE 10
#define RPG_GRAVITY -2000
#define ENABLE_DEBUGDRAW true
#define MAIN_CHARACTER_MASS 1.0f
#define MAIN_CHARACTER_MASS_SCALE 0.3f
#define MAIN_CHARACTER_MASS_DAMPING 0.05f

#define PI 3.14159265

#define MAIN_CHARACTER_RUNNING_FORCE 700.f
#define MAIN_CHARACTER_FORCE 400.0f
#define MAIN_CHARACTER_VERTICAL_IMPULSE 1500.0f
#define MAIN_CHARACTER_HORIZONTAL_RIGHT_IMPULSE 700.0f
#define MAIN_CHARACTER_HORIZONTAL_LEFT_IMPULSE -700.0f
#define MAIN_CHARACTER_IMPULSE_ADJUSTMENT_ON_TAP 0.8f
#define GRAVITY_VELOCITY_TO_STICK_TO_GROUND -50.0f

#define MAIN_CHARACTER_MASS_COLLISION_MASK 0x1
#define MAIN_CHARACTER_MASS_CATEGORY_MASK 0x1
#define MAIN_CHARACTER_MASS_CATEGORY_MASK 0x1
#define MAIN_CHARACTER_MASS_CONTACT_MASK 0x1
#define DYNAMIC_BODY true

#define RADIAN_TO_DEGREE 180.0f
#define HORIZONTAL_JUMP_THRESHOLD 700.0f
#define VERTICAL_JUMP_THRESHOLD 700.0f

#define PERPENDICULAR_ANGLE 90.0f

#define JUMP_UP_ENDING_ANIMATION_FRAMES 15

enum RPGGestureType
{
    E_GESTURE_NONE = 0,
    E_GESTURE_TAP,
    E_GESTURE_HOLD,
    E_GESTURE_SWIPE_UP,
    E_GESTURE_SWIPE_DOWN,
    E_GESTURE_SWIPE_LEFT,
    E_GESTURE_SWIPE_RIGHT,
    E_GESTURE_TOUCH_ENDED,
};


enum SkeletonCharacterState {
    S_STANDING_STATE = 0,
    S_WALKING_STATE = 1,
    S_RUNNING_STATE = 2,
    S_JUMPING_STATE = 3,
    S_FALLING_STATE = 4
};

class RPGConfig
{
private:
    RPGConfig();
    ~RPGConfig();
    
public:
    // initialise common global data here
    // called when application finishes launching
    static void Init();
    
    // load initial/all game data here
    static void LoadData();
    
    static float calcuateVelocityForJump(cocos2d::Point point1, cocos2d::Point point2);
    
    static float calcuateAngleForJump(cocos2d::Point point1, cocos2d::Point point2);
    
    static float calcuateTimeToStartJumpUpAnimation(float velocity, float angle, float numberOfFramesInAnimation);
    
    //member variables
    static cocos2d::Size screen_size_;
};

#endif /* RPGConfig_h */
