//
//  DinoGame.h 
//  goa
//
//  Created by Kirankumar CS on 08/12/16
//
//

#ifndef __DinoGame_LEVEL_SCENE_H__
#define __DinoGame_LEVEL_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"

class DinoGame : public cocos2d::Layer {

public:
	static cocos2d::Scene* createScene();
	static DinoGame* create();
	virtual bool init();
	DinoGame();
	virtual ~DinoGame();
	void onEnterTransitionDidFinish();
protected:
	CocosDenshion::SimpleAudioEngine * _audioEffect;
	cocos2d::Layer* _layer;
	cocos2d::Node * _dinoNode;
	int _gameScore = 0;
	MenuContext *_menu;
	cocos2d::Point _previousPosition;
	bool _isTouched;
	float _extraX = 0.0f;
	bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
	std::map<int, std::map<std::string, std::string>> _levelConfig;
	std::map<std::string, std::string> _mapping;
	std::vector<std::string> _alphabets;
	void alphabetHint(std::string letter);
	void helpLayer();
	void enableTouchOnAlphabet(float ft);
	void gameStart(float ft);
};
#endif
