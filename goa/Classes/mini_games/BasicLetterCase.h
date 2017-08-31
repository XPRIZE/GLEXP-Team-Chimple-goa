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
#include "../lang/Lesson.h"

using namespace cocos2d;
using namespace std;

class BasicLetterCase : public cocos2d::Layer
{
private:
    Lesson _lesson;
protected:
	MenuContext *_menuContext;
	bool _touchFlag = true;
	int _counterGameDone = 0 , _counterTotalHit = 0 , _counterWorng = 0;

public:
    BasicLetterCase();
	~BasicLetterCase();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static BasicLetterCase* create();
	void onEnterTransitionDidFinish();
	void update(float) override;
	void setSpriteProperties(Node * ImageObject, float positionX, float positionY, float scale, float anchorX, float anchorY, float rotation, int zorder);
	CommonLabelTTF* createText(string text, string name, float positionX, float positionY);
	void createIceCreams(cocos2d::EventCustom *eventCustom);
	vector<int> getLettersAccordingToLevels();
	void addEventsOnCream(cocos2d::Sprite * callerObject);
	void GameDone();
	vector<int> getRandomValueRange(int min, int max, int getValue);
	string getConvertInUpperCase(string data);
	static const char* gameName() { return BASICLETTERCASE.c_str(); }
};

#endif // __BASIC_LETTERCASE_SCENE_H__
