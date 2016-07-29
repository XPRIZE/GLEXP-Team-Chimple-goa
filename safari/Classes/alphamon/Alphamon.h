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
#include "editor-support/cocostudio/CocoStudio.h"


class Alphamon : public cocos2d::Node
{
public:
    static Alphamon *createWithAlphabet(wchar_t alphabet);
    void breatheAction();
	void blinkAction();
	void eatAction();
	void walkAction();
	void stopBlinkAction();
	void stopEatAction();
	void stopWalkAction();
	cocos2d::Vector < cocos2d::Node *> getAlphamonChildren();
    cocos2d::ActionInterval *shakeAction();
    void setHealth(int value, std::string color = "green");
    int getHealth();
    void changeHealth(int value);
    void setPower(int value);
    int getPower();
    void changePower(int value);
    void showPower(bool left = true);
    void hidePower();
    wchar_t getAlphabet();
    void startMyTurn();
    void endMyTurn();
    void enableTouch(bool value);
    virtual cocos2d::Rect getBoundingBox() const override;
    cocos2d::Vec2 getCenterPosition();
	void alphamonMouthAnimation(std::string animationName, bool loop = false);
	void alphamonEyeAnimation(std::string animationName , bool loop = false);
	void alphamonLegAnimation(std::string animationName, bool loop = false);
    
CC_CONSTRUCTOR_ACCESS:
    Alphamon();
    virtual ~Alphamon();
    bool initWithAlphabet(wchar_t alphabet);
    bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);

protected:
    static const int MAX_HP;
    Node *_monster;
    HPMeter *_hpMeter;
    HPMeter *_powerMeter;
	cocos2d::Vector <cocostudio::timeline::ActionTimeline *> mouthAnimation;
	cocos2d::Vector <cocostudio::timeline::ActionTimeline *> legAnimation;
	cocos2d::Vector <cocostudio::timeline::ActionTimeline *> eyeAnimation;
    cocos2d::DrawNode *_drawNode;
    cocos2d::Label *_alphaNode;
    int _hp;
    int _power;
    wchar_t _alphabet;
    cocos2d::EventListenerTouchOneByOne *_listener;    
};

#endif /* Alphamon_h */
