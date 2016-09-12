#ifndef __ALPHAMOLE_SCENE_H__
#define __ALPHAMOLE_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"

class Alphamole : public cocos2d::Layer
{
public:
	Alphamole();
	~Alphamole();

	static Alphamole* create();
	static cocos2d::Scene* createScene();
}

#endif 