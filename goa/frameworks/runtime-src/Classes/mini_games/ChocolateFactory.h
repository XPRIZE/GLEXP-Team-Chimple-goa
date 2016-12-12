#ifndef __CHOCO_SCENE_H__
#define __CHOCO_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../mini_games/Drop.h"


using namespace cocos2d;
using namespace std;

class ChocolateFactory : public cocos2d::Layer
{
protected:
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	MenuContext *_menuContext;

	std::string _dropCurrentTheme = "";
	Sprite* _fillUpMachine;
	Sprite* _conveyor;
	std::vector<Sprite*> _trayBin;
	std::vector<std::string> _nodeName;
	std::vector<pair<float, float>> _trayPositions;
	int _fillUpFlag = 0;
	bool _touched = true;
	bool _helpFlag = true;
	int _setcounter, _pointCounter=0;
	HelpLayer* _help;

public:
	~ChocolateFactory();
	CREATE_FUNC(ChocolateFactory);
	static cocos2d::Scene* createScene();
	void onEnterTransitionDidFinish();
	void update(float dt);
	void rightFloat(Sprite* spriteAlphabet, int time, float positionX, float positionY);
	void addTouchEvents(Sprite* touchSprite);
	void machineDynamicMotion(std::vector<int>, std::vector<int>, int index, cocostudio::timeline::ActionTimeline* timeline);
	void isTrayInRightSequence();


	std::pair<int, int> levelAllInfo(int levelNum, int sceneRepetitionNo, int totalScene, int catagoryRepetitionNo, int totalcatagory);
	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY);
	LabelTTF* setAllLabelProperties(std::string letter, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel);
	std::pair<Sprite*, cocostudio::timeline::ActionTimeline*> setAnimationAndProperties(std::string csbString, float posX, float posY, int zOrder);

	static const char* gameName() { return CHOCOLATEFACTORY.c_str(); }
};

#endif // __CHOCO_SCENE_H__
