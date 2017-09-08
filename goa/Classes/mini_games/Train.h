#ifndef __Train_SCENE_H__
#define __Train_SCENE_H__

#include "cocos2d.h"
#include "../menu/StartMenuScene.h"
#include "../menu/MenuContext.h"
#include "../lang/TextGenerator.h"
#include "../lang/Lesson.h"

class Train : public cocos2d::Layer
{
private:
	Lesson _lesson;
public:
	
	Train();
	~Train();

	MenuContext *_menuContext;
	cocos2d::Size visibleSize;
	cocos2d::Vec2 origin;
	cocos2d::LayerColor *layer1;
	int currentLevel, wordPosition, random;
	std::string wordForSentanceArray;
	std::vector<std::string> sentense;
	cocos2d::RepeatForever *repeatForeverAction;
	cocos2d::Sprite *train, *final_tunnel, *front_tunnel;

	struct Position
	{
		float x, y;
	}p1,p2,p3,p4,p5,p6,p7,p8,p9;
	std::vector<Position> _position;

	struct tunnel
	{
		cocos2d::Sprite *_sprite;
		int selected;
	}tunnel_front, tunnel_back;
	std::vector<tunnel> tunnel_front_sprite;
	std::vector<tunnel> tunnel_back_sprite;

	struct labelDet
	{
		cocos2d::LabelTTF *_label;
		std::string id;
		int selected;
		int index;
		int pos;
		int xP;
		int yP;
	}label;

	std::vector<labelDet> randomLetter;

	//	static std::string mapString;
	static cocos2d::Scene* createScene();
	virtual bool init();
	void onEnterTransitionDidFinish() override;
	void startGame(cocos2d::EventCustom * eventCustom);
	void addEvents(struct labelDet);
	void resetPosition();
	// implement the "static create()" method manually
	CREATE_FUNC(Train);

	static const char* gameName() { return TRAIN.c_str(); }
};

#endif // __HELLOWORLD_SCENE_H__
#pragma once
