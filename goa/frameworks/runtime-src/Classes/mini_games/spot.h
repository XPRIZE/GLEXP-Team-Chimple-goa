
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
	spot();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static spot* create();
	cocos2d::Layer* _layer;
	void onEnterTransitionDidFinish();

	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	
	Calculator * _calculator;
	HelpLayer * _help;
	Node *_bg;
	ui::ScrollView *_scrollView;
	int _helpFlag = 0;
	void addAnimals();
	void gameHelpLayer();
	int _calculateFlag = 0;
	cocos2d::ui::Text * _label;
	void update(float delta);
	bool _calculatorTouched = false;
	int _answerValue=0;
	
	void addCalculator();
	
	
	int _level;
	


	static const char* gameName() { return SPOT.c_str(); }
};

#endif // __SPOT_SCENE_H__
