//
//  Wembley.h
//  
//
//  Created by Jyoti Prakash on 04/08/16.
//
//

#ifndef Wembley_h
#define Wembley_h

#include "cocos2d.h"
#include "../menu/MenuContext.h"


class Wembley : public cocos2d::Layer {
public:
	static cocos2d::Scene* createScene();
	

CC_CONSTRUCTOR_ACCESS:
	virtual bool init();
	Wembley();
	virtual ~Wembley();
	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
	
protected:
	bool _touchActive;
	void setupTouch();
	CC_SYNTHESIZE(int, _count, Count);
	
	CREATE_FUNC(Wembley);
};

#endif /* Wembley_h */
