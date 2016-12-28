
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
	cocos2d::ui::Text * _label1;
	cocos2d::ui::Text * _label2;
	void update(float delta);
	bool _calculatorTouched = false;
	int _answerValue=0;
	int nOFbuffalo = 0;
	int nOFcow = 0; 
	int nOFgoat = 0; 
	int nOFhorse = 0; 
	int nOFpig = 0; 
	int nOFsheep = 0;
	int _incrementValue = 0;
	void addCalculator();
	Node *questionPlate;
	struct levelIterations {
		
		std::string animalName;
		std::string animalIcon;
		int count;

	};
	
	std::vector<struct levelIterations> _slots;
	
	int _currentSlot = 0;
	int _level;
	Vec2 platePosition;
	void changeQuestion();

	static const char* gameName() { return SPOT.c_str(); }
};

#endif // __SPOT_SCENE_H__
