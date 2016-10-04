#ifndef __OWL_SCENE_H__
#define __OWL_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"

using namespace cocos2d;

class Owl : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;

public:
	~Owl();
	static cocos2d::Scene* createScene();
	virtual bool init();

	CREATE_FUNC(Owl);
	void update(float) override;

	static const char* gameName() { return OWL.c_str(); }
};

#endif // __OWL_SCENE_H__
