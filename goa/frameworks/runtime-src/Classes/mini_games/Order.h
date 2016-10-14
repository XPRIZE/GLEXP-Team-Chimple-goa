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
	int _myScore, _enemyScore;
protected:
	MenuContext * menu;
	cocos2d::Color3B _color;
	std::map<std::string, std::string> _scenePath;
	cocos2d::Node * _bg;
	std::string _themeName;
	//std::map<std::string, std::string> _scenePath;
	bool _cartFloating = false;
	float _yy, _cartMove;
	float _lastBoxPosition;
	void checkUserSortList(std::vector<int> list);
	void animationWithRandomInterval();
	cocos2d::Vector<cocos2d::Sprite *> _boxes;
	void cartAnimation(std::string animationName, bool loop);
	void winAnimation();
	void otherPlayer(int score);
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
	static const char* gameName() { return ORDER.c_str(); }
};

#endif 

