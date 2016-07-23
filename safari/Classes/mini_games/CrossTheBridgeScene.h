#ifndef __CROSSTHEBRIDGE_SCENE_H__
#define __CROSSTHEBRIDGE_SCENE_H__

#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"

using namespace cocos2d;

class CrossTheBridge : public cocos2d::Layer
{
public:

	static cocos2d::Scene* createScene();
	virtual bool init();
	virtual void sceneMaking();

	virtual void leftMove_Alpha(Sprite* spriteAlphabet, int time, float positionX, float positionY);
	virtual void leftMove_Mons(Sprite* spriteAlphabet, int time, float positionX, float positionY);

	virtual void update(float dt);

	virtual void alphabetGeneration(float dt);
	virtual void monsGeneration(float dt);

	virtual void alphaDeletion();
	virtual void monsDeletion();

	virtual void checkIntersectWithAlpha();
	virtual void checkIntersectWithMons();

	void removeObjectFromScene_Alpha();
	void removeObjectFromScene_Mons();

	void letterDisplayCombinationMethod(float dt);
	void comboFiveDynamicShuffle(float dt);

	virtual void addEvents(Sprite* touchSprite);

	// a selector callback
	void menuCloseCallback(cocos2d::Ref* pSender);

protected:
	Sprite* cubeAtRest;
	Sprite* barrierRight;
	Sprite* barrierLeft;
	Sprite* barrierFlat;
	Sprite* pathClose_right;
	Sprite* pathClose_left;
	Sprite* pathOpen_right;
	Sprite* pathOpen_left;
	Sprite* splash;

	MenuContext *_menuContext;

	std::vector<cocos2d::Sprite*> alphaContainer;
	std::vector<cocos2d::Sprite*> monsContainer;
	std::vector<cocos2d::Label*> letterContainer;

	char letterAZ[26] = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};
	double positionGap_Alpha[22] = { 3.5, 5.5, 6.2, 4.5, 5.4, 3.6, 6.6, 6.0, 8.0,5.4, 6.6, 7.7, 4.5, 8.1, 6.6,3.6,8.4,3.0,5.4,8.5,7.5, 6.5 };
	char comboFive[6] = {};
	std::pair<float, float> letterDisplayPosition[8] = { { 183.73,110.17 },{ 547.81,110.17 },{ 912.08, 110.17 },
	{ 1277.22,110.17 } ,{ 1642.29,110.17 } ,{ 2006.91,110.17 } ,
	{ 2371.68,110.17 } ,{ 2734.87,110.17 } };
	bool openFlag = false;
	bool letterIsThere = false;
	bool oneSecondClick = false;
	int mainScore = 0;
	Label* myGameScoreLabel;

	int letterDisplayCounter = 0;
	cocostudio::timeline::ActionTimeline *water_splash;
	// implement the "static create()" method manually
	CREATE_FUNC(CrossTheBridge);


};

#endif // __CROSSTHEBRIDGE_SCENE_H__
