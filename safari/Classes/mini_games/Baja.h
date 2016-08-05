#ifndef __BAJA_SCENE_H__
#define __BAJA_SCENE_H__

#include "cocos2d.h"
using namespace cocos2d;

class Baja : public cocos2d::Layer
{

protected:
	Sprite* topBarrier, *bottomBarrier, *currentPathBlock;
	std::vector<Sprite*> allPathBlocks;
	Size visibleSize;
	Vec2 origin;
	bool initBool = true;
public:
	static cocos2d::Scene* createScene();

	virtual bool init();
	Sprite* setSpriteProperties(std::string frameName,float positionX,float positionY,float scaleX, float scaleY, float anchorX, float anchorY,float rotation,int zorder);
	float movingTime(Sprite* ImageObject,int speed);
	int randmValueIncludeBoundery(int min, int max);

	// implement the "static create()" method manually
	CREATE_FUNC(Baja);
	void update(float) override;

	static const char* gameName() { return ENDLESS_RUNNER.c_str(); }
};

#endif // __BAJA_SCENE_H__
