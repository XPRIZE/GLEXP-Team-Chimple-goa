//
//  JumpingNumber.h
//  goa
//
//  Created by Kirankumar CS on 08/11/16
//
//


#ifndef __JumpingNumber_SCENE_H__
#define __JumpingNumber_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"


class JumpingNumber : public cocos2d::Layer
{
public:
	JumpingNumber();
	~JumpingNumber();
	static JumpingNumber* create();
	virtual bool init();
	static cocos2d::Scene* createScene();
	int _myScore, _enemyScore;
	void onEnterTransitionDidFinish();
	void stepsCreate(int numberLabel);
	int _stepPositionX = 0;
protected:
	MenuContext * menu;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	void jumpAnimation(cocos2d::Point pos,bool gameEnd = false);
	void floatingCharacter();
	void layerMoving(cocos2d::Point position);
	int _stepIndex = 0;
	int _passingNumber, _numberDifference, _lastNumber, _maxScore = 0;
	std::string _number;
	void characterAnimation(std::string str, bool loop = false);
	std::vector<cocos2d::Sprite*> _stepReff;
	std::vector<cocos2d::Sprite*> _floatingStepsReff;
	void wrongAnimation(cocos2d::Node * sprite,cocos2d::Point position);
	std::map<int, std::map<int, int>> _levelMapping;
	void gameRestart();
};

#endif 


