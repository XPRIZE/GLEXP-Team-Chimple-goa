
#ifndef __SPOT_SCENE_H__
#define __SPOT_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "../menu/HelpLayer.h"
#include "Calculator.h"

using namespace cocos2d;

class spot : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;


public:
	~spot();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static spot* create();

	void onEnterTransitionDidFinish();

	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);

	Calculator * _calculator;
	HelpLayer * _help;
	int _helpFlag = 0;
	
	void gameHelpLayer();
	Node * _bg;
	void update(float delta);
	
	
	
	void addCalculator();
	
	int _answerValue;
	int _level;
	


	static const char* gameName() { return SPOT.c_str(); }
};

#endif // __SPOT_SCENE_H__
