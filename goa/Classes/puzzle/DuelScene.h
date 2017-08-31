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
#include "../lang/StudySession.h"

class DuelScene : public cocos2d::Node, public StudySession
{
public:
    static cocos2d::Scene* createScene(Lesson* lesson);

    static DuelScene *create();
    
    virtual void onAlphabetSelected(cocos2d::EventCustom *eventCustom);
    virtual void onAlphabetUnselected(cocos2d::EventCustom *eventCustom);
    
    static const char* gameName() { return DUEL_SCENE.c_str();}
    void onEnterTransitionDidFinish() override;
    void onLessonReady(cocos2d::EventCustom* eventCustom);
    
CC_CONSTRUCTOR_ACCESS:
    DuelScene();
    ~DuelScene();
    bool init() override;
    
protected:
    std::string _myMonStr;
    std::string _otherMonStr;
    std::string _answer;
    std::vector<std::string> _choices;
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
