#ifndef __CROSSTHEBRIDGE_SCENE_H__
#define __CROSSTHEBRIDGE_SCENE_H__

#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/Alphabet.h"
#include "SimpleAudioEngine.h"
#include "../lang/Lesson.h"


using namespace cocos2d;

class CrossTheBridge : public cocos2d::Layer
{
private:
	Lesson *_lesson;
public:

	static cocos2d::Scene* createScene();
	// implement the "static create()" method manually
	CREATE_FUNC(CrossTheBridge);
	CrossTheBridge();
	~CrossTheBridge();

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
	void onEnterTransitionDidFinish();
	// a selector callback
	void menuCloseCallback(cocos2d::Ref* pSender);
	void creatHelp(Sprite* letterBoard, Sprite* pixel);

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
	Sprite* transparentBG;
	CocosDenshion::SimpleAudioEngine* gameMelody;

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	std::vector<Alphamon*> alphaContainer;
	std::vector<cocos2d::Sprite*> monsContainer;
	std::vector<cocos2d::LabelTTF*> letterContainer;

	std::vector<std::vector<wchar_t>> comboFive;

	bool openFlag = false;
	bool letterIsThere = false;
	bool oneSecondClick = false;
	bool monsterBackFlag = true;
	bool alphaBackFlag = true;
	bool pointGenerater = true;
	bool alphaSoundFlag = true;
	int _pointCounter = 0;
	int alphabetCounter = 0;
	int letterDisplayCounter = 0;
	int enemyCreateCounter = 1;
	int _gameCurrentLevel;
	HelpLayer* _help = NULL;
	bool _flagForHelpLayer = true, _gamePointFlag = true, _gamePointFlag2 = true;
	bool _helpFlag = false, _initObj = true;;
	std::map<int, wchar_t> _crossTheBridgeLevelMapping;

	Label* myGameScoreLabel;
	wchar_t letterToDisplay;

	// _revampToNewLessonConcept

	std::string _letterOnDisplayBoard;
	std::vector<std::string> _choices;
	std::string _answer;

	//

	cocostudio::timeline::ActionTimeline *water_splash;
	cocostudio::timeline::ActionTimeline *punch;
	cocostudio::timeline::ActionTimeline *smoke;
	cocostudio::timeline::ActionTimeline *star;

};

#endif // __CROSSTHEBRIDGE_SCENE_H__
