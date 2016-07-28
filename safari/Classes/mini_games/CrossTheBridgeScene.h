#ifndef __CROSSTHEBRIDGE_SCENE_H__
#define __CROSSTHEBRIDGE_SCENE_H__

#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/Alphabet.h"

using namespace cocos2d;

class CrossTheBridge : public cocos2d::Layer
{
public:

	static cocos2d::Scene* createScene();
	virtual bool init();
	virtual void sceneMaking();

	virtual void leftMove_Alpha(Alphamon* spriteAlphabet, int time, float positionX, float positionY);
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

	void alphaLoud();

	void alphaIntersectBridgeCurve();
	void monsIntersectBridgeCurve();

	void letterDisplayCombinationMethod(float dt);

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
	Sprite* alphaSoundBarrier;
	Sprite* barrierLowerSide;
	MenuContext *_menuContext;

	std::vector<Alphamon*> alphaContainer;
	std::vector<cocos2d::Sprite*> monsContainer;
	std::vector<Alphabet*> letterContainer;

	char letterAZ[26] = {'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};
	double positionGap_Alpha[22] = { 3.5, 5.5, 6.2, 4.5, 5.4, 3.6, 6.6, 6.0, 2.0,5.4, 6.6, 7.7, 4.5, 4.1, 6.6,3.6,6.4,3.0,5.4,8.5,3.3, 6.5 };
	std::vector<std::vector<wchar_t>> comboFive;
	std::pair<float, float> letterDisplayPosition[8] = { { 183.73,110.17 },{ 547.81,110.17 },{ 912.08, 110.17 },
	{ 1277.22,110.17 } ,{ 1642.29,110.17 } ,{ 2006.91,110.17 } ,
	{ 2371.68,110.17 } ,{ 2734.87,110.17 } };
	
	bool openFlag = false;
	bool letterIsThere = false;
	bool oneSecondClick = false;
	
	int mainScore = 0;
	int alphabetCounter = 0;
	int letterDisplayCounter = 0;

	Label* myGameScoreLabel;
	char letterToDisplay = 'A';

	cocostudio::timeline::ActionTimeline *water_splash;

	// implement the "static create()" method manually
	CREATE_FUNC(CrossTheBridge);
};

#endif // __CROSSTHEBRIDGE_SCENE_H__
