#ifndef __LINE_SCENE_H__
#define __LINE_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"


class Line : public cocos2d::Layer
{
public:
	Line();
	~Line();
	static Line* create();
	virtual bool init();
	void scaleNumber(int start, int end, int mid);
	std::vector<cocos2d::Node *>  _nodeRef;
	std::vector<cocos2d::Sprite *>  _tagRef;
	std::vector<std::string> _five;
	std::vector<std::string> _numRef;
	void tagCreate(int choice);
	std::map<int, std::map<std::string, int>> _levelMapping;
	void update(float dt);
	void scoreBoard(float dt);
	static cocos2d::Scene* createScene();
	std::map<std::string, std::string> _scenePath;
	float extraX;
	int _diff = 0;
	int _startNum;
	int _endNum;
	int _mid;
	int _level = 0;
	float _tagX = 0;
	float _tagY = 0;
	int _tagNum = 0;
	int _score = 0;
	bool _flag = true;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
    cocos2d::Node* background;
	cocos2d::Node* _NumberLine;
	cocos2d::Sprite* _tag;
	void onEnterTransitionDidFinish();
	void gameHelp();
	bool _helpFlage = false;
	static const char* gameName() { return LINE.c_str(); }
protected:
	bool _rotateFlag = true;
	MenuContext * menu;
};

#endif