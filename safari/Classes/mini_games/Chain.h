#pragma once
#ifndef __Chain_SCENE_H__
#define __Chain_SCENE_H__

#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/Alphabet.h"
#include "SimpleAudioEngine.h"

using namespace cocos2d;


class Chain : public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene();

	virtual bool init();

	// implement the "static create()" method manually
	CREATE_FUNC(Chain);
};

#endif // __Chain_SCENE_H__
