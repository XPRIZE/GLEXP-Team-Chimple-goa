#ifndef __CIRCLE_SCENE_H__
#define __CIRCLE_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"


class Circle : public cocos2d::Layer
{
public:
	Circle();
	~Circle();
	static Circle* create();
	virtual bool init();
	static cocos2d::Scene* createScene();
	void eat(char  str);
	void change(float dt);
	std::string _target;
	std::vector<cocos2d::Node *>  _fishRef;
	std::vector<cocos2d::Node *>  _dotRef;
	cocos2d::Node * _octopus;
	cocos2d::Label * _topLabel;
	cocos2d::Vector <cocos2d::Sprite *> _choiceButton;
	cocos2d::Vector <cocos2d::Label *> _choiceLabel;
	std::map<std::string, std::string> _synonyms;
	std::vector <std::string> _mapKey;
	void wordGenerateWithOptions();
	std::string _gameWord;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);

	cocos2d::Node* background;
	cocos2d::Node* tail;
protected:
	MenuContext * menu;
};

#endif