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
	void scaleNumber(int start, int end);
	void update(float dt);
	static cocos2d::Scene* createScene();
	std::map<std::string, std::string> _scenePath;
	float extraX;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
    cocos2d::Node* background;
	cocos2d::Node* NumberLine;
	void onEnterTransitionDidFinish();
	void gameHelp();
	bool _helpFlage = false;
	static const char* gameName() { return LINE.c_str(); }
protected:
	bool _rotateFlag = true;
	MenuContext * menu;
};

#endif