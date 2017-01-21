//
//  Spirograph.h
//  safari
//
//  Created by Srikanth Talapadi on 18/08/16.
//
//

#ifndef Spirograph_h
#define Spirograph_h

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "SimpleAudioEngine.h"

class Spirograph : public cocos2d::Node {
public:
    static cocos2d::Scene* createScene();
    static Spirograph *create();
    virtual void update(float dt) override;
	int cx, cy, _divPI;
	CocosDenshion::SimpleAudioEngine* audioBg;

	cocos2d::Sprite *_innercircle1, *_innercircle2, *_innercircle3;
	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	void startGame();

CC_CONSTRUCTOR_ACCESS:
    Spirograph();
    virtual ~Spirograph();
    bool init();

protected:
    float random(float min, float max);
    cocos2d::Vec2 trace();
    MenuContext* _menuContext;
    float _R, _r, _rho, _spirality, _step, _t;
    int _limit;
    cocos2d::DrawNode* _drawNode;
    cocos2d::Vec2 _pos;    
};

#endif /* Spirograph_h */
