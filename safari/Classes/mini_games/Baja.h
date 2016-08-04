#ifndef __BAJA_SCENE_H__
#define __BAJA_SCENE_H__

#include "cocos2d.h"

class Baja : public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene();

	virtual bool init();

	// a selector callback
	void menuCloseCallback(cocos2d::Ref* pSender);

	// implement the "static create()" method manually
	CREATE_FUNC(Baja);
};

#endif // __HELLOWORLD_SCENE_H__
