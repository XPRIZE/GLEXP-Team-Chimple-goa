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
	virtual void characterRecogination(std::vector<string> str);
	void gameHelpLayer();
	void clearScreen(float ft);
	
protected:
	string _myChar;
	MenuContext * menu;
	bool _helpLayerFlag = false, _gameEnd = true;
	cocos2d::Node* _car;
	cocos2d::DrawNode * _road;
	float _prevDegree;
	carDrawNode * _carDrawNodeLiPi;
	void carMoving();
	float _carPreviousAngle = 0.0f;
	std::vector<Stroke*> _carStrokes;
	Stroke* _carCurrentStroke;
	std::vector <float> _distance;
	CocosDenshion::SimpleAudioEngine* _audio;
	void gameStart();
	void onEnterTransitionDidFinish();
};

#endif 



