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
#include "AlphabetGrid.h"

class DuelScene : public cocos2d::Node
{
public:
    static cocos2d::Scene* createScene(char myMonChar, char otherMonChar);

    static DuelScene *create(char myMonChar, char otherMonChar);
    virtual void onAlphabetSelected(cocos2d::EventCustom *eventCustom);
    virtual void onAlphabetUnselected(cocos2d::EventCustom *eventCustom);
    
CC_CONSTRUCTOR_ACCESS:
    DuelScene();
    ~DuelScene();
    bool init(char myMonChar, char otherMonChar);
    
protected:
    Alphamon *_myMon;
    Alphamon *_otherMon;
    HPMeter *_timer;
    AlphabetGrid *_grid;
    int _powerIncr;
    int _turnNumber;
    
    // a selector callback
    void menuCloseCallback(cocos2d::Ref *pSender);
    
    void endMeteor(Node *node);
    void reduceHP(Alphamon *amon, int numPoints);
    
    void startMyTurn();
    void armMyMon();
    void attackOtherMon();
    void armOtherMon();
    void attackMyMon();
    void gameOver();
    void returnToPrevScene();

private:
    static const std::string PANEL_NAME;
    static const std::string SLIDER_NAME;
    static const std::string LEFT_STAND_NAME;
    static const std::string RIGHT_STAND_NAME;
    static const int MAX_POINTS_PER_TURN;
    static const int MAX_ROWS = 4;
    static const int MAX_COLS = 12;
    constexpr static const GLfloat SQUARE_WIDTH = 200.0;
    
    
};

#endif /* DuelScene_h */
