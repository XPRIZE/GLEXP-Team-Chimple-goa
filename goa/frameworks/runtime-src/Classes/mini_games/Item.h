#ifndef __ITEM_SCENE_H__
#define __ITEM_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"


class Item : public cocos2d::Layer
{
public:
	Item();
	~Item();
	static Item* create();
	virtual bool init();
	std::map<int, std::map<std::string, int>> _levelMapping;
	void update(float dt);
	void scoreBoard(float dt);
	static cocos2d::Scene* createScene();
	std::map<std::string, std::string> _scenePath;
	float extraX;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
    cocos2d::Node* background;
	void onEnterTransitionDidFinish();
	void gameHelp();
	bool _helpFlage = false;
	static const char* gameName() { return ITEM.c_str(); }
protected:
	bool _rotateFlag = true;
	MenuContext * menu;
	cocos2d::Node* _fish1;
	cocos2d::Node* _fish2;
	cocostudio::timeline::ActionTimeline* _timeline1;
	cocostudio::timeline::ActionTimeline* _timeline2;
	void fishCreate();
	void numCreate();
	void frogCreate();
};

#endif