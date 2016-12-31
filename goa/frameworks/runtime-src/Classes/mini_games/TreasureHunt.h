#ifndef __TREASUREHUNT_SCENE_H__
#define __TREASUREHUNT_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "../menu/HelpLayer.h"
#include "TreasureHuntNode.h"

using namespace cocos2d;
class TreasureHuntNode;
class TreasureHunt : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;
    std::vector<std::string> _result;

public:
	~TreasureHunt();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static TreasureHunt* create();
	std::string _currentLetter;
	virtual void postTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint);
	bool checkRecognizeLetter(std::string letter);
	void onEnterTransitionDidFinish();
	TreasureHuntNode* TreasureHuntNodeObj;
	std::vector<std::pair<int, int>> getAllGridCoord(int row, int column);
	void update(float) override;
	const wchar_t *_alpha;
	int _flag = 0;
	Sprite* _box;
	HelpLayer * _help;
	int _helpFlag = 0;
	std::string getConvertInUpperCase(std::string data);
	void openCoinBox();
	void gameHelpLayer();
	void openStoneBox();
	void setLevel(int level);
	static const char* gameName() { return TREASUREHUNT.c_str(); }
};

#endif // __TREASUREHUNT_SCENE_H__
