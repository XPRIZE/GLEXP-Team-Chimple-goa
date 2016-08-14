//
//  DuelScene.h
//  rpg
//
//  Created by Srikanth Talapadi on 22/06/16.
//
//

#ifndef DuelScene_h
#define DuelScene_h

#include "cocos2d.h"
#include "../alphamon/Alphamon.h"
#include "../alphamon/HPMeter.h"
#include "../menu/MenuContext.h"
#include "AlphabetGrid.h"

class DuelScene : public cocos2d::Node
{
public:
    static cocos2d::Scene* createScene(wchar_t myMonChar, wchar_t otherMonChar);

    static DuelScene *create(wchar_t myMonChar, wchar_t otherMonChar);
    virtual void onAlphabetSelected(cocos2d::EventCustom *eventCustom);
    virtual void onAlphabetUnselected(cocos2d::EventCustom *eventCustom);
    
    static const char* gameName() { return DUEL_SCENE.c_str();}
    
CC_CONSTRUCTOR_ACCESS:
    DuelScene();
    ~DuelScene();
    bool init(wchar_t myMonChar, wchar_t otherMonChar);
    
protected:
    wchar_t _myMonChar;
    wchar_t _otherMonChar;
    Alphamon *_myMon;
    Alphamon *_otherMon;
    Node *_timer;
    Node* _background;
    cocostudio::timeline::ActionTimeline* _timerAnimation;
    cocos2d::Vec2 _timerPosition;
    AlphabetGrid *_grid;
    int _powerIncr;
    int _turnNumber;
    MenuContext* _menuContext;
    
    // a selector callback
    void menuCloseCallback(cocos2d::Ref *pSender);
    
    void endMeteor(Node *node);
    void reduceHP(Alphamon *amon, int numPoints);
    
    void startDuel();
    void startMyTurn();
    void armMyMon();
    void attackOtherMon();
    void armOtherMon();
    void attackMyMon();
    void gameOver();
    void returnToPrevScene();
    void playAnimationTemp(cocostudio::timeline::ActionTimeline* timeline);
    void appearMyMon();
    void appearOtherMon();
    void initial();

    static const std::string BG_NAME;
    static const std::string PANEL_NAME;
    static const std::string SLIDER_BG_NAME;
    static const std::string LEFT_STAND_NAME;
    static const std::string RIGHT_STAND_NAME;
    static const int MAX_POINTS_PER_TURN = 25;
    static const int MAX_ROWS = 4;
    static const int MAX_COLS = 12;
    constexpr static const GLfloat SQUARE_WIDTH = 200.0;
};

#endif /* DuelScene_h */
