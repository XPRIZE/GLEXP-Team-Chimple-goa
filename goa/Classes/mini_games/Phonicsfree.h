#ifndef __PHONICSFREE_SCENE_H__
#define __PHONICSFREE_SCENE_H__

#include "cocos2d.h"
#include "Cannon_Ball_Listener.h"
#include <vector>
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../puzzle/Alphabet.h"
#include "../puzzle/CharGenerator.h"
#include "SimpleAudioEngine.h"
#include "../lang/SafariAnalyticsManager.h"
#include "../menu/StartMenuScene.h"
#include "../lang/TextGenerator.h"
#include "ui/CocosGUI.h"
#include "../effects/FShake.h"
#include "../menu/HelpLayer.h"

class Phonicsfree : public cocos2d::Layer
{
	
public:
	static cocos2d::Scene* createScene();
	Phonicsfree();
	~Phonicsfree();

	struct SpriteDetails
	{
		cocos2d::LabelTTF *_label;
		std::string _id;
		int _sequence;
	}SpriteDetails;

	struct PageViewDetails
	{
		ui::PageView *_pageView;
		int _id;
	}PageViewDetails;

	Node *phonicsfreebg;
	HelpLayer *_help;
	cocos2d::Size _visibleSize;
	int _level, _maxScore;
	cocos2d::LabelTTF *_fixLabel = NULL, *_rightWordLabel = NULL;
	TextGenerator::Phonic _phonicSegmentForLevel;

	void onEnterTransitionDidFinish() override;
	void addEvents();
	virtual bool init();
	// implement the "static create()" method manually
	CREATE_FUNC(Phonicsfree);
	static const char* gameName() { return PHONICSFREE.c_str(); };

	std::map<int, std::map<int, float>> _differntPosition;
	std::vector<std::vector<struct SpriteDetails>> _allSpriteDetails;
	std::vector<std::string> _allWords;
	std::vector<std::vector<std::string>> _segmentsForPhonic;
	std::vector<std::vector<std::string>> _segmentsNotForPhonic;
	std::vector<struct PageViewDetails> _pageViewMap;
	std::vector<cocos2d::Sprite*> _boxDetails;

protected:
	MenuContext* _menuContext;
};
#endif // __Phonicsfree_SCENE_H__
