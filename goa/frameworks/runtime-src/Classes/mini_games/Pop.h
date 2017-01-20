#ifndef POP_WORDSCENE_H__
#define POP_WORDSCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../menu/MenuContext.h"
#include "../menu/GameScene.h"

using namespace cocos2d;

class Pop : public Layer
{
public:
	static cocos2d::Scene* createScene();
	virtual ~Pop();
	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPoint, float rotation, float scaleX, float scaleY);
	virtual bool init();

	//static const char* gameName() { return "Cross The Bridge"; };
	//static const char* gameName() { return Pop.c_str(); };

protected:
			// implement the "static create()" method manually
			CREATE_FUNC(Pop);
			MenuContext *_menuContext;
	
};

#endif // POP_WORDSCENE_H__
#pragma once
