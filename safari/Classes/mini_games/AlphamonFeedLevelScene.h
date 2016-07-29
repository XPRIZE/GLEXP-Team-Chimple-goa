#ifndef __AlphamonFeedLevelScene_SCENE_H__
#define __AlphamonFeedLevelScene_SCENE_H__

#include "cocos2d.h"

class AlphamonFeedLevelScene : public cocos2d::Layer
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
    static const char* gameName() { return "Alphamon Feed Level Scene";}

	// implement the "static create()" method manually
	CREATE_FUNC(AlphamonFeedLevelScene);
};

#endif // __HELLOWORLD_SCENE_H__
#pragma once
