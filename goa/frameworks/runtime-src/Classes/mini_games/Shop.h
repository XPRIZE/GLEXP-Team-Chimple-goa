#ifndef __SHOP_SCENE_H__
#define __SHOP_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "Calculator.h"

using namespace cocos2d;
using namespace std;

class Shop : public cocos2d::Layer
{
protected:
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	MenuContext *_menuContext;
	Calculator *_calculator;
	HelpLayer* _help;

	bool _touched = true;
	bool _isItemOnePlaced = false;
	bool _isItemTwoPlaced = false;
	bool _calculateFlag = NULL;
	bool _isListnerReady = NULL;
	pair<float, float> _vegeOriginalPos;
	pair<string, string> _chooseVegePriceTag;
	std::map< std::string, int> _vegePrice;
	string _expectedItemOne, _expectedItemTwo, _textString1, _textString2, _textString3;
	cocos2d::LabelTTF* _label = NULL;
	int _labelCounter = 0;
	int _total;

public:
	~Shop();
	CREATE_FUNC(Shop);
	static cocos2d::Scene* createScene();
	void onEnterTransitionDidFinish();
	void update(float dt);
	void addTouchEvents(Sprite* touchSprite);
	void chooseVegeForShop(vector<string>);
	string vegetablePriceValue(string);

	std::pair<int, int> levelAllInfo(int levelNum, int sceneRepetitionNo, int totalScene, int catagoryRepetitionNo, int totalcatagory);
	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY);
	LabelTTF* setAllLabelProperties(std::string letter, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel);
	std::pair<Sprite*, cocostudio::timeline::ActionTimeline*> setAnimationAndProperties(std::string csbString, float posX, float posY, int zOrder);

	static const char* gameName() { return SHOP.c_str(); }
};

#endif // __SHOP_SCENE_H__
