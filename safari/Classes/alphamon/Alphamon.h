//
//  Alphamon.h
//  rpg
//
//  Created by Srikanth Talapadi on 02/07/16.
//
//

#ifndef Alphamon_h
#define Alphamon_h

#include "cocos2d.h"
#include "HPMeter.h"


class Alphamon : public cocos2d::Node
{
public:
    static Alphamon *createWithAlphabet(char alphabet);
    void breatheAction();
    cocos2d::ActionInterval *shakeAction();
    void setHealth(int value);
    int getHealth();
    void changeHealth(int value);
    void setPower(int value);
    int getPower();
    void changePower(int value);
    char getAlphabet();
    void startMyTurn();
    void endMyTurn();
    void enableTouch(bool value);
    
CC_CONSTRUCTOR_ACCESS:
    Alphamon();
    virtual ~Alphamon();
    bool initWithAlphabet(char alphabet);
    bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    
protected:
    static const int MAX_HP;
    Node *_monster;
    HPMeter *_hpMeter;
    HPMeter *_powerMeter;
    cocos2d::DrawNode *_drawNode;
    cocos2d::Label *_alphaNode;
    int _hp;
    char _alphabet;
    cocos2d::EventListenerTouchOneByOne *_listener;    
};

#endif /* Alphamon_h */
