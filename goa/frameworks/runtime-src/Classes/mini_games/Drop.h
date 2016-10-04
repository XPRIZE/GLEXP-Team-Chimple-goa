#ifndef __DROP_SCENE_H__
#define __DROP_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"

using namespace cocos2d;

class Drop : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;

public:
	~Drop();
	static cocos2d::Scene* createScene();
	virtual bool init();

	CREATE_FUNC(Drop);
	void update(float) override;

	static const char* gameName() { return DROP.c_str(); }
};

#endif // __DROP_SCENE_H__
