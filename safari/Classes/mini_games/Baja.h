#ifndef __BAJA_SCENE_H__
#define __BAJA_SCENE_H__

#include "cocos2d.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"

using namespace cocos2d;

class Baja : public cocos2d::Layer
{

protected:
	Sprite* _topBarrier, *_bottomBarrier, *_currentPathBlock;
	std::vector<Sprite*> _allPathBlocks;
	Size _visibleSize;
	Vec2 _origin;
	bool _initBool = true;

public:
	static cocos2d::Scene* createScene();
	virtual bool init();
	Sprite* setSpriteProperties(std::string frameName,float positionX,float positionY,float scaleX, float scaleY, float anchorX, float anchorY,float rotation,int zorder);
	float movingTime(Sprite* ImageObject,int speed);
	int randmValueIncludeBoundery(int min, int max);

	// implement the "static create()" method manually
	CREATE_FUNC(Baja);
	void update(float) override;
	static const char* gameName() { return BAJA.c_str(); }
};

#endif // __BAJA_SCENE_H__
