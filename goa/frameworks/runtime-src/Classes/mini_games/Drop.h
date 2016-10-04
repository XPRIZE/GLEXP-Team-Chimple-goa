#pragma once
#ifndef __Drop_SCENE_H__
#define __Drop_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../GameScene.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"

using namespace cocos2d;

class Drop :public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene();
	virtual bool init();

	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, Sprite* parent);
	
	Drop();
	~Drop();

	//static const char* gameName() { return BINGO.c_str(); }

protected:

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	MenuContext* _menuContext;
	// implement the "static create()" method manually
	CREATE_FUNC(Drop);
};


#endif // __Drop_SCENE_H__
#pragma once
