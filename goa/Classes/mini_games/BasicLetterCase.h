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
#include "../util/CommonLabelTTF.h"

using namespace cocos2d;
using namespace std;

class BasicLetterCase : public cocos2d::Layer
{
protected:
	MenuContext *_menuContext;
	cocostudio::timeline::ActionTimeline *_timelineCenterStarFish;
	vector<Node*> _icecream , _iceCone;

public:
	~BasicLetterCase();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static BasicLetterCase* create();
	void onEnterTransitionDidFinish();
	void update(float) override;
	void setSpriteProperties(Node * ImageObject, float positionX, float positionY, float scale, float anchorX, float anchorY, float rotation, int zorder , int tagValue);
	CommonLabelTTF* createText(string text, string name, float positionX, float positionY , int tagValue);
	void createIceCreams();
	void addEventsOnCream(cocos2d::Sprite * callerObject);
	void backToOriginalPosition(Node * creamNode);
	vector<int> getRandomValueRange(int min, int max, int getValue);
	static const char* gameName() { return BASICLETTERCASE.c_str(); }
};

#endif // __BASIC_LETTERCASE_SCENE_H__