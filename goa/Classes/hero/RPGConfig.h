//
//  RPGConfig.h
//  Hello3
//
//  Created by Shyamal  Upadhyaya on 24/06/16.
//
//

#ifndef RPGConfig_h
#define RPGConfig_h

#include <string>
#include <sstream>
#include "cocos2d.h"
#include "SimpleAudioEngine.h"


// Helper macros
#define SCREEN_SIZE RPGConfig::screenSize
#define SOUND_ENGINE CocosDenshion::SimpleAudioEngine::sharedEngine()
#define MIN_GESTURE_DISTANCE 30
#define MIN_GESTURE_DISTANCE_UP 30
#define RPG_GRAVITY -2000
#define ENABLE_DEBUGDRAW false
#define MAIN_CHARACTER_MASS 1.0f
#define ALPHAMON_CHARACTER_SCALE 0.5f
#define MAIN_CHARACTER_SCALE 1.0f
#define EXTERNAL_CHARACTER_SCALE 1.0f
#define MAIN_CHARACTER_MASS_DAMPING 0.05f
#define MAIN_CHARACTER_GROUP -1

#define MYPI 3.14159265

#define MAIN_CHARACTER_RUNNING_FORCE 650.0f
#define MAIN_CHARACTER_FORCE 450.0f
#define MAIN_CHARACTER_VERTICAL_IMPULSE 1200.0f
#define MAIN_CHARACTER_HORIZONTAL_RIGHT_IMPULSE 800.0f
#define MAIN_CHARACTER_HORIZONTAL_LEFT_IMPULSE -800.0f
#define MAIN_CHARACTER_IMPULSE_ADJUSTMENT_ON_TAP 0.8f
#define GRAVITY_VELOCITY_TO_STICK_TO_GROUND -20.0f
#define GRAVITY_VELOCITY_TO_STICK_TO_GROUND0 0.0f

#define COMMON_CATEGORY_MASK_OTHER_THAN_GROUND 1
#define GROUND_CATEGORY_MASK 3
#define NON_PASS_THRU_CATEGORY_MASK 5
#define MAIN_CHARACTER_MASS_COLLISION_MASK 3
#define MAIN_CHARACTER_MASS_CATEGORY_MASK 7
#define MAIN_CHARACTER_MASS_CONTACT_MASK 1
#define DYNAMIC_BODY true

#define RADIAN_TO_DEGREE 180.0f
#define HORIZONTAL_JUMP_THRESHOLD 800.0f
#define VERTICAL_JUMP_THRESHOLD 700.0f

#define PERPENDICULAR_ANGLE 90.0f
#define HUMAN_SKELETON_COLLISION_BOX_WIDTH 50.0f
#define HUMAN_SKELETON_COLLISION_BOX_HEIGHT 200.0f
#define JUMP_UP_ENDING_ANIMATION_FRAMES 15

#define OBJECT_TAP_BOUNDING_BOX_WIDTH 400.0f

#define OBJECT_NEAR_BY_BOUNDING_BOX_WIDTH 800.0f

#define ALPHAMON_CREATE_FREQUENCY 30.0f
#define ALPHAMON_DESTRUCTION_FREQUENCY 20.0f

#define INVISIBLE_BOUNDARY_WIDTH 400.0f
#define INVISIBLE_LEFT_BOUNDARY_OFFSET -100.0f
#define INVISIBLE_RIGHT_BOUNDARY_OFFSET 100.0f
#define INVISIBLE_BOUNDARY_CATEGORY_BITMASK 5
#define INVISIBLE_BOUNDARY_COLLISION_BITMASK 2
#define INVISIBLE_BOUNDARY_CONTACT_BITMASK 2


#define TIME_TO_SHOW_WORD_BUBBLE 5.0f

#define WALKING_STARTED "walking_started"
#define HUMAN_SKELETON_NAME "Hero"
#define JUMP_START "jump_start"
#define JUMP_END "jump_down"
#define JUMP_FINISHED "jump_end"
#define JUMP_MID "jump_up"
#define ROLL_SKELETON "roll"
#define ROTATE_SKELETON "rotate"
#define IDLE "idle"
#define WALK "walk"
#define RUN "run"
#define BREAK_ANIM "stop"


#define CHARACTER_PREFERENCE "charPreference"
#define GIRL_CHIMPLE_FILE "chimple_girl_skeleton.csb"
#define MAIN_LAYER "main"
#define BACK_GROUND_LAYER "background"
#define FORE_GROUND_LAYER "foreground"

#define HORIZONTAL_PARALLEX_RATIO 0.7f
#define VERTICAL_PARALLEX_RATIO 0.7f

#define SPEECH_TEXT_FONT_FILE LangUtil::getInstance()->getFontFile()
#define SPEECH_TEXT_WIDTH 350.0f
#define SPEECH_TEXT_HEIGHT 200.0f
#define SPEECH_TEXT_COLOR
#define SPEECH_TEXT_FONT_SIZE 50

#define GLOBAL_DB_NAME "safari.db3"

#define DUEL_SCENE_NAME "DuelScene"

#define TOUCH_POINTER_IMG "touchPointer.png"
#define SEARCH_POINTER_IMG "search.png"

#define SWIPE_DELTA 200.0f
#define Y_OFFSET_IF_HERO_DISAPPER 300.0f
#define X_OFFSET_IF_HERO_DISAPPER 500.0f;

#define HERO "Hero"
#define ANCHOR_X "anchorX"
#define ANCHOR_Y "anchorY"

#define HALF_POINT "0.5"
#define ONE_POINT "1.0"
#define ZERO_POINT "0.0"

#define HERO_HIP "hip"

#define MAP_FILE "map/map.csb"
#define GAME_MAP_FILE "gamemap.csb"
#define SCORE_BOARD_FILE "scoreboard.csb"

#define SKELETON_POSITION_IN_PARENT_ISLAND_X "skeleton_pos_in_island_X"
#define SKELETON_POSITION_IN_PARENT_ISLAND_Y "skeleton_pos_in_island_Y"

#define TASK_FINISHED "finished"

#define EVENT_DISPATCHER Director::getInstance()->getEventDispatcher()

enum SupportedLanguages
{
    ENGLISH = 0,
    KANNADA = 1,
    GERMAN = 2,
    SWAHILI = 3,
    TELUGU = 4
};


enum RPGGestureType
{
    E_GESTURE_NONE = 0,
    E_GESTURE_TAP = 1,
    E_GESTURE_HOLD = 2,
    E_GESTURE_SWIPE_UP = 3,
    E_GESTURE_SWIPE_DOWN = 4,
    E_GESTURE_TOUCH_ENDED= 5
};


enum SkeletonCharacterState {
    S_NONE_STATE = 0,
    S_STANDING_STATE = 1,
    S_WALKING_STATE = 2,
    S_RUNNING_STATE = 3,
    S_JUMPING_STATE = 4,
    S_FALLING_STATE = 5
};


enum Layout {
    LAYOUT_NO_GRAVITY = 0x0000,
    LAYOUT_AXIS_SPECIFIED = 0x0001,
    LAYOUT_AXIS_PULL_BEFORE = 0x0002,
    LAYOUT_AXIS_PULL_AFTER = 0x0004,
    LAYOUT_AXIS_CLIP = 0x0008,
    LAYOUT_AXIS_X_SHIFT = 0,
    LAYOUT_AXIS_Y_SHIFT = 4,
    LAYOUT_TOP = (LAYOUT_AXIS_PULL_BEFORE|LAYOUT_AXIS_SPECIFIED)<<LAYOUT_AXIS_Y_SHIFT,
    LAYOUT_BOTTOM = (LAYOUT_AXIS_PULL_AFTER|LAYOUT_AXIS_SPECIFIED)<<LAYOUT_AXIS_Y_SHIFT,
    LAYOUT_LEFT = (LAYOUT_AXIS_PULL_BEFORE|LAYOUT_AXIS_SPECIFIED)<<LAYOUT_AXIS_X_SHIFT,
    LAYOUT_RIGHT = (LAYOUT_AXIS_PULL_AFTER|LAYOUT_AXIS_SPECIFIED)<<LAYOUT_AXIS_X_SHIFT,
    LAYOUT_CENTER_VERTICAL = LAYOUT_AXIS_SPECIFIED<<LAYOUT_AXIS_Y_SHIFT,
    LAYOUT_FILL_VERTICAL = LAYOUT_TOP|LAYOUT_BOTTOM,
    LAYOUT_CENTER_HORIZONTAL = LAYOUT_AXIS_SPECIFIED<<LAYOUT_AXIS_X_SHIFT,
    LAYOUT_FILL_HORIZONTAL = LAYOUT_LEFT|LAYOUT_RIGHT,
    LAYOUT_CENTER = LAYOUT_CENTER_VERTICAL|LAYOUT_CENTER_HORIZONTAL,
    LAYOUT_FILL = LAYOUT_FILL_VERTICAL|LAYOUT_FILL_HORIZONTAL,
    LAYOUT_CLIP_VERTICAL = LAYOUT_AXIS_CLIP<<LAYOUT_AXIS_Y_SHIFT,
    LAYOUT_CLIP_HORIZONTAL = LAYOUT_AXIS_CLIP<<LAYOUT_AXIS_X_SHIFT,
    LAYOUT_RELATIVE_LAYOUT_DIRECTION = 0x00800000,
    LAYOUT_HORIZONTAL_GRAVITY_MASK = (LAYOUT_AXIS_SPECIFIED | LAYOUT_AXIS_PULL_BEFORE | LAYOUT_AXIS_PULL_AFTER) << LAYOUT_AXIS_X_SHIFT,
    LAYOUT_VERTICAL_GRAVITY_MASK = (LAYOUT_AXIS_SPECIFIED | LAYOUT_AXIS_PULL_BEFORE | LAYOUT_AXIS_PULL_AFTER) << LAYOUT_AXIS_Y_SHIFT,
    LAYOUT_DISPLAY_CLIP_VERTICAL = 0x10000000,
    LAYOUT_DISPLAY_CLIP_HORIZONTAL = 0x01000000,
    LAYOUT_START = LAYOUT_RELATIVE_LAYOUT_DIRECTION | LAYOUT_LEFT,
    LAYOUT_END = LAYOUT_RELATIVE_LAYOUT_DIRECTION | LAYOUT_RIGHT,
    LAYOUT_RELATIVE_HORIZONTAL_GRAVITY_MASK = LAYOUT_START | LAYOUT_END
};






class RPGConfig
{
private:
    static const std::map<std::string, std::map<std::string, std::map<std::string, std::string>>> skeletonConfigs;
    static const std::map<std::string, std::map<std::string, std::map<std::string, std::string>>> createSkeletonConfigsAtLoad();
    
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
    
    static bool enableHandWriting;
    
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
            attributes.insert({trim(key),trim(name)});
            token = strtok(NULL, ",");
        }
        
        delete [] cstr;
        return attributes;
    }

    static bool compareCaseInsensitive(std::string str1, std::string str2) {
        if (strcmp(str1.c_str(), str2.c_str()) == 0) {
            return true;
        }
        return false;
    }
    
    
    //notifications
    static const char* MAIN_CHARACTER_VICINITY_CHECK_NOTIFICATION;
    
    static const char* SPEECH_MESSAGE_ON_TAP_NOTIFICATION;
    
    static const char* SPEECH_MESSAGE_ON_TEXT_TAP_NOTIFICATION;
    
    static const char* RECEIVE_CUSTOM_MESSAGE_NOTIFICATION;
    
    static const char* SPEECH_BUBBLE_DESTROYED_NOTIFICATION;
    
    static const char* PROCESS_CUSTOM_MESSAGE_AND_CREATE_UI_NOTIFICATION;
            
    static const char* ON_TAP_VISIBLE_SPRITE_NOTIFICATION;
    
    static const char* SEND_BUBBLE_DESTROY_NOTIFICATION;
        
    static const char* ON_MENU_EXIT_NOTIFICATION;
    
    static const char* ON_ALPHAMON_PRESSED_NOTIFICATION;
    
    static const char* ON_WORD_INFO_NOTIFICATION;
    
    static const char* WORD_BUBBLE_SHOW_NOTIFICATION;
    
    static const char* WORD_BUBBLE_HIDE_NOTIFICATION;
        
    template <typename T>
    static inline std::string to_string(T value)
    {
        std::ostringstream os ;
        os << value ;
        return os.str() ;
    }

    
    static inline unsigned long hash(std::string& str)
    {
        
        unsigned long generatedHash = std::hash<std::string>()(str);
        return generatedHash;
    }

    
    static inline std::string trim(std::string& str)
    {
        str.erase(0, str.find_first_not_of(' '));       //prefixing spaces
        str.erase(str.find_last_not_of(' ')+1);         //surfixing spaces
        return str;
    }
    
    static std::map<std::string, std::map<std::string, std::string>> getSkeletonConfigMap(std::string key);

    
};

#endif /* RPGConfig_h */
