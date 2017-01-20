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
	void change(char  str);
	void addEnemy(int num);
	void topping(char  str);
	void puff();
	void scoreBoard(float dt);
	void onEnterTransitionDidFinish();
	void gameHelp();
	bool _helpFlage = false;
	int _score = 0;
	void bigpuff(float dt);
	float extraX;
	std::string _target;
	std::map<std::string, std::string> _scenePath;
	std::vector<cocos2d::Node *>  _enemyRef;
	std::vector<cocos2d::Node *>  _enemyRef1;
	std::vector<cocos2d::Node *>  _dotRef;
	std::vector<std::string>  _candyRef;
	cocos2d::Node * _friend;
	cocos2d::Node * _enemy;
	cocos2d::Vector <cocos2d::Node *> _candyMoveRef;
	cocos2d::Label * _topLabel;
	cocos2d::Vector <cocos2d::Sprite *> _choiceButton;
	cocos2d::Vector <cocos2d::Label *> _choiceLabel;
	std::vector <std::string> _answers;
	std::map<std::string, std::string> _synonyms;
	std::vector <std::string> _mapKey;
	void wordGenerateWithOptions();
	std::string _gameWord;
	std::string _title = "", _header = "";
	std::map<std::string, std::map<std::string, std::string>> _differntSceneMapping;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);

	cocos2d::Node* background;
	cocos2d::Node* tail;
protected:
	MenuContext * menu;
	static const char* gameName() { return CIRCLE.c_str(); }
};

#endif