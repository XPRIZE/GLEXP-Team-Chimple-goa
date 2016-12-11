#ifndef __BALLOON_SCENE_H__
#define __BALLOON_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "Calculator.h"

using namespace cocos2d;
using namespace std;

class Balloon : public cocos2d::Layer
{
protected:
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	MenuContext *_menuContext;
	HelpLayer* _help;
	Calculator *_calculator ;

	std::vector<std::string> _nodeName;
	vector<Sprite*>_balloonsBin;
	vector<int>_removedBalloonsId;
	string _textString1, _textString2, _textString3, _balloonColor;
	Sprite* _pin;
	bool _touched = true, _burstFlag = false, _helpFlag = true, _isCalculatorThere = false;
	cocos2d::LabelTTF* _label = NULL;
	DrawNode* E;
	int _answer, _isBiggerNoAnswer, _pointCounter = 0; int _gameCurrentLevel = NULL;

public:
	~Balloon();
	CREATE_FUNC(Balloon);
	static cocos2d::Scene* createScene();
	void onEnterTransitionDidFinish();
	void update(float dt);
	void addTouchEvents(Sprite* touchSprite);
	void upFloat(Sprite* spriteAlphabet, int time, float positionX, float positionY);
	void removeBalloon(Sprite* obj);
	void makingBalloons();

	std::pair<int, int> levelAllInfo(int levelNum, int sceneRepetitionNo, int totalScene, int catagoryRepetitionNo, int totalcatagory);
	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY);
	LabelTTF* setAllLabelProperties(std::string letter, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel);
	std::pair<Sprite*, cocostudio::timeline::ActionTimeline*> setAnimationAndProperties(std::string csbString, float posX, float posY, int zOrder);

	static const char* gameName() { return BALLOON.c_str(); }
};

#endif // __BALLOON_SCENE_H__
