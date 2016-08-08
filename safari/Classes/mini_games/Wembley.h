#ifndef __Jasmin_Mainfile_SCENE_H__
#define __Jasmin_Mainfile_SCENE_H__

#include "cocos2d.h"
#include "lang/TextGenerator.h"

class Wembley : public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene();

	static float height, width, originX, originY;

	virtual bool init();
	void startGame();

	// implement the "static create()" method manually
	CREATE_FUNC(Wembley);
};

#endif // Wembley_SCENE_H__
