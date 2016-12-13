//
//  Order.h
//  goa
//
//  Created by Kirankumar CS on 05/10/16
//
//


#ifndef __ORDER_SCENE_H__
#define __ORDER_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"


class Order : public cocos2d::Layer
{
public:
	Order();
	~Order();
	static Order* create();
	virtual bool init();
	static cocos2d::Scene* createScene();
	int _myScore, _enemyScore, _iteration = 0;
protected:
	MenuContext * menu;
	cocos2d::Color3B _color;
	std::map<std::string, std::string> _scenePath;
	cocos2d::Node * _bg, * _character;
	cocostudio::timeline::ActionTimeline * _characterAnimation;
	std::string _themeName;
	std::vector<std::string> _sortedList;
	std::map<std::string, std::map<std::string, std::string>> _differntSceneMapping;
	std::map<std::string, std::map<std::string, float>> _differentPointsConfig;
	//std::map<std::string, std::string> _scenePath;
	bool _cartFloating = false, _touched = true;
	float _yy, _cartMove;
	float _lastBoxPosition;
	void checkUserSortList(std::vector<int> list);
	void animationWithRandomInterval();
	cocos2d::Vector<cocos2d::Sprite *> _boxes;
	void cartAnimation(std::string animationName, bool loop);
	void winAnimation();
	void otherPlayer(int score);
	void overlapBlockChecking();
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
	static const char* gameName() { return ORDER.c_str(); }
	void onEnterTransitionDidFinish();
	void gameHelp();
	bool _helpLayer = false;
	int _enemyScore11 = 0;
};

#endif 

