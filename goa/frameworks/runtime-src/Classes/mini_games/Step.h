#ifndef __Step_SCENE_H__
#define __Step_SCENE_H__

#include "cocos2d.h"
#include <vector>
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../lang/SafariAnalyticsManager.h"
#include "../StartMenuScene.h"
#include "ui/CocosGUI.h"
#include <string>
#include <sstream>
#include "../menu/HelpLayer.h"


class Step : public cocos2d::Layer
{
	
public:
	Step();
	~Step();

	Node *_StepBg;
	HelpLayer *_help;
	cocos2d::Size visibleSize;
	int _level;

	int _differentLevel[20][6] = {
		{ 3, 1, 4, 2, 2, 3 },
		{ 4, 3, 2, 3, 2, 1 },
		{ 2, 1, 3, 1, 2, 1 },
		{ 2, 3, 1, 1, 1, 2 },
		{ 1, 2, 1, 3, 2, 1 },

		{ 5, 3, 4, 7, 6, 5 },
		{ 8, 6, 4, 9, 2, 1 },
		{ 8, 3, 1, 4, 1, 3 },
		{ 4, 3, 2, 5, 4, 2 },
		{ 1, 2, 2, 6, 2, 7 },

		{ 5, 9, 8, 7, 10, 6 },
		{ 10, 6, 5, 9, 7, 8 },
		{ 8, 9, 5, 4, 1, 3 },
		{ 7, 8, 2, 5, 6, 2 },
		{ 9, 8, 6, 1, 3, 3 },

		{ 10, 10, 10, 10, 10, 10 },
		{ 10, 5, 5, 9, 6, 4 },
		{ 8, 9, 5, 4, 7, 7 },
		{ 7, 8, 4, 8, 6, 7 },
		{ 6, 8, 4, 10, 9, 3 }
	};

	static cocos2d::Scene* createScene();
	virtual bool init();
	void onEnterTransitionDidFinish() override;
	void addEvents();
    static const char* gameName() { return STEP.c_str(); };
	CREATE_FUNC(Step);

protected:
	MenuContext* _menuContext;
};
#endif // __Step_SCENE_H__
