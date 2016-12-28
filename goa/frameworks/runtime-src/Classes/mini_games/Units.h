
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
	void createPizza();
	void gameHelpLayer();
	Node * _bg;
	void update(float delta);
	Node *_pizza1;
	Node *_pizza2;
	Node *_pizza3;
	Node *_pizza4;
	Node *pizza1;
	Node *pizza2;
	Node *pizza3;
	Node *pizza4;
	int _enterPressedFlag = 0;
	int _gameOverFlag = 0;
	Vec2 outlet_1;
	Vec2 outlet_2;
	int handleTriggered = 0;
	int _calculateFlag = 0;
	bool _calculatorTouched = false;
	void createOrder(int id);
	void createNthOrder();
	void addCalculator();
	void hideUnwated(int level);
	int _startCookieId=1;
	int _endCookieId=10;
	int orderIteration =  0;
	int _answerValue;
	int _level;
	//Node* _tempCookie;
	
	cocostudio::timeline::ActionTimeline* _openTimeline;
	
	//void addCookiesToPizza(int pizzaToppingStartId, int pizzaToppingEndId, int cookiesStartId, int cookiesEndId);
	static const char* gameName() { return UNITS.c_str(); }
};

#endif // __UNITS_SCENE_H__
