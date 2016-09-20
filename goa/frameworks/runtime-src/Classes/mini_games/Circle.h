#ifndef __CIRCLE_SCENE_H__
#define __CIRCLE_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"


class Circle : public cocos2d::Layer
{
public:
	Circle();
	~Circle();
	static Circle* create();
	virtual bool init();
	static cocos2d::Scene* createScene();
protected:
	MenuContext * menu;
};

#endif