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
#define SCREEN_SIZE RPGConfig::screenSize
#define SOUND_ENGINE CocosDenshion::SimpleAudioEngine::sharedEngine()
#define MIN_GESTURE_DISTANCE 10
#define RPG_GRAVITY -2000
#define ENABLE_DEBUGDRAW true
#define MAIN_CHARACTER_MASS 1.0f
#define MAIN_CHARACTER_SCALE 0.3f
#define MAIN_CHARACTER_MASS_DAMPING 0.05f
#define MAIN_CHARACTER_GROUP -1

#define PI 3.14159265

#define MAIN_CHARACTER_RUNNING_FORCE 700.f
#define MAIN_CHARACTER_FORCE 400.0f
#define MAIN_CHARACTER_VERTICAL_IMPULSE 1200.0f
#define MAIN_CHARACTER_HORIZONTAL_RIGHT_IMPULSE 700.0f
#define MAIN_CHARACTER_HORIZONTAL_LEFT_IMPULSE -700.0f
#define MAIN_CHARACTER_IMPULSE_ADJUSTMENT_ON_TAP 0.8f
#define GRAVITY_VELOCITY_TO_STICK_TO_GROUND -10.0f

#define MAIN_CHARACTER_MASS_COLLISION_MASK 3
#define MAIN_CHARACTER_MASS_CATEGORY_MASK 7
#define MAIN_CHARACTER_MASS_CONTACT_MASK 1
#define DYNAMIC_BODY true

#define RADIAN_TO_DEGREE 180.0f
#define HORIZONTAL_JUMP_THRESHOLD 700.0f
#define VERTICAL_JUMP_THRESHOLD 700.0f

#define PERPENDICULAR_ANGLE 90.0f
#define HUMAN_SKELETON_COLLISION_BOX_WIDTH 300.0f
#define JUMP_UP_ENDING_ANIMATION_FRAMES 15


#define HUMAN_SKELETON_NAME "Human_Skeleton"
#define JUMP_START "jump_start"
#define JUMP_END "jump_end"
#define JUMP_MID "jump_mid"
#define ROTATE_SKELETON "rotate"


#define MAIN_LAYER "main"
#define BACK_GROUND_LAYER "background"
#define FORE_GROUND_LAYER "foreground"
#define MAIN_SKELETON_KEY "main_character"

#define HORIZONTAL_PARALLEX_RATIO 0.7f
#define VERTICAL_PARALLEX_RATIO 0.7f

#define SPEECH_TEXT_FONT_FILE "fonts/Marker Felt.ttf"
#define SPEECH_TEXT_WIDTH 350.0f
#define SPEECH_TEXT_HEIGHT 200.0f
#define SPEECH_TEXT_COLOR
#define SPEECH_TEXT_FONT_SIZE 40


#define EVENT_DISPATCHER Director::getInstance()->getEventDispatcher()

#define SEND_MESSAGE_TEXT_DESTROYED ( __target__, __notification__, __handler__) EVENT_DISPATCHER->addEventListenerWithSceneGraphPriority(EventListenerCustom::create (__notification__, __handler__), __target__)

#define ADD_VICINITY_NOTIFICATION( __target__, __notification__, __handler__) EVENT_DISPATCHER->addEventListenerWithSceneGraphPriority(EventListenerCustom::create (__notification__, __handler__), __target__)

#define RECEIVE_MESSAGE_FOR_TAP_ON_SPEAKABLE( __target__, __notification__, __handler__) EVENT_DISPATCHER->addEventListenerWithSceneGraphPriority(EventListenerCustom::create (__notification__, __handler__), __target__)

#define PROCESS_MESSAGE_AND_CREATE_UI( __target__, __notification__, __handler__) EVENT_DISPATCHER->addEventListenerWithSceneGraphPriority(EventListenerCustom::create (__notification__, __handler__), __target__)

#define SEND_DISTACH_CLEAN_UP( __target__, __notification__, __handler__) EVENT_DISPATCHER->addEventListenerWithSceneGraphPriority(EventListenerCustom::create (__notification__, __handler__), __target__)

#define SEND_MESSAGE_FOR_TAP_ON_TEXT( __target__, __notification__, __handler__) EVENT_DISPATCHER->addEventListenerWithSceneGraphPriority(EventListenerCustom::create (__notification__, __handler__), __target__)

#define SEND_MESSAGE_FOR_TAP_ON_SPEAKABLE( __target__, __notification__, __handler__) EVENT_DISPATCHER->addEventListenerWithSceneGraphPriority(EventListenerCustom::create (__notification__, __handler__), __target__)




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
    S_NONE_STATE = 0,
    S_STANDING_STATE = 1,
    S_WALKING_STATE = 2,
    S_RUNNING_STATE = 3,
    S_JUMPING_STATE = 4,
    S_FALLING_STATE = 5
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
    
    static float calcuateVelocityForJump(cocos2d::Point point1, cocos2d::Point point2, float angle, float xOffSet, float yOffSet);
    
    static float calcuateAngleForJump(cocos2d::Point point1, cocos2d::Point point2, float xOffSet, float yOffSet);
    
    static float calcuateTimeToStartJumpUpAnimation(float velocity, float angle, float numberOfFramesInAnimation);
    
    //member variables
    static cocos2d::Size screenSize;
    
    static int externalSkeletonMoveDelta;
    
    static inline std::unordered_map<std::string, std::string> parseUserData(std::string userDataStr) {
        char *cstr = new char[userDataStr.length() + 1];
        strcpy(cstr, userDataStr.c_str());
        char *token = strtok(cstr, ",");
        
        std::unordered_map<std::string, std::string> attributes;
        
        while (token != NULL) {
            std::string s(token);
            std::string key = s.substr(0, s.find("="));
            std::string name = s.substr(s.find("=") + 1);
            attributes.insert({key,name});
            token = strtok(NULL, ",");
        }
        
        delete [] cstr;
        return attributes;
    }

    
    
    //notifications
    static const char* MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION;
    
    static const char* SPEECH_MESSAGE_ON_TAP_NOTIFICATION;
    
    static const char* SPEECH_MESSAGE_ON_TEXT_TAP_NOTIFICATION;
    
    static const char* RECEIVE_CUSTOM_MESSAGE_NOTIFICATION;
    
    static const char* SPEECH_BUBBLE_DESTROYED_NOTIFICATION;
    
    static const char* PROCESS_CUSTOM_MESSAGE_AND_CREATE_UI_NOTIFICATION;
    
    static const char* TAP_ON_CLICKABLE_OBJECT_NOTIFICATION;
    
    static const char* DISPATCH_CLEANUP_AND_SCENE_TRANSITION_NOTIFICATION;
    
};

#endif /* RPGConfig_h */
