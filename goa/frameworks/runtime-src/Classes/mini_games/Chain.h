#pragma once
#ifndef __Chain_SCENE_H__
#define __Chain_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../menu/GameScene.h"
#include "../puzzle/GraphemeGrid.h"
#include "../puzzle/Grapheme.h"

using namespace cocos2d;

class Chain : public WordScene
{
public:
	static cocos2d::Scene* createScene();
	static Chain *create();
	static std::string _SS;
	//void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
	Chain();
	~Chain();

	static const char* gameName() { return CHAIN.c_str(); }
	//virtual bool init();

protected:
	cocos2d::Node* loadNode() override;
	Node* _node;
	std::string getGraphemeUnselectedBackground() override;
	std::string getGraphemeSelectedBackground() override;
	std::string getGridBackground() override;
	void createAnswer() override;
	GraphemeGrid* createGraphemeGrid(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground) override;
	void createChoice() override;
	Node* _gameBg;
	void gameOver(bool correct) override;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	std::vector<Node*>_eleContainer;
	std::vector<Node*>_flamContainer;


	// implement the "static create()" method manually
	//CREATE_FUNC(Chain);
};

class ChainGrid : public GraphemeGrid
{
public:
	static ChainGrid *create(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground);
	std::string _sceneType1;
CC_CONSTRUCTOR_ACCESS:
	bool init(GLfloat width, GLfloat height, int numRows, int numCols, std::string spriteName, std::vector<std::vector<std::string>> graphemes, std::string graphemeUnselectedBackground, std::string graphemeSelectedBackground);

protected:
	Grapheme* createGrapheme(std::string graphemeString) override;
	Grapheme* createAndAddGrapheme(std::string graphemeString) override;
};

class ChainGrapheme : public Grapheme
{
public:
	static ChainGrapheme* create(std::string graphemeString);
	void setSelectedBackground(Node* selectedBackground) override;
	void animateToPositionAndChangeBackground(cocos2d::Vec2 toPosition) override;
CC_CONSTRUCTOR_ACCESS:
	bool init(std::string graphemeString);
protected:
	Node* _letterBG;
	cocostudio::timeline::ActionTimeline *_monkeyTimeline;
};

#endif // __Chain_SCENE_H__
