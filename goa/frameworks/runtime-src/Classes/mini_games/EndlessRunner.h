#ifndef __ENDLESSRUNNER_SCENE_H__
#define __ENDLESSRUNNER_SCENE_H__

#include "cocos2d.h"
#include "SpriteCreate.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../puzzle/CharGenerator.h"
#include "../puzzle/Alphabet.h"
#include "../lang/LangUtil.h"
#include "SimpleAudioEngine.h"
#include "../StartMenuScene.h"

using namespace cocos2d;

class EndlessRunner : public cocos2d::Layer
{
protected:

	MenuContext *_menuContext;
	wchar_t tempChar;
	
	std::vector<SpriteCreate*> allPathBlocks; // Vector Array Which Carries all Path Blocks
	std::vector<Sprite*> allSceneObject,allBeforeStartBlocks, allMonster;
	std::pair<float, float> position;
	std::vector<Alphabet*> allLabels;
	Alphabet *letterOnBoard;
	bool _caseSensitivity = false;
	bool initBool = true, popUp = true, flagLifeDemo = true , startSecondFlag = true ,_resumeHelp = true, _flagHelp = true,_flagLetter = true;
	std::string _alphabets;
	Size visibleSize;
	Vec2 origin;
	Sprite* leftBarrier, *rightBarrier , *leftBarrierForBigObject, *upBarrier , *hpUi;
	cocostudio::timeline::ActionTimeline *hpUiCatchAction , *happyManAction;
	double xSizeArray[7] = { 1.0,0.4,0.6,0.8,0.5,1.2,1.4 };
	int counterAlphabets = 0, counterLife = 6 , counterLetter = 0 , letterBoardAlphaLength = 0 ,_speedForLetterComing = 5 , _totalCounterAlphabets = 1;
	
	std::vector<std::vector<wchar_t>> letters;

	struct LayerModeStruct {
		int FirstLayerRightIntersectMode = 1;
		int SecondLayerRightIntersectMode = 2;
		int PathMovingSpeed = 680 , tolerence = 100 , heightJump = 350;
		bool gapMode = false;
	}LayerMode;

	SpriteCreate* currentFirstLayerRock  , *currentSecondLayerRock;
	int SecondLayerCounterMidObjectValue = 0, SecondLayerCounterMid = 1, SecondLayerModes = 0 , FirstLayerModes = 0;
	
	std::string mountainMidImages[4] = { "endlessrunner/pathmid_1.png", "endlessrunner/pathmid_2.png", "endlessrunner/pathmid_3.png", "endlessrunner/pathmid_4.png" };
	std::string treeLayer4[3] = { "endlessrunner/layer_4_tree_01.png", "endlessrunner/layer_4_tree_02.png", "endlessrunner/layer_4_tree_03.png" };
	std::string treeLayer6[4] = { "endlessrunner/layer_6_tree_01.png", "endlessrunner/layer_6_tree_02.png", "endlessrunner/layer_6_tree_03.png", "endlessrunner/layer_6_tree_04.png" };

	Sprite* currentlayer1Sprite, *currentlayer2Sprite , *currentlayer3Sprite , *currentlayer4Sprite , *currentlayer5Sprite , *currentlayer6Sprite , *currentlayer7Sprite;

	struct Character {
		Sprite* character;
		bool onAir = true;
		bool stillCheckFalg = true;
		bool Clicked = false;
		double fallingTime = 0.9;
		double upTime = 0.4;
		MoveTo* fallDownAction;
		bool groundTouchFlag = false;
		cocostudio::timeline::ActionTimeline *action;
		int uniqueId = 0;
	}Character;

public:

	// METHOD LIST 
	static cocos2d::Scene* createScene();
	~EndlessRunner();

	std::string getStringDataLevelInfo(const wchar_t* alpha, int currentLevel, int deductionValue, int groupLetter);
	void onEnterTransitionDidFinish();
	float movingTime(SpriteCreate* SpriteObject);
	float movingTimes(cocos2d::Sprite* SpriteObject, int Speed);
	std::pair<float, float> movingUpto(float positionY);

	void beforeInitBackgroundScene();
	void sceneBackgroundFlow();
	void addFirstBlockSecondLayer(float dt);
	int getSpeedForMonsterRunning();

	Sprite* CreateSprites(std::string name, int PositionX, int positionY, float scaleX, float scaleY, int zOrder, std::string vectorType);
	void mountainLayer1();
	void scheduleMethod();
	void startGame();
	void removePathBlockTouchByLeftBarrier();
	void startingIntersectMode();

	void AddRocksInFirstLayerPath();
	void AddRocksInSecondLayerPath();

	SpriteCreate* addUpperLayerStartSpriteRock(SpriteCreate* SpriteObject, std::string MountainType, int positionY, int zOrder, int xCordinateforBlankSpace);

	float setPositionX(SpriteCreate* SpriteObject);
	int randmValueIncludeBoundery(int max, int min);

	void CreateMonsterWithLetter(float dt);
	void sceneTree1Flow(float dt);
	void sceneTree2Flow(float dt);

	void FallDownCharacter();
	void stillCharacterOnPath(float delta);

	// a selector callback
	void addEvents(cocos2d::LayerGradient*);

	// implement the "static create()" method manually
	CREATE_FUNC(EndlessRunner);

	void update(float) override;
    
    static const char* gameName() { return ENDLESS_RUNNER.c_str();}
};

#endif // __ENDLESSRUNNER_SCENE_H__
