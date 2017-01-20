#ifndef __Step_SCENE_H__
#define __Step_SCENE_H__

#include "cocos2d.h"
#include <vector>
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../lang/SafariAnalyticsManager.h"
#include "../menu/StartMenuScene.h"
#include "ui/CocosGUI.h"
#include <string>
#include <sstream>
#include "../menu/HelpLayer.h"


class Step : public cocos2d::Layer
{
	
public:
	Step();
	~Step();

	Node *_StepBg, *_fluffyNode, *_blastNode;
	cocostudio::timeline::ActionTimeline *_fluffyTime, *_blastTime;
	cocos2d::ui::LoadingBar *_loadingBar;
	cocos2d::Sprite *_balloon;

	std::vector<cocos2d::ui::LoadingBar*> _allBar;

	HelpLayer *_help;
	cocos2d::Size visibleSize;
	int _level, _moveFlag = 0, _startPercent, _percentLevelNo, _helpFlag = 0, _score = 0, _ballonFlag = -1;

	int _percent[9][3] = {
		{10, 5, 101},
		{ 9, 3, 91 },
		{ 8, 2, 81 },
		{ 10, 2, 101 },
		{ 6, 1, 61 },
		{ 7, 1, 71 },
		{ 8, 1, 81 },
		{ 9, 1, 91 },
		{ 10, 1, 101 }
	};

	int _differentLevel[45][10] = {
		{ 2, 4, 0, 8, 10, 12, 14, 16, 18, 20 },
		{ 2, 4, 6, 8, 10, 12, 0, 16, 18, 20 },
		{ 2, 4, 6, 0, 10, 12, 14, 0, 18, 20 },
		{ 2, 0, 6, 8, 0, 12, 14, 16, 0, 20 },
		{ 2, 4, 0, 8, 10, 0, 14, 16, 18, 0 },

		{ 3, 0, 9, 12, 15, 18, 21, 24, 27, 30 },
		{ 3, 6, 9, 12, 0, 18, 21, 24, 27, 30 },
		{ 3, 6, 0, 12, 15, 18, 21, 0, 27, 30 },
		{ 3, 6, 9, 0, 15, 18, 0, 24, 27, 0 },
		{ 3, 0, 9, 12, 15, 0, 21, 24, 0, 30 },

		{ 4, 8, 12, 16, 0, 24, 28, 32, 36, 40 },
		{ 4, 8, 0, 16, 20, 24, 28, 32, 36, 40 },
		{ 4, 8, 12, 0, 20, 24, 28, 32, 0, 40 },
		{ 4, 8, 0, 16, 20, 24, 0, 32, 36, 0 },
		{ 4, 0, 12, 16, 20, 0, 28, 0, 36, 40 },

		{ 5, 10, 15, 0, 25, 30, 35, 40, 45, 50 },
		{ 5, 10, 15, 20, 25, 30, 0, 40, 45, 50 },
		{ 5, 0, 15, 20, 25, 30, 35, 40, 0, 50 },
		{ 5, 10, 0, 20, 25, 0, 35, 40, 45, 0 },
		{ 5, 10, 0, 20, 0, 30, 35, 0, 45, 50 },

		{ 6, 12, 0, 24, 30, 36, 42, 48, 54, 60 },
		{ 6, 12, 18, 24, 30, 0, 42, 48, 54, 60 },
		{ 6, 0, 18, 24, 30, 36, 42, 48, 0, 60 },
		{ 6, 12, 18, 0, 30, 0, 42, 0, 54, 60 },
		{ 6, 12, 18, 24, 0, 36, 0, 48, 54, 0 },

		{ 7, 14, 21, 28, 35, 42, 49, 56, 63, 0 },
		{ 7, 14, 21, 0, 35, 42, 49, 56, 63, 70 },
		{ 7, 14, 0, 28, 35, 42, 0, 56, 63, 70 },
		{ 7, 0, 21, 28, 0, 42, 49, 56, 0, 70 },
		{ 7, 14, 0, 28, 35, 0, 49, 0, 63, 70 },

		{ 8, 16, 0, 32, 40, 48, 56, 64, 72, 80 },
		{ 8, 16, 24, 32, 40, 48, 56, 0, 72, 80 },
		{ 8, 0, 24, 32, 40, 48, 56, 64, 72, 0 },
		{ 8, 16, 24, 0, 40, 0, 56, 64, 0, 80 },
		{ 8, 0, 24, 32, 0, 48, 0, 64, 72, 80 },

		{ 9, 18, 27, 36, 45, 0, 63, 72, 81, 90 },
		{ 9, 18, 27, 0, 45, 54, 63, 72, 81, 90 },
		{ 9, 0, 27, 36, 45, 54, 63, 0, 81, 90 },
		{ 9, 18, 0, 36, 45, 54, 0, 72, 81, 0 },
		{ 9, 0, 27, 36, 0, 54, 63, 72, 0, 90 },

		{ 10, 20, 0, 40, 50, 60, 70, 80, 90, 100 },
		{ 10, 20, 30, 40, 50, 60, 0, 80, 90, 100 },
		{ 10, 0, 30, 40, 50, 60, 70, 80, 90, 0 },
		{ 10, 20, 30, 0, 50, 0, 70, 80, 0, 100 },
		{ 10, 20, 0, 40, 0, 60, 70, 0, 90, 100 }
	};

	int _answer[45][3] = {
		{6},
		{14},
		{8, 16},
		{4, 10, 18},
		{6, 12, 20},

		{ 6 },
		{ 15 },
		{ 9, 24 },
		{ 12, 21, 30 },
		{ 6, 18, 27 },

		{ 20 },
		{ 12 },
		{ 16, 36 },
		{ 12, 28, 40 },
		{ 8, 24, 32 },

		{ 20 },
		{ 35 },
		{ 10, 45 },
		{ 15, 30, 50 },
		{ 15, 25, 40 },

		{ 18 },
		{ 36 },
		{ 12, 54 },
		{ 24, 36, 48 },
		{ 30, 42, 60 },

		{ 70 },
		{ 28 },
		{ 21, 49 },
		{ 14, 35, 63 },
		{ 21, 42, 56 },

		{ 24 },
		{ 64 },
		{ 16, 80 },
		{ 32, 48, 72 },
		{ 16, 40, 56 },

		{ 54},
		{ 36 },
		{ 18, 72 },
		{ 27, 63, 90 },
		{ 18, 45, 81 },

		{ 30},
		{ 70 },
		{ 20, 100 },
		{ 40, 60, 90 },
		{ 30, 50, 80 }
	};

	RepeatForever *_balloonRepeat;

	struct Position
	{
		int x, y;
	}p1, p2, p3, p4, p5, p6, p7, p8, p9, p10;
	std::vector<Position> _position;

	struct LoadingBarDetails
	{
		cocos2d::ui::LoadingBar *_loadingBar;
		int _id, _answer;
		cocos2d::LabelTTF *_label, *_upLabel;
	}LoadingBarDetails;
	std::vector<struct LoadingBarDetails> _loadingBarDetails;

	static cocos2d::Scene* createScene();
	virtual bool init();
	void onEnterTransitionDidFinish() override;
	void addEvents(struct LoadingBarDetails);
	void Events(cocos2d::Sprite*);
	void finalAnimation(int);
	void removeAnimation();
	void update(float d);
    static const char* gameName() { return STEP.c_str(); };
	CREATE_FUNC(Step);

protected:
	MenuContext* _menuContext;
};
#endif // __Step_SCENE_H__
