//
//  Dash.h
//  goa
//
//  Created by Kirankumar CS on 20/09/16
//
//


#ifndef __DASH_SCENE_H__
#define __DASH_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"


class Dash : public cocos2d::Layer
{
public:
	Dash();
	~Dash();
	static Dash* create();
	virtual bool init();
	static cocos2d::Scene* createScene();
protected:
	cocos2d::Layer * _stepLayer;
	cocos2d::Label * _topLabel;
	std::map<std::string, std::string> _synonyms;
	std::vector <std::string> _mapKey;
	cocos2d::Vector <cocos2d::Sprite *> _choiceButton;
	cocos2d::Vector <cocos2d::Label *> _choiceLabel;
	cocos2d::Node * _character;
	void wordCheck();
	MenuContext * menu;
	void myCharacterJumping();
	void wordGenerateWithOptions();
	std::string _gameWord;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	
};

#endif 
