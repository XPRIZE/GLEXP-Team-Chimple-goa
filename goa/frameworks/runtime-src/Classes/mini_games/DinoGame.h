//
//  Decomon.cpp 
//  goa
//
//  Created by Kirankumar CS on 08/12/16
//
//

#ifndef __DinoGame_LEVEL_SCENE_H__
#define __DinoGame_LEVEL_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"

class DinoGame : public cocos2d::Layer {

public:
	static cocos2d::Scene* createScene();
	static DinoGame* create();
	virtual bool init();
	DinoGame();
	virtual ~DinoGame();
	void onEnterTransitionDidFinish();
protected:
	cocos2d::Layer* _layer;
	MenuContext *_menu;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
};
#endif
