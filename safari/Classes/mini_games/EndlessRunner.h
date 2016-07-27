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

using namespace cocos2d;

class EndlessRunner : public cocos2d::Layer
{
protected:

	MenuContext *_menuContext;
	wchar_t tempChar;
	
	std::vector<SpriteCreate*> allPathBlocks; // Vector Array Which Carries all Path Blocks
	std::vector<Sprite*> allSceneObject;
	std::vector<Sprite*> allBeforeStartBlocks;
	std::pair<float, float> position;
	std::vector<Label*> allLabels;
	std::vector<Sprite*> allMonster;
	Alphabet *letterOnBoard;
	bool initBool = true;
	bool popUp = true;
	CocosDenshion::SimpleAudioEngine* audioBg;
	Size visibleSize;
	Vec2 origin;
	Sprite* leftBarrier;
	Sprite* rightBarrier;
	Sprite* leftBarrierForBigObject;
	Sprite* upBarrier;
	Sprite* hpUi;
	cocostudio::timeline::ActionTimeline *hpUiCatchAction;
	cocostudio::timeline::ActionTimeline *happyManAction;
	double xSizeArray[7] = { 1.0,0.4,0.6,0.8,0.5,1.2,1.4 };
	int counterAlphabets = 0;
	int counterLife = 6;
	bool flagAnimationHappyMan = false;
	bool flagLifeDemo = true;
	std::vector<std::vector<wchar_t>> letters;
	int counterLetter = 0;
	
	struct mountainTypeObject {
		std::string startLandPart = "startLand";
		std::string midLandPart = "midLand";
		std::string endLandPart = "endLand";
		std::string gapLand = "gapLand";
	}mountainTypeObject;

	struct mountainLayerTypes {
		std::string FirstLayer = "firstLayer";
		std::string SecondLayer = "secondLayer";
		std::string gap = "gapInFirstLayer";
	}mountainLayerTypes;

	struct LayerYcoord {
		int anchorPointFirstLayer = 0;
		int groundLevel = 0;
		int firstLayer = 0;
		int secondLayer = 0;
		int thirdLayer = 0;
		int fourLayer = 0;
	}LayerYcoord;

	struct zOrderPathLayer {

		int layer0 = 0;
		int layer1 = 1;
		int layer2 = 2;
		int layer3 = 3;
		int layer4 = 4;
		int layer5 = 5;
		int layer6 = 6;
		int layer7 = 7;

		int gapLand = 8;
		int firstLayer = 9;
		int secondLayer = 10;
		int character = 11;

	}zOrderPathLayer;

	struct SceneLayerYCoord {
		int layer1 = 0;
		int layer2 = 0;
		int layer3 = 0;
		int layer4 = 0;
		int layer5 = 0;
		int layer6 = 0;
		int layer7 = 0;

	}SceneLayerYCoordinate;

	struct LayerModeStruct {

		int FirstLayerRightIntersectMode = 1;
		int SecondLayerRightIntersectMode = 2;
		int leftIntersectMode = 4;

		int PathMovingSpeed = 600;

		int Layer1Speed = 100;
		int Layer2Speed = 230;
		int Layer3Speed = 230;
		int Layer4Speed = 260;
		int Layer5Speed = 260;
		int Layer6Speed = 400;
		int Layer7Speed = 400;

		int tolerence = 100;
		int heightJump = 350;
		bool gapMode = false;

	}LayerMode;

	bool FirstLayerflagForCounterMidObject = true;
	bool FirstLayerstartFlag = true;
	int FirstLayerCounterMidObjectValue = 0;
	int FirstLayerCounterMid = 0;
	int FirstLayerModes = 0;
	SpriteCreate* currentFirstLayerRock;

	bool SecondLayerflagForCounterMidObject = true;
	bool SecondLayerstartFlag = true;
	int SecondLayerCounterMidObjectValue = 0;
	int SecondLayerCounterMid = 1;
	int SecondLayerModes = 0;
	SpriteCreate* currentSecondLayerRock;
	int SecondLayerSpacing = 2;

	bool jumpMode = false;

	std::string mountainMidImages[4] = { "endlessrunner/pathmid_1.png", "endlessrunner/pathmid_2.png", "endlessrunner/pathmid_3.png", "endlessrunner/pathmid_4.png" };
	std::string treeLayer4[3] = { "endlessrunner/layer_4_tree_01.png", "endlessrunner/layer_4_tree_02.png", "endlessrunner/layer_4_tree_03.png" };
	std::string treeLayer6[4] = { "endlessrunner/layer_6_tree_01.png", "endlessrunner/layer_6_tree_02.png", "endlessrunner/layer_6_tree_03.png", "endlessrunner/layer_6_tree_04.png" };

	Sprite* currentlayer1Sprite;
	Sprite* currentlayer2Sprite;
	Sprite* currentlayer3Sprite;
	Sprite* currentlayer4Sprite;
	Sprite* currentlayer5Sprite;
	Sprite* currentlayer6Sprite;
	Sprite* currentlayer7Sprite;

	struct Character {
		Sprite* character;
		bool onAir = true;
		int fallDownSpeed = 700;
		bool singleJumpMode = false;
		bool stillCheckFalg = true;
		int jumpPosition = 0;
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
	virtual bool init();
	float movingTime(SpriteCreate* SpriteObject);
	float movingTimes(cocos2d::Sprite* SpriteObject, int Speed);
	std::pair<float, float> movingUpto(float positionY);

	void beforeInitBackgroundScene();
	void sceneBackgroundFlow();

	Sprite* CreateSprites(std::string name, int PositionX, int positionY, float scaleX, float scaleY, int zOrder, std::string vectorType);
	void mountainLayer1();

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
	void addEvents(cocos2d::Sprite*);

	// implement the "static create()" method manually
	CREATE_FUNC(EndlessRunner);

	void update(float) override;
};

#endif // __ENDLESSRUNNER_SCENE_H__
