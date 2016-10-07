//
//  BalloonHero.h
//
//  Created by Jyoti Prakash on 03/10/16.
//
//

#ifndef Balloon_Hero_h
#define Balloon_Hero_h

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"

class BalloonHero : public cocos2d::Layer {
public:
	static cocos2d::Scene* createScene();
	static BalloonHero *create();


CC_CONSTRUCTOR_ACCESS:
	virtual bool init();
	BalloonHero();
	virtual ~BalloonHero();
	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
	void startGame();
	
	static const char* classname() { return WEMBLEY.c_str(); }
protected:
	Node * _balloonHero;
	Node * _foreGround;
	cocos2d::Sprite * _fireFly;
	cocostudio::timeline::ActionTimeline * _fireTimeline;
	void setupTouch();

	MenuContext *_menuContext;

};

#endif /* Balloon_Hero_h */
