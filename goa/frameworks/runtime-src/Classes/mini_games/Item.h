#ifndef __ITEM_SCENE_H__
#define __ITEM_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "Calculator.h"


class Item : public cocos2d::Layer
{
public:
	Item();
	~Item();
	static Item* create();
	virtual bool init();
	Calculator * _calculator;
	std::map<int, std::map<std::string, int>> _levelMapping;
	void update(float dt);
	void scoreBoard(float dt);
	static cocos2d::Scene* createScene();
	std::map<std::string, std::string> _scenePath;
	float extraX;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
    cocos2d::Node* background;
	void onEnterTransitionDidFinish();
	void gameHelp();
	void addCalculator();
	bool _helpFlage = false;
	bool _clickFlag = true;
	cocos2d::EventListenerTouchOneByOne* _listener1;
	cocos2d::EventListenerTouchOneByOne* _listener2;
	void calculatedResult(std::string result);
	static const char* gameName() { return ITEM.c_str(); }
protected:
	bool _rotateFlag = true;
	MenuContext * menu;
	bool _flag = false;
	int _frog1Num = 0;
	int _frog2Num = 0;
	cocos2d::Node* _fish1;
	cocos2d::Node* _fish2;
	cocos2d::Node* _done;
	cocos2d::Node* _box1;
	cocos2d::Node* _box2;
	cocos2d::Label* _hintLabel1;
	cocos2d::Label* _hintLabel2;
	cocos2d::Label* _hintLabel3;
	std::string _box1Name;
	cocostudio::timeline::ActionTimeline* _timeline1;
	cocostudio::timeline::ActionTimeline* _timeline2;
	std::vector<Node *> _fishMove;
	std::vector<int>_frogX1 = { 200, 450, 750, 1000, 1250, 900, 600, 350};
	std::vector<int>_frogY1 = { 170, 120, 120, 120,  220,  280, 280, 280};
	std::vector<int>_frogX2 = { 200, 450, 750, 1000, 1250, 900, 600, 350 };
	std::vector<int>_frogY2 = { 150, 130, 130, 130,  240,  270, 270, 270 };
	std::vector<Node*> _boxRef;
	void fish1Create();
	void fish2Create();
	void numCreate();
	void frogCreate();
	void result();
	void verify();
	void check();
	int _count1 = 0, _count2 = 0;
	int _frogCount1 = 0, _frogCount2 = 0, _frogCount3 = 0;
	int _num1 = 0;
	int _num2 = 0;
	int _fillNum = 0;
	int _scoreMax = 0;
};

#endif