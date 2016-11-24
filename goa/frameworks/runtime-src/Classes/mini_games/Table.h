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


class Table : public cocos2d::Layer
{
public:
	Table();
	~Table();
	static Table* create();
	virtual bool init();
	static cocos2d::Scene* createScene();
	void onEnterTransitionDidFinish();

protected:
	MenuContext * menu;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	static const char* gameName() { return TABLE.c_str(); };
	std::vector<std::vector<cocos2d::Node*>> _fishMatrix;
	void helpLayer();
	void createGrid();
	cocos2d::Vector<cocos2d::Node *> _catchedFish;
	cocos2d::Node * _jellyFish, *_grid;
	cocostudio::timeline::ActionTimeline * _jellyFishAction;
	void randomFishPicking(float ft);
	void askMissingNumber();
};

#endif 




