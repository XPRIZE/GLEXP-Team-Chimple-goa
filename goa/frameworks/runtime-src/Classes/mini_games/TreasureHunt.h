#ifndef __TREASUREHUNT_SCENE_H__
#define __TREASUREHUNT_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"

using namespace cocos2d;

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
	bool checkRecognizeLetter();
	void onEnterTransitionDidFinish();
	std::vector<std::pair<int, int>> getAllGridCoord(int row, int column);
	void update(float) override;
	static const char* gameName() { return TREASUREHUNT.c_str(); }
};

#endif // __TREASUREHUNT_SCENE_H__
