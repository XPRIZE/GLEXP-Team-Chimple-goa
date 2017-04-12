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
#include "../menu/HelpLayer.h"

class Phonicsfree : public cocos2d::Layer
{
	
public:
	static cocos2d::Scene* createScene();
	Phonicsfree();
	~Phonicsfree();
	virtual bool init();

	Node *phonicsfreebg;
	ui::ScrollView *_leftScrollView, *_midScrollView, *_rightScrollView;
	HelpLayer *_help;
	cocos2d::Size _visibleSize;
	std::vector<std::vector<wchar_t>> _matrix;

	// implement the "static create()" method manually
	CREATE_FUNC(Phonicsfree);
    
    static const char* gameName() { return PHONICSFREE.c_str(); };

	struct LabelDetails
	{
		cocos2d::LabelTTF *label;
		cocos2d::Sprite *container;
		std::string id;
		int sequence, item;
	}LabelDetails;

	struct SpriteDetails
	{
		Alphabet *_label;
		wchar_t _id;
		int _sequence;
	}SpriteDetails;
	std::vector<struct SpriteDetails> _leftSpriteDetails;
	std::vector<struct SpriteDetails> _midSpriteDetails;
	std::vector<struct SpriteDetails> _rightSpriteDetails;

	std::map<int, std::map<int, float>> _differntPosition;

	std::vector<cocos2d::Sprite*> _boxDetails;
	void onEnterTransitionDidFinish() override;
	void addEvents();
protected:
	MenuContext* _menuContext;
};
#endif // __Phonicsfree_SCENE_H__
