#pragma once
//
//  BasicLetterCase.h 
//  goa
//
//  Created by Karim Mirazul  on 14/07/17
//
//

#ifndef __BASIC_LETTERCASE_SCENE_H__
#define __BASIC_LETTERCASE_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "SimpleAudioEngine.h"

using namespace cocos2d;
using namespace std;

class BasicLetterCase : public cocos2d::Layer
{

protected:
	MenuContext *_menuContext;
	vector<std::pair<float, float>> _coordinate;
	std::map<std::string, std::map<std::string, std::string>> _sceneMap;
	std::map<std::string, std::map<std::string, float>> _popcountPropertyMap;
	string _popcountCurrentTheme = "", _popCharacter = "";
	int _popUpAnswer = 0, _popElementCount = 5, _maxPopStarLimits = 10, _totalHit = 0, _wrongHit = 0;
	float _popStayDelay = 4.0f, _delayNumber = 0.0f;
	vector<int> _getElementObject;
	cocostudio::timeline::ActionTimeline *_timelineCenterStarFish;
	bool _popMidButtonClickPermision = true, _popStartListner = false, _tempToHoldCenterButton = false;
	bool _setHelpLayerMode = true;

public:
	~BasicLetterCase();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static BasicLetterCase* create();
	void onEnterTransitionDidFinish();
	void update(float) override;
	void setSpriteProperties(Sprite * ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder);
	void addEventsOnCream(cocos2d::Sprite * callerObject);
	static const char* gameName() { return BASICLETTERCASE.c_str(); }
};

#endif // __BASIC_LETTERCASE_SCENE_H__