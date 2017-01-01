#ifndef __PILLAR_SCENE_H__
#define __PILLAR_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"


class Pillar : public cocos2d::Layer
{
public:
	Pillar();
	~Pillar();
	static Pillar* create();
	virtual bool init();
	void update(float dt);
	static cocos2d::Scene* createScene();
	std::map<std::string, std::string> _scenePath;
	std::map<std::string, std::map<std::string, std::string>> _differntSceneMapping;
	float extraX;
	int _num = 0;
	int _score = 0;
	int _count = 0;
	bool _cakeTouchFlag = true;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
    cocos2d::Node* background;
	cocos2d::Sprite* _cake;
	cocos2d::Sprite* _cakeMove;
	cocos2d::Node* _ladder;
	cocos2d::Node* _character;
	cocos2d::Label* _topLabel;
	cocos2d::Sprite* _pointRef;
	std::vector<cocos2d::Node *>  _Ref;
	std::vector<cocos2d::Sprite *>  _pillarRef;
	std::vector<std::string> _wordCorrect;
	std::vector<std::string> _wordList;
	std::string _title = "", _sentence = "";
	void ladderMove();
	void enableListener(float dt);
	void newCake();
	void onEnterTransitionDidFinish();
	void gameHelp();
	bool _helpFlage = false;
	bool _cakeFlag = false;
	void blink(std::string animationName, bool loop);
	static const char* gameName() { return PILLAR.c_str(); }
protected:
	bool _rotateFlag = true;
	MenuContext * menu;
};

#endif