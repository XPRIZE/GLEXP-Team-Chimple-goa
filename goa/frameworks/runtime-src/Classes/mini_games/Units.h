
#ifndef __UNITS_SCENE_H__
#define __UNITS_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "../menu/HelpLayer.h"
#include "Calculator.h"

using namespace cocos2d;

class Units : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;
	

public:
	~Units();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static Units* create();
	
	void onEnterTransitionDidFinish();

	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	
	Calculator * _calculator;
	HelpLayer * _help;
	int _helpFlag = 0;
	
	void gameHelpLayer();
	Node * _bg;
	Node * _bgCopy;
	void update(float delta);
	Node *_pizza;
	Vec2 outlet_1;
	Vec2 outlet_2;
	int handleTriggered = 0;
	int _calculateFlag = 0;
	bool _calculatorTouched = false;
	void createOrder(int id);
	void addCalculator();
	void addCookiesToPizza(int pizzaToppingStartId, int pizzaToppingEndId, int cookiesStartId, int cookiesEndId);
	static const char* gameName() { return UNITS.c_str(); }
};

#endif // __UNITS_SCENE_H__
