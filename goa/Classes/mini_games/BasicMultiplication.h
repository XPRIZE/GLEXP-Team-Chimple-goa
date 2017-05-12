#ifndef __BASIC_MULTIPLICATION_SCENE_H__
#define __BASIC_MULTIPLICATION_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "SimpleAudioEngine.h"

using namespace cocos2d;
using namespace std;

class BasicMultiplication : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;

public:
	~BasicMultiplication();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static BasicMultiplication* create();
	void onEnterTransitionDidFinish();
	void update(float) override;

	static const char* gameName() { return BASICMULTIPLICATION.c_str(); }
};

#endif // __BASIC_MULTIPLICATION_SCENE_H__
