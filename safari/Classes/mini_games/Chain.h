#pragma once
#ifndef __Chain_SCENE_H__
#define __Chain_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../GameScene.h"

using namespace cocos2d;

class Chain : public WordScene
{
public:
	static cocos2d::Scene* createScene();
	static Chain *create();
	 ~Chain();
	
	//virtual bool init();

protected:
	cocos2d::Node* loadNode() override;
	std::string getGridBackground() override;
	void createChoice() override;
	Node* gameBg;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	// implement the "static create()" method manually
	//CREATE_FUNC(Chain);
};

#endif // __Chain_SCENE_H__
