#ifndef __Train_SCENE_H__
#define __Train_SCENE_H__

#include "cocos2d.h"

class Train : public cocos2d::Layer
{
public:
	
	//	static std::string mapString;
	static cocos2d::Scene* createScene();
	
	virtual bool init();
	
	// implement the "static create()" method manually
	CREATE_FUNC(Train);
};

#endif // __HELLOWORLD_SCENE_H__
#pragma once
