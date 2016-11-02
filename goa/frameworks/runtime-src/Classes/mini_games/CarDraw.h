//
//  CarDraw.h
//  goa
//
//  Created by Kirankumar CS on 26/10/16
//
//


#ifndef __CARDRAW_SCENE_H__
#define __CARDRAW_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../WordSceneLipiTKNode.h"

class carDrawNode;
class CarDraw : public cocos2d::Layer
{
public:
	CarDraw();
	~CarDraw();
	virtual bool init();
	static cocos2d::Scene* createScene();
	static CarDraw * create();
	void draw(cocos2d::DrawNode* paintingNode, cocos2d::Point fromPoint, cocos2d::Point currentPoint);
	virtual void postTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint);
	virtual void postTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint);
	virtual void postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint);
	virtual void characterRecogination(string str);
protected:
	MenuContext * menu;
	cocos2d::Node* _car;
	cocos2d::DrawNode * _road;
	float _prevDegree;
	carDrawNode * _carDrawNodeLiPi;
	void carMoving();

	std::vector<Stroke*> _carStrokes;
	Stroke* _carCurrentStroke;
};

#endif 



