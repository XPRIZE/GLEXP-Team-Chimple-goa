#ifndef __SmashTheRockLevelScene_SCENE_H__
#define __SmashTheRockLevelScene_SCENE_H__

#include "cocos2d.h"

class SmashTheRockLevelScene : public cocos2d::Layer
{
public:
	
	//	static std::string mapString;
	static cocos2d::Scene* createScene();
	
	virtual bool init();
	
	// a selector callback
	void menuCloseCallback(cocos2d::Ref* pSender);

	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchCancelled(cocos2d::Touch *touch, cocos2d::Event * event);
	// implement the "static create()" method manually
	CREATE_FUNC(SmashTheRockLevelScene);
};

#endif // __HELLOWORLD_SCENE_H__
#pragma once
