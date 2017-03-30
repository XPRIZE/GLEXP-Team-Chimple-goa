#pragma once
#ifndef __JUMPONWORDS_SCENE_H__
#define __JUMPONWORDS_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"


class JumpOnWords : public cocos2d::Layer
{
public:
	JumpOnWords();
	~JumpOnWords();
	static JumpOnWords* create();
	virtual bool init();
	static cocos2d::Scene* createScene();
	std::map<std::string, std::string> _scenePath;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
	cocos2d::Node* background;
	float extraX;
	void onEnterTransitionDidFinish();
	void gameHelp();
	
	std::vector<std::string>  _alphaList;
	void generateRandomLetters(int count);
	void keypad();
	int _count = 0;
	cocos2d::Node* _cross;
	cocos2d::Node* _tick;
	cocos2d::Node* _hint;
	cocos2d::Node* _char1;
	cocos2d::Node* _ball1,*_ball2, *_ball3, *_ball4, *_ball5, *_ball6, *_ball7, *_ball8, *_ball9, *_ball10;
	//cocos2d::Node* _ball2;
	cocos2d::Node* _box1, *_box2, *_box3, *_box4, *_box5, *_box6, *_box7, *_box8;
	std::vector<cocos2d::Node*>  _boxRef;
	cocos2d::Label*  _alpha1,*_alpha2,*_alpha3,*_alpha4,*_alpha5,*_alpha6,*_alpha7,*_alpha8,*_alpha9,*_alpha10;
	std::vector<cocos2d::Label *>  _wordLabelRef;
	std::string _word;

	void stepCreate();
	void stepLeftMove();
	void stepRightMove();
	void charMove();
	void charJump();
	void jumpCallback();
	void stepMove();
	void verify();
	void jumping();
	void remove();
	void update(float dt);
	int _correct = 0;
	int _stepWidth;
	bool _dirflag = true;
	bool _flag = true;
	bool _tickFlag = true;
	std::vector<cocos2d::Sprite *> _stepRef;
	std::vector<int> _stepLeft = { 2100 ,1800 };
	std::vector<int> _stepRight = { 900 ,1200 , 1500 };
	static const char* gameName() { return JUMPONWORDS.c_str(); }
protected:
	
	MenuContext * menu;
};

#endif