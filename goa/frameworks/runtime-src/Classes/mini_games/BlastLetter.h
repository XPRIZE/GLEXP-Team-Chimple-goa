#ifndef __BLASTLETTER_SCENE_H__
#define __BLASTLETTER_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"

using namespace cocos2d;

class BlastLetter : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;
	std::vector<std::string> _result;

public:
	~BlastLetter();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static BlastLetter* create();
	bool checkRecognizeLetter();
	void onEnterTransitionDidFinish();
	std::vector<std::pair<int, int>> getAllGridCoord(int row , int column);
	void update(float) override;
	static const char* gameName() { return BLASTLETTER.c_str(); }
};

#endif // __BLASTLETTER_SCENE_H__
