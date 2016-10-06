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
protected:
	MenuContext * menu;
	std::map<std::string, std::string> _scenePath;
	cocos2d::Node * _bg;
	float _yy;
	float _lastBoxPosition;
	void swapBlocks();
	cocos2d::Vector<cocos2d::Sprite *> _boxes;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);

};

#endif 

