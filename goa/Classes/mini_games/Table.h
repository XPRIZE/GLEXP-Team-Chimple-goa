//
//  Table.h
//  goa
//
//  Created by Kirankumar CS on 24/11/16
//
//


#ifndef __Table_SCENE_H__
#define __Table_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../util/Calculator.h"


class Table : public cocos2d::Layer
{
public:
	Table();
	~Table();
	static Table* create();
	virtual bool init();
	static cocos2d::Scene* createScene();
	void onEnterTransitionDidFinish();
	void calculatedResult(std::string result);

protected:
	MenuContext * menu;
	Calculator * _calculator;
	bool _checkResult = false, _touched = true;
	int _fishNumber,_score, _numberOfAttempt = 0;
	std::string _targetedFishName;
	cocos2d::Point _targetPosition;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	static const char* gameName() { return TABLE.c_str(); };
	std::vector<std::vector<cocos2d::Node*>> _fishMatrix;
	void helpLayer(cocos2d::Node * node);
	void createGrid();
	cocos2d::Vector<cocos2d::Node *> _catchedFish;
	cocos2d::Node * _jellyFish, *_grid, * _target;
	cocostudio::timeline::ActionTimeline * _jellyFishAction;
	void randomFishPicking(float ft);
	void askMissingNumber();
	void gameEnd(float ft);
	std::map<int, std::map<std::string, int>> _levelMapping;
	std::map<std::string, int> _config;
};

#endif 




