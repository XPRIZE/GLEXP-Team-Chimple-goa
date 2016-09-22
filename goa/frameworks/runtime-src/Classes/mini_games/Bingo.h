#pragma once
#ifndef __Bingo_SCENE_H__
#define __Bingo_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../GameScene.h"

using namespace cocos2d;

class Bingo :public cocos2d::Layer
{
public:
	static cocos2d::Scene* createScene();
	virtual bool init();
	void addEvents(Sprite* touchSprite);
	std::vector<std::vector<Sprite *>> createGrid(int row , int column);
	std::vector<std::vector<cocostudio::timeline::ActionTimeline *>> createGridOfCharcater(int row, int column);
	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, Sprite* parent);
	 Bingo();
	~Bingo();
	int bingoHorizotally();
	int bingoVertically();
	int bingoRightDiagonally();
	int bingoLeftDiagonally();

	//static const char* gameName() { return BINGO.c_str(); }
	//virtual bool init();

protected:

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	std::vector<cocos2d::Sprite*> _boxes;
	std::vector<std::vector<Sprite *>> _boxContainer;
	std::vector<std::vector<Sprite *>> _charFace;
	std::vector<std::vector<cocostudio::timeline::ActionTimeline *>> _charAnimContainer;
	Sprite* _boxBoard;

	// implement the "static create()" method manually
	CREATE_FUNC(Bingo);
};


#endif // __Bingo_SCENE_H__
