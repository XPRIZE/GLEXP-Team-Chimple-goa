#ifndef __CROSSTHEBRIDGE_SCENE_H__
#define __CROSSTHEBRIDGE_SCENE_H__

#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/Alphabet.h"
#include "SimpleAudioEngine.h"

using namespace cocos2d;

class CrossTheBridge : public cocos2d::Layer
{
public:

	static cocos2d::Scene* createScene();

	virtual ~CrossTheBridge();

	virtual bool init();
	virtual void sceneMaking();
	void allUpdateMethod();
	void startGame();
	virtual void leftMove_Alpha(Alphamon* spriteAlphabet, int time, float positionX, float positionY);
	virtual void leftMove_Mons(Sprite* spriteAlphabet, int time, float positionX, float positionY);

	virtual void update(float dt);

	virtual void alphabetAndMonsterGeneration(float dt);

	virtual void alphaDeletion();
	virtual void monsDeletion();

	virtual void checkIntersectWithAlpha();
	virtual void checkIntersectWithMons();

	void removeObjectFromScene_Alpha();
	void removeObjectFromScene_Mons();

	void alphaLoud();

	void alphaIntersectBridgeCurve();
	void monsIntersectBridgeCurve();

	void letterDisplayCombinationMethod();

	void rightAlphaMonDelete();

	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPoint, float rotation, float scaleX, float scaleY);

	virtual void addEvents(Sprite* touchSprite);
	// a selector callback
	void menuCloseCallback(cocos2d::Ref* pSender);

	//static const char* gameName() { return "Cross The Bridge"; };
	static const char* gameName() { return CROSS_THE_BRIDGE.c_str(); };
	
protected:
	Sprite* cubeAtRest;
	Sprite* barrierRight;
	Sprite* barrierLeft;
	Sprite* barrierExtreamLeft;
	Sprite* barrierFlat;
	Sprite* pathClose_right;
	Sprite* pathClose_left;
	Sprite* pathOpen_right;
	Sprite* pathOpen_left;
	Sprite* splash;
	Alphabet* letterOnBoard;
	Sprite* punchForBack;
	Sprite* zeher;
	Sprite* sparkle;
	Sprite* alphaSoundBarrier;
	Sprite* barrierLowerSide;
	MenuContext *_menuContext;
	CocosDenshion::SimpleAudioEngine* gameMelody;

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	std::vector<Alphamon*> alphaContainer;
	std::vector<cocos2d::Sprite*> monsContainer;
	std::vector<Alphabet*> letterContainer;

	char letterAZ[26] = { 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' };
	std::vector<std::vector<wchar_t>> comboFive;
	std::pair<float, float> letterDisplayPosition[8] = { { 183.73,110.17 },{ 547.81,110.17 },{ 912.08, 110.17 },
	{ 1277.22,110.17 } ,{ 1642.29,110.17 } ,{ 2006.91,110.17 } ,
	{ 2371.68,110.17 } ,{ 2734.87,110.17 } };

	bool openFlag = false;
	bool letterIsThere = false;
	bool oneSecondClick = false;
	bool monsterBackFlag = true;
	bool alphaBackFlag = true;
	bool pointGenerater = true;
	int mainScore = 0;
	int alphabetCounter = 0;
	int letterDisplayCounter = 0;
	int enemyCreateCounter = 1;

	Label* myGameScoreLabel;
	wchar_t letterToDisplay;

	cocostudio::timeline::ActionTimeline *water_splash;
	cocostudio::timeline::ActionTimeline *punch;
	cocostudio::timeline::ActionTimeline *smoke;
	cocostudio::timeline::ActionTimeline *star;

	// implement the "static create()" method manually
	CREATE_FUNC(CrossTheBridge);
};

#endif // __CROSSTHEBRIDGE_SCENE_H__
