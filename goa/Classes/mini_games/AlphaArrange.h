#ifndef __ALPHAARRANGE_SCENE_H__
#define __ALPHAARRANGE_SCENE_H__

#include "cocos2d.h"
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

class AlphaArrange : public cocos2d::Layer
{

public:
	static cocos2d::Scene* createScene();
	AlphaArrange();
	~AlphaArrange();
	virtual bool init();
	bool enableTouch;
	Node *_bg;
	Node *_english;
	int overlapped;
	std::vector<std::string> _alphabets;
	std::vector<cocos2d::Vec2> _randomPositions;
	std::vector<Node*> _correctPlaces;
	std::vector<Node*> _randomPlaces;
	int _currentAlphabet;
	void createBox();
	void setupTouch();
	std::string convertToString(char character);
	HelpLayer *_help;
	std::string lang;
	int _labelFontSize = 150;
	int helpFlag = 0;
	int matches;

	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
	void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);

	void createLevel(int level);
	// implement the "static create()" method manually
	CREATE_FUNC(AlphaArrange);

	static const char* gameName() { return ALPHAARRANGE.c_str(); };

	
	void onEnterTransitionDidFinish() override;
	
protected:
	MenuContext* _menuContext;
};
#endif // __ALPHAARRANGE_SCENE_H__
